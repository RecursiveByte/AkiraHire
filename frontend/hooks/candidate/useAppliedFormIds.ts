
import { useCallback, useEffect, useState } from "react";
import { ApplicationService } from "@/services/candidate/application.service";

export const useAppliedFormIds = () => {
  const [appliedFormIds, setAppliedFormIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedFormIds = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const formIds = await ApplicationService.getAppliedFormIds();
        setAppliedFormIds(new Set(formIds));
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load applied jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedFormIds();
  }, []);

  const markAsApplied = useCallback((formId: number) => {
    setAppliedFormIds((prev) => new Set(prev).add(formId));
  }, []);

  return { appliedFormIds, isLoading, error, markAsApplied };
};