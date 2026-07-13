import { ApiEvaluation } from "@/types/api/evaluation.types";
import { Evaluation } from "@/types/recruiter/application/evaluatedApplication.types";

export function mapApiEvaluationToEvaluation(apiEvaluation: ApiEvaluation): Evaluation {
  return {
    applicationId: apiEvaluation.application_id,
    matchScore: apiEvaluation.match_score,
    reasoning: apiEvaluation.reasoning,
    status: apiEvaluation.status,
    evaluatedAt: apiEvaluation.evaluated_at,
    updatedAt: apiEvaluation.updated_at,
  };
}