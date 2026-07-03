from fastapi import APIRouter, Depends
from pydantic import BaseModel

from langchain_core.messages import HumanMessage

from agents.chatbot.graph import graph

from schemas.auth_schema import CurrentUser
from auth.dependencies import require_role

from enums.user_role_enum import UserRole

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)


class ChatRequest(BaseModel):
    thread_id: str
    message: str


@router.post("/chat")
def chat(
    request: ChatRequest,
    current_user: CurrentUser = Depends(require_role(UserRole.RECRUITER)),
):
    config = {
        "configurable": {
            "thread_id": request.thread_id,
            "current_user": current_user,
        }
    }

    result = graph.invoke(
        {
            "messages": [
                HumanMessage(content=request.message)
            ]
        },
        config=config,
    )

    response = result["messages"][-1]

    return {
        "role": "assistant",
        "content": response.content,
    }