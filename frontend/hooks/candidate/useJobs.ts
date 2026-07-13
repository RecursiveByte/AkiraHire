import { useCallback, useEffect, useState } from "react";

import { CandidateProfileService } from "@/services/candidate.service";

import { JobApplicationForm } from "@/types/candidate/job.types";
import { useDebounce } from "@/hooks/common/useDebounce";

export function useJobs() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const [jobs, setJobs] = useState<JobApplicationForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await CandidateProfileService.getJobs(
        debouncedSearch
      );

      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    isLoading,
    error,
    search,
    setSearch,
    refetch: fetchJobs,
  };
}