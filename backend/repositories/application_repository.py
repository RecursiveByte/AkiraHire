from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database.models.application import Application
from database.models.form import Form
from database.models.job import Job


class ApplicationRepository:

    @staticmethod
    def create(
        db: Session,
        application: Application,
    ) -> Application:

        try:

            db.add(application)
            db.commit()
            db.refresh(application)

            return application

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_form_ids_by_candidate_id(db: Session, candidate_id: int) -> list[int]:
        results = (
            db.query(Application.form_id)
            .filter(Application.candidate_id == candidate_id)
            .all()
        )
        return [row[0] for row in results]

    @staticmethod
    def get_by_id(
        db: Session,
        application_id: int,
    ) -> Application | None:

        return (
            db.query(Application)
            .filter(
                Application.application_id == application_id,
            )
            .first()
        )

    @staticmethod
    def get_by_form_id(
        db: Session,
        form_id: int,
    ) -> list[Application]:

        return (
            db.query(Application)
            .filter(
                Application.form_id == form_id,
            )
            .all()
        )

    @staticmethod
    def get_by_form_id_and_candidate_id(
        db: Session,
        form_id: int,
        candidate_id: int,
    ) -> Application | None:
        return (
            db.query(Application)
            .filter(
                Application.form_id == form_id,
                Application.candidate_id == candidate_id,
            )
            .first()
        )

    @staticmethod
    def get_by_recruiter_id(
        recruiter_id: int,
        db: Session,
    ) -> list[int]:
        rows = (
            db.query(Application.application_id)
            .join(Form, Application.form_id == Form.form_id)
            .join(Job, Form.job_id == Job.job_id)
            .filter(Job.recruiter_id == recruiter_id)
            .all()
        )

        return [{"application_id": row.application_id} for row in rows]

    @staticmethod
    def get_by_candidate_id(
        db: Session,
        candidate_id: int,
    ) -> list[Application]:

        return (
            db.query(Application)
            .filter(
                Application.candidate_id == candidate_id,
            )
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        application: Application,
    ) -> Application:

        try:

            db.commit()
            db.refresh(application)

            return application

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Application]:

        return db.query(Application).all()

    @staticmethod
    def delete(
        db: Session,
        application: Application,
    ) -> None:

        try:

            db.delete(application)
            db.commit()

        except SQLAlchemyError:

            db.rollback()
            raise

    @staticmethod
    def get_owned_application(
        application_id: int,
        recruiter_id: int,
        db: Session,
    ) -> Application | None:
        return (
            db.query(Application)
            .join(Form, Application.form_id == Form.form_id)
            .join(Job, Form.job_id == Job.job_id)
            .filter(
                Application.application_id == application_id,
                Job.recruiter_id == recruiter_id,
            )
            .first()
        )

    @staticmethod
    def get_all_for_recruiter(
        recruiter_id: int,
        db: Session,
    ) -> list[Application]:
        return (
            db.query(Application)
            .join(Form, Application.form_id == Form.form_id)
            .join(Job, Form.job_id == Job.job_id)
            .filter(Job.recruiter_id == recruiter_id)
            .all()
        )

    @staticmethod
    def search_candidate_applications(
        db: Session,
        candidate_id: int,
        search: str | None,
    ) -> list[Application]:

        query = (
            db.query(Application)
            .join(
                Form,
                Application.form_id == Form.form_id,
            )
            .join(
                Job,
                Form.job_id == Job.job_id,
            )
            .filter(
                Application.candidate_id == candidate_id,
            )
        )

        if search:

            search = search.strip()

            if search.isdigit():

                query = query.filter(
                    Application.application_id == int(search),
                )

            else:

                query = query.filter(
                    Job.role.ilike(f"{search}%"),
                )

        return query.all()
    
    
    @staticmethod
    def search_recruiter_applications(
        db: Session,
        recruiter_id: int,
        search: str | None,
    ) -> list[Application]:
    
        query = (
            db.query(Application)
            .join(
                Form,
                Application.form_id == Form.form_id,
            )
            .join(
                Job,
                Form.job_id == Job.job_id,
            )
            .filter(
                Job.recruiter_id == recruiter_id,
            )
        )
    
        if search:
        
            search = search.strip()
    
            if search.isdigit():
            
                query = query.filter(
                    Application.application_id == int(search),
                )
    
            else:
            
                query = query.filter(
                    Job.role.ilike(f"{search}%"),
                )
    
        return query.all()
