import { useEffect, useState } from "react";
import { Application } from "@/types/application.types";
import { applicationService } from "@/services/application.service";

interface UseApplicationsResult {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApplications(): UseApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadApplications() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await applicationService.getApplications();
        if (isMounted) setApplications(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Failed to load applications.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadApplications();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex]);

  const refetch = () => setRefetchIndex((i) => i + 1);

  return { applications, isLoading, error, refetch };
}