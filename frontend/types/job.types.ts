export type JobStatus = "ACTIVE" | "DRAFT" | "CLOSED";

export interface Candidate {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Job {
  jobId: string; 
  title: string; 
  status: JobStatus;
  description: string;
  applicationDeadline: string; 
  createdAt: string; 
}

export type ApiJobStatus = "active" | "draft" | "closed";

export interface ApiJob {
  job_id: string;
  role: string;
  status: ApiJobStatus;
  job_description: string;
  application_deadline: string;
  created_at: string; 
}
