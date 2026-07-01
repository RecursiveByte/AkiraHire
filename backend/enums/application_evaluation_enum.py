import enum

class ApplicationEvaluationStatus(str,enum.Enum):
    SHORTLISTED = "SHORTLISTED"
    REJECTED = "REJECTED"
    UNDER_REVIEW = "UNDER_REVIEW"