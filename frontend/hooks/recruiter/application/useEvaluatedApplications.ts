"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { EvaluationService } from "@/services/recruiter/evaluated-application.service";

import { Evaluation } from "@/types/recruiter/application/evaluatedApplication.types";
import { ApplicationStatus } from "@/types/recruiter/application/application.types";

interface UseEvaluatedApplicationsResult {
  evaluatedApplications: Evaluation[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  deleteEvaluation: (applicationId: number) => Promise<void>;
}

export function useEvaluatedApplications(
  status?:  Exclude<ApplicationStatus, "UNDER_REVIEW">
): UseEvaluatedApplicationsResult {
  const [evaluatedApplications, setEvaluatedApplications] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadEvaluatedApplications() {
      setIsLoading(true);
      setError(null);

      try {
        const data =
          await EvaluationService.getEvaluatedApplications(status);

        if (isMounted) {
          setEvaluatedApplications(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to fetch evaluations."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvaluatedApplications();

    return () => {
      isMounted = false;
    };
  }, [status, refetchIndex]);

  const deleteEvaluation = async (applicationId: number) => {
    try {
      await EvaluationService.deleteEvaluation(applicationId);

      setEvaluatedApplications((prev) =>
        prev.filter(
          (evaluation) =>
            evaluation.applicationId !== applicationId
        )
      );

      toast.success("Evaluation deleted successfully.");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete evaluation."
      );
    }
  };

  const refetch = () => setRefetchIndex((i) => i + 1);

  return {
    evaluatedApplications,
    isLoading,
    error,
    refetch,
    deleteEvaluation,
  };
}