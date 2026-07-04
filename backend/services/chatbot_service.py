import logging

from typing import Any

from langchain_core.messages import HumanMessage, BaseMessage

from langgraph.types import Command, StateSnapshot
from sqlalchemy.orm import Session

from agents.router.graph import graph as router_graph
from agents.router.schemas import AgentType

from agents.application_agent.graph import graph as application_graph
from agents.general_agent.graph import graph as general_graph
from agents.job_agent.graph import graph as job_graph

from exceptions.chatbot_exceptions import UnknownAgentError
from repositories.chat_session_repository import ChatSessionRepository
from schemas.auth_schema import CurrentUser
from schemas.chat_schema import AssistantResponse
from services.response_classifier_service import (
    ResponseClassifierService,
    ResponseDecision,
)

logger = logging.getLogger(__name__)


AGENT_GRAPHS: dict[AgentType, Any] = {
    AgentType.GENERAL: general_graph,
    AgentType.APPLICATION: application_graph,
    AgentType.JOB: job_graph,
}


class ChatbotService:

    @staticmethod
    def handle_message(
        db: Session,
        thread_id: str,
        message: str,
        current_user: CurrentUser,
    ) -> AssistantResponse:
        config = {
            "configurable": {
                "thread_id": thread_id,
                "current_user": current_user,
            }
        }

        active_agent = ChatSessionRepository.get_active_agent(db, thread_id)

        if active_agent is not None:
            graph = AGENT_GRAPHS.get(AgentType(active_agent))
            if graph is None:
                raise UnknownAgentError(active_agent)

            snapshot = graph.get_state(config)

            if snapshot.next:
                logger.info(
                    "Pending interrupt found for thread_id=%s agent=%s",
                    thread_id,
                    active_agent,
                )
                return ChatbotService.handle_pending_interrupt(
                    db=db,
                    thread_id=thread_id,
                    active_agent=active_agent,
                    graph=graph,
                    snapshot=snapshot,
                    message=message,
                    config=config,
                )

            logger.info(
                "Stale active_agent for thread_id=%s (graph already finished) — clearing",
                thread_id,
            )
            ChatSessionRepository.set_active_agent(db, thread_id, None)

        return ChatbotService.route_fresh_message(
            db=db,
            thread_id=thread_id,
            message=message,
            config=config,
        )

    @staticmethod
    def handle_pending_interrupt(
        db: Session,
        thread_id: str,
        active_agent: str,
        graph: Any,
        snapshot: StateSnapshot,
        message: str,
        config: dict,
    ) -> AssistantResponse:
        interrupt_payload = snapshot.tasks[0].interrupts[0].value
        decision = ResponseClassifierService.classify(message)

        if decision == ResponseDecision.YES:
            logger.info("Resuming thread_id=%s with YES", thread_id)
            result = graph.invoke(Command(resume="yes"), config=config)
            ChatbotService.sync_active_agent(db, thread_id, active_agent, graph, config)
            return ChatbotService.format_response(result)

        if decision == ResponseDecision.NO:
            logger.info("Resuming thread_id=%s with NO", thread_id)
            result = graph.invoke(Command(resume="no"), config=config)
            ChatSessionRepository.set_active_agent(db, thread_id, None)
            return ChatbotService.format_response(result)

        logger.info("Unclear reply for thread_id=%s — not invoking graph", thread_id)
        question = interrupt_payload.get("question", "Please confirm.")
        summary = interrupt_payload.get("summary", "")
        content = f"{summary}\n\n{question}\n\nPlease reply with 'yes' or 'no' only." if summary else f"{question}\n\nPlease reply with 'yes' or 'no' only."
        
        return AssistantResponse(
            role="assistant",
            content=content
        )

    @staticmethod
    def route_fresh_message(
        db: Session,
        thread_id: str,
        message: str,
        config: dict,
    ) -> AssistantResponse:
        router_result = router_graph.invoke(
            {"messages": [HumanMessage(content=message)]}
        )
        agent: AgentType = router_result["agent"]

        graph = AGENT_GRAPHS.get(agent)
        if graph is None:
            raise UnknownAgentError(agent.value)

        logger.info("Routing thread_id=%s to agent=%s", thread_id, agent.value)

        result = graph.invoke(
            {"messages": [HumanMessage(content=message)]},
            config=config,
        )

        snapshot = graph.get_state(config)

        if snapshot.next:
            ChatSessionRepository.set_active_agent(db, thread_id, agent.value)

            interrupt_payload = snapshot.tasks[0].interrupts[0].value
            question = interrupt_payload.get("question", "Please confirm.")
            generated_jd = result.get("generated_jd")

            content = f"{generated_jd}\n\n{question}\n\nPlease reply with 'yes' or 'no' only." if generated_jd else question            
            return AssistantResponse(role="assistant", content=content)

        ChatSessionRepository.set_active_agent(db, thread_id, None)
        return ChatbotService.format_response(result)

    @staticmethod
    def sync_active_agent(
        db: Session,
        thread_id: str,
        agent_value: str,
        graph: Any,
        config: dict,
    ) -> None:
        snapshot = graph.get_state(config)

        if snapshot.next:
            logger.info(
                "Graph interrupted for thread_id=%s agent=%s — marking active",
                thread_id,
                agent_value,
            )
            ChatSessionRepository.set_active_agent(db, thread_id, agent_value)
        else:
            logger.info(
                "Graph completed for thread_id=%s agent=%s — clearing active",
                thread_id,
                agent_value,
            )
            ChatSessionRepository.set_active_agent(db, thread_id, None)

    @staticmethod
    def format_response(result: dict) -> AssistantResponse:
        last_message: BaseMessage = result["messages"][-1]
        return AssistantResponse(role="assistant", content=last_message.content)