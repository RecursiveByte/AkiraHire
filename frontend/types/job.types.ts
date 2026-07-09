export type JobStatus = "OPEN" | "DRAFT" | "CLOSED";

export interface Candidate {
  id: string;
  name: string;
}

export interface Job {
  jobId: number; 
  title: string; 
  status: JobStatus;
  description: string;
  applicationDeadline: string; 
  createdAt: string; 
}

export type ApiJobStatus = "open" | "draft" | "closed";

export interface ApiJob {
  job_id: number;
  role: string;
  status: ApiJobStatus;
  job_description: string;
  application_deadline: string;
  created_at: string; 
}
