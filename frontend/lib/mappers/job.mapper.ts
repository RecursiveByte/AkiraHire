import { Job,ApiJob,JobStatus,ApiJobStatus } from "@/types/recruiter/job/job.types";


const STATUS_MAP: Record<ApiJobStatus, JobStatus> = {
  open: "OPEN",
  draft: "DRAFT",
  closed: "CLOSED",
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function mapApiJobToJob(apiJob: ApiJob): Job {
  return {
    jobId: apiJob.job_id,
    title: apiJob.role,
    status: STATUS_MAP[apiJob.status],
    description: apiJob.job_description,
    applicationDeadline: formatDate(apiJob.application_deadline),
    createdAt: formatDate(apiJob.created_at),
  };
}