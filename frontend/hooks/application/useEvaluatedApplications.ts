"use client";

import { useCallback, useEffect, useState } from "react";
import { EvaluationService } from "@/services/evaluatedApplicationService";
import { Evaluation } from "@/types/evaluatedApplication.types";

interface UseEvaluatedApplicationsResult {
  evaluatedApplications: Evaluation[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvaluatedApplications(): UseEvaluatedApplicationsResult {
  const [evaluatedApplications, setEvaluatedApplications] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvaluatedApplications = useCallback(() => {
    setIsLoading(true);
    setError(null);

    EvaluationService.getEvaluatedApplications()
      .then(setEvaluatedApplications)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchEvaluatedApplications();
  }, [fetchEvaluatedApplications]);

  return { evaluatedApplications, isLoading, error, refetch: fetchEvaluatedApplications };
}