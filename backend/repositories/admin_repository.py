from sqlalchemy.orm import Session
from sqlalchemy import func

from database.models.candidate_profile import CandidateProfile
from database.models.user import User
from database.models.job import Job
from database.models.application import Application

from enums.user_role_enum import UserRole
from schemas.admin_schema import DashboardStatsResponse

from datetime import datetime, timedelta, timezone

from sqlalchemy import func
from enums.job_status_enum import JobStatus


class AdminRepository:

    @staticmethod
    def get_dashboard_stats(
        db: Session,
    ) -> DashboardStatsResponse:
        return DashboardStatsResponse(
            candidates=(
                db.query(func.count(CandidateProfile.candidate_id)).scalar() or 0
            ),
            recruiters=(
                db.query(func.count(User.id))
                .filter(User.role == UserRole.RECRUITER)
                .scalar()
                or 0
            ),
            jobs=(db.query(func.count(Job.job_id)).scalar() or 0),
            applications=(
                db.query(func.count(Application.application_id)).scalar() or 0
            ),
        )

    @staticmethod
    def get_new_candidates_last_week(
        db: Session,
    ) -> int:
        week_ago = datetime.now(timezone.utc) - timedelta(days=7)

        return (
            db.query(func.count(CandidateProfile.candidate_id))
            .filter(CandidateProfile.created_at >= week_ago)
            .scalar()
            or 0
        )

    @staticmethod
    def get_new_recruiters_last_week(
        db: Session,
    ) -> int:
        week_ago = datetime.now(timezone.utc) - timedelta(days=7)

        return (
            db.query(func.count(User.id))
            .filter(
                User.role == UserRole.RECRUITER,
                User.created_at >= week_ago,
            )
            .scalar()
            or 0
        )

    @staticmethod
    def get_new_jobs_last_week(
        db: Session,
    ) -> int:
        week_ago = datetime.now(timezone.utc) - timedelta(days=7)

        return (
            db.query(func.count(Job.job_id))
            .filter(Job.created_at >= week_ago, Job.status == JobStatus.OPEN)
            .scalar()
            or 0
        )

    @staticmethod
    def get_new_applications_last_week(
        db: Session,
    ) -> int:
        week_ago = datetime.now(timezone.utc) - timedelta(days=7)

        return (
            db.query(func.count(Application.application_id))
            .filter(Application.submitted_at >= week_ago)
            .scalar()
            or 0
        )

    @staticmethod
    def get_candidates_count(
        db: Session,
    ) -> int:
        return db.query(func.count(CandidateProfile.candidate_id)).scalar() or 0

    @staticmethod
    def get_recruiters_count(
        db: Session,
    ) -> int:
        return (
            db.query(func.count(User.id))
            .filter(User.role == UserRole.RECRUITER)
            .scalar()
            or 0
        )

    @staticmethod
    def get_jobs_count(
        db: Session,
    ) -> int:
        return (
            db.query(func.count(Job.job_id))
            .filter(Job.status == JobStatus.OPEN)
            .scalar()
            or 0
        )

    @staticmethod
    def get_applications_count(
        db: Session,
    ) -> int:
        return db.query(func.count(Application.application_id)).scalar() or 0


    @staticmethod
    def get_candidate_growth(
        db: Session,
        days: int,
    ):
        start_date = datetime.now(timezone.utc) - timedelta(days=days)

        return (
            db.query(
                func.date(CandidateProfile.created_at).label("date"),
                func.count(CandidateProfile.candidate_id).label("count"),
            )
            .filter(CandidateProfile.created_at >= start_date)
            .group_by(func.date(CandidateProfile.created_at))
            .order_by(func.date(CandidateProfile.created_at))
            .all()
        )


    @staticmethod
    def get_recruiter_growth(
        db: Session,
        days: int,
    ):
        start_date = datetime.now(timezone.utc) - timedelta(days=days)

        return (
            db.query(
                func.date(User.created_at).label("date"),
                func.count(User.id).label("count"),
            )
            .filter(
                User.role == UserRole.RECRUITER,
                User.created_at >= start_date,
            )
            .group_by(func.date(User.created_at))
            .order_by(func.date(User.created_at))
            .all()
        )

