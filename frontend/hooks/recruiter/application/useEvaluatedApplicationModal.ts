import { useState } from "react";
import { Evaluation } from "@/types/recruiter/application/evaluatedApplication.types";

export function useEvaluatedApplicationModal(evaluatedApplications: Evaluation[]) {
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);

  const selectedEvaluation =
    evaluatedApplications.find(
      (evaluatedApplication) => evaluatedApplication.applicationId === selectedApplicationId
    ) ?? null;

  const openEvaluation = (applicationId: number) => setSelectedApplicationId(applicationId);
  const closeEvaluation = () => setSelectedApplicationId(null);

  return { selectedEvaluation, openEvaluation, closeEvaluation };
}