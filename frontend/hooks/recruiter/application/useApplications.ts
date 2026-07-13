import { useCallback, useEffect, useState } from "react";

import { Application } from "@/types/recruiter/application/application.types";
import { ApplicationService } from "@/services/recruiter/application.service";
import { useDebounce } from "@/hooks/common/useDebounce";

interface UseApplicationsResult {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  refetchApplications: () => Promise<void>;
}

export function useApplications(
  search: string
): UseApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const refetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await ApplicationService.getRecruiterApplications(
        debouncedSearch
      );

      setApplications(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load applications."
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    void refetchApplications();
  }, [refetchApplications]);

  return {
    applications,
    isLoading,
    error,
    refetchApplications,
  };
}