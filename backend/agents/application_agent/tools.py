from langchain_core.tools import tool
from langchain_core.runnables import RunnableConfig
from sqlalchemy.orm import Session

from services.application_evaluation_service import (
    ApplicationEvaluationService,
)
from exceptions.base import AppException

from database.session import SessionLocal
from agents.utils.config_helpers import get_current_user


from exceptions.application_evaluation_exceptions import (
    ApplicationAlreadyEvaluatedError,
)

from repositories.application_repository import ApplicationRepository


@tool
def evaluate_application(application_id: int, config: RunnableConfig) -> dict:
    """
    Evaluate a single job application belonging to the current recruiter.

    Always use this tool whenever the user asks to evaluate, review,
    analyze, assess, score, shortlist, or reject a specific application.

    This tool is the ONLY valid way to evaluate an application.
    Never perform the evaluation yourself.

    Args:
        application_id: The application ID to evaluate.

    Returns:
        The official evaluation including the match score,
        reasoning, and application status.
    """

    current_user = get_current_user(config)

    db = SessionLocal()

    try:
        application = ApplicationRepository.get_owned_application(
            application_id=application_id,
            recruiter_id=current_user.user_id,
            db=db,
        )

        if application is None:
            return {
                "success": False,
                "error": f"No application found with id {application_id} for your account.",
            }

        result = ApplicationEvaluationService.evaluate_application(
            application_id=application_id,
            db=db,
        )

        return {
            "success": True,
            "data": result.model_dump(),
        }

    except ApplicationAlreadyEvaluatedError:
        existing = ApplicationEvaluationService.get_by_application_id(
            application_id=application_id,
            db=db,
        )

        return {
            "success": True,
            "already_evaluated": True,
            "data": {
                "application_id": application_id,
                "match_score": existing.match_score,
                "reasoning": existing.reasoning,
                "status": existing.status,
            },
        }

    except AppException as e:
        return {
            "success": False,
            "error": str(e),
        }

    finally:
        db.close()


@tool
def evaluate_all_applications(config: RunnableConfig) -> dict:
    """
    Evaluate every unevaluated application belonging to the current recruiter.

    Use this tool whenever the user asks to:

    - evaluate all applications
    - review all applications
    - evaluate pending applications
    - review every candidate
    - shortlist all candidates
    - process all applications

    Never evaluate applications yourself when this tool can be used.

    Returns:
        The official evaluation results for every application owned by
        the current recruiter.
    """
    current_user = get_current_user(config)

    db = SessionLocal()

    try:
        
        print("="*20)
        print("evaluating..")
        print("="*20)
        applications = ApplicationRepository.get_all_for_recruiter(
            recruiter_id=current_user.user_id,
            db=db,
        )

        results = []

        for application in applications:
            try:
                evaluation = ApplicationEvaluationService.evaluate_application(
                    application_id=application.application_id,
                    db=db,
                )

                results.append(
                    {
                        "application_id": application.application_id,
                        "success": True,
                        "status": evaluation.status,
                        "match_score": evaluation.match_score,
                        "reasoning": evaluation.reasoning,
                    }
                )

            except ApplicationAlreadyEvaluatedError:
                existing = ApplicationEvaluationService.get_by_application_id(
                    application_id=application.application_id,
                    db=db,
                )

                results.append(
                    {
                        "application_id": application.application_id,
                        "success": True,
                        "already_evaluated": True,
                        "status": existing.status,
                        "match_score": existing.match_score,
                        "reasoning": existing.reasoning,
                    }
                )

            except AppException as e:
                results.append(
                    {
                        "application_id": application.application_id,
                        "success": False,
                        "error": str(e),
                    }
                )

        successful = sum(r["success"] for r in results)

        return {
            "success": True,
            "total": len(results),
            "successful": successful,
            "failed": len(results) - successful,
            "results": results,
        }

    finally:
        db.close()