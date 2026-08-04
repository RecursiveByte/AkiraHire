from sqlalchemy.orm import Session

from repositories.admin_repository import AdminRepository

from schemas.admin_schema import (
    DashboardResponse,
    DashboardStatsResponse,
    RecentActivityResponse,
    UserDistributionResponse,
    UserGrowthItemResponse
)

from datetime import datetime, timedelta, timezone


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

    @staticmethod
    def get_user_distribution(
        db: Session,
    ) -> UserDistributionResponse:
        return UserDistributionResponse(
            candidates=AdminRepository.get_candidates_count(db),
            recruiters=AdminRepository.get_recruiters_count(db),
        )


    @staticmethod
    def get_user_growth(
        db: Session,
        days: int,
    ) -> list[UserGrowthItemResponse]:
        logger.info(f"Fetching user growth. days={days}")

        candidate_growth = AdminRepository.get_candidate_growth(
            db=db,
            days=days,
        )

        recruiter_growth = AdminRepository.get_recruiter_growth(
            db=db,
            days=days,
        )

        candidate_map = {row.date: row.count for row in candidate_growth}

        recruiter_map = {row.date: row.count for row in recruiter_growth}

        today = datetime.now(timezone.utc).date()

        result = []

        for i in range(days - 1, -1, -1):
            current_date = today - timedelta(days=i)

            result.append(
                UserGrowthItemResponse(
                    date=current_date,
                    candidates=candidate_map.get(current_date, 0),
                    recruiters=recruiter_map.get(current_date, 0),
                )
            )

        return result
