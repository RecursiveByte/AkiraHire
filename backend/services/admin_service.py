from sqlalchemy.orm import Session

from repositories.admin_repository import AdminRepository

from schemas.admin_schema import (
    DashboardResponse,
    DashboardStatsResponse,
    RecentActivityResponse,
)

from utils.logger import get_logger

logger = get_logger(__name__)


class AdminService:

    @staticmethod
    def get_dashboard_stats(
        db: Session,
    ) -> DashboardStatsResponse:
        logger.info("Fetching admin dashboard statistics.")

        return AdminRepository.get_dashboard_stats(
            db=db,
        )

    @staticmethod
    def get_recent_activity(
        db: Session,
    ) -> RecentActivityResponse:
        logger.info("Fetching recent dashboard activity.")

        return RecentActivityResponse(
            candidates=AdminRepository.get_new_candidates_last_week(
                db=db,
            ),
            recruiters=AdminRepository.get_new_recruiters_last_week(
                db=db,
            ),
            jobs=AdminRepository.get_new_jobs_last_week(
                db=db,
            ),
            applications=AdminRepository.get_new_applications_last_week(
                db=db,
            ),
        )

    @staticmethod
    def get_dashboard(
        db: Session,
    ) -> DashboardResponse:
        logger.info("Fetching admin dashboard.")

        return DashboardResponse(
            stats=AdminService.get_dashboard_stats(
                db=db,
            ),
            activity=AdminService.get_recent_activity(
                db=db,
            ),
        )