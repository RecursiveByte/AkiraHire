import enum

class JobStatus(str, enum.Enum):
    DRAFT = "draft"
    OPEN = "open"
    CLOSED = "closed"
    CANCELLED = "cancelled"
    
JOB_STATUS_TRANSITIONS: dict[JobStatus, set[JobStatus]] = {
    JobStatus.DRAFT: {JobStatus.OPEN, JobStatus.CANCELLED},
    JobStatus.OPEN: {JobStatus.CLOSED, JobStatus.CANCELLED},
    JobStatus.CLOSED: set(),
    JobStatus.CANCELLED: set(),
}