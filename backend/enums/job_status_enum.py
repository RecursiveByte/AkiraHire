import enum

class JobStatus(str, enum.Enum):
    DRAFT = "draft"
    OPEN = "open"
    CLOSED = "closed"
    
JOB_STATUS_TRANSITIONS: dict[JobStatus, set[JobStatus]] = {
    JobStatus.DRAFT: {JobStatus.OPEN},
    JobStatus.OPEN: {JobStatus.CLOSED},
    JobStatus.CLOSED: set(),
}