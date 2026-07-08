from langchain_core.tools import tool
from sqlalchemy.orm import Session

from services.application_evaluation_service import (
    ApplicationEvaluationService,
)

from database.session import SessionLocal

from exceptions.base import AppException


@tool
def evaluate_application(application_id: int) -> dict:
    """
    Evaluate a single job application.

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

    db = SessionLocal()

    try:
        result = ApplicationEvaluationService.evaluate_application(
            application_id=application_id,
            db=db,
        )

        return {
            "success": True,
            "data": result.model_dump(),
        }

    except AppException as e:
        return {
            "success": False,
            "error": str(e),
        }

    finally:
        db.close()


from repositories.application_repository import ApplicationRepository


@tool
def evaluate_all_applications() -> dict:
    """
    Evaluate every application that has not yet been evaluated.

    Use this tool whenever the user asks to:

    - evaluate all applications
    - review all applications
    - evaluate pending applications
    - review every candidate
    - shortlist all candidates
    - process all applications

    Never evaluate applications yourself when this tool can be used.

    Returns:
        The official evaluation results for every application.
    """


    db = SessionLocal()
    print("\n")
    print("calling evaluate tool ")
    print("\n")
    try:
        applications = ApplicationRepository.get_all(db=db)

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
