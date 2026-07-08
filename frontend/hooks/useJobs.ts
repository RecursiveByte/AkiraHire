import { useEffect, useState } from "react";
import { jobService } from "@/services/job.service";
import { Job } from "@/types/job.types";

interface UseJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobs(): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await jobService.getRecruiterJobs();
        if (isMounted) setJobs(data);
    } catch (err) {
          console.log(err)
        if (isMounted) setError(err instanceof Error ? err.message : "Failed to load jobs.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex]);

  const refetch = () => setRefetchIndex((i) => i + 1);

  return { jobs, isLoading, error, refetch };
}