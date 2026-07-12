import { useCallback, useEffect, useState } from "react";

import { Application } from "@/types/application.types";
import { ApplicationService } from "@/services/application.service";

interface UseApplicationsResult {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  refetchApplications: () => Promise<void>;
}

export function useApplications(): UseApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await ApplicationService.getApplications();
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
  }, []);

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