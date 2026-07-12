import { useState } from "react";
import { Job } from "@/types/job.types";

export function useJobModal(jobs: Job[]) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const selectedJob = jobs.find((job) => job.jobId=== selectedJobId) ?? null;

  const openJob = (jobId: number) => setSelectedJobId(jobId);
  const closeJob = () => setSelectedJobId(null);

  return { selectedJob, openJob, closeJob };
}