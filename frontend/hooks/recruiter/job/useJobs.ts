import { useEffect, useState } from "react";
import { toast } from "sonner";

import JobService from "@/services/job.service";
import { useDebounce } from "@/hooks/common/useDebounce";
import { Job } from "@/types/job.types";

interface UseJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
  deleteJob: (jobId: number) => Promise<void>;
  publishJob: (jobId: number) => Promise<void>;
  CloseJob: (jobId: number) => Promise<void>;
}

export function useJobs(): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await JobService.getRecruiterJobs(
          debouncedSearch || undefined
        );

        if (isMounted) {
          setJobs(data);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load jobs."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex, debouncedSearch]);

  const deleteJob = async (jobId: number) => {
    try {
      await JobService.deleteJob(jobId);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.jobId !== jobId)
      );

      toast.success("Job deleted successfully.");
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error ? err.message : "Failed to delete job."
      );
    }
  };

  const publishJob = async (jobId: number) => {
    try {
      await JobService.publishJob(jobId);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === jobId
            ? {
                ...job,
                status: "OPEN",
              }
            : job
        )
      );

      toast.success("Job published successfully.");
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error ? err.message : "Failed to publish job."
      );
    }
  };

  const CloseJob = async (jobId: number) => {
    try {
      await JobService.closeJob(jobId);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === jobId
            ? {
                ...job,
                status: "CLOSED",
              }
            : job
        )
      );

      toast.success("Job closed successfully.");
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error ? err.message : "Failed to close job."
      );
    }
  };

  const refetch = () => setRefetchIndex((i) => i + 1);

  return {
    jobs,
    isLoading,
    error,
    search,
    setSearch,
    refetch,
    deleteJob,
    publishJob,
    CloseJob,
  };
}