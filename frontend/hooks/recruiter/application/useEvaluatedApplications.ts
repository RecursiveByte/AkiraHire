"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { EvaluationService } from "@/services/evaluated-application.service";
import { Evaluation } from "@/types/evaluatedApplication.types";

interface UseEvaluatedApplicationsResult {
  evaluatedApplications: Evaluation[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  deleteEvaluation: (applicationId: number) => Promise<void>;
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

  const deleteEvaluation = useCallback(
    async (applicationId: number) => {
      try {
        await EvaluationService.deleteEvaluation(applicationId);

        toast.success("Evaluation deleted successfully.");

        fetchEvaluatedApplications();
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to delete evaluation.";

        toast.error(message);

        throw err;
      }
    },
    [fetchEvaluatedApplications]
  );

  return {
    evaluatedApplications,
    isLoading,
    error,
    refetch: fetchEvaluatedApplications,
    deleteEvaluation,
  };
}