import { useCallback, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/common/useDebounce";

import { Application } from "@/types/application.types";
import { ApplicationService } from "@/services/application.service";
import { CandidateProfileService } from "@/services/candidate.service";

interface UseCandidateApplicationsResult {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetchApplications: () => Promise<void>;
}

export function useCandidateApplications(): UseCandidateApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const refetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data =
        await CandidateProfileService.getCandidateApplications(
          debouncedSearch || undefined
        );

        console.log("condaite dataa ",data)

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
    search,
    setSearch,
    refetchApplications,
  };
}