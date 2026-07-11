import { apiClient } from "@/lib/api/apiClient";
import { ApiEvaluation } from "@/types/api/evaluation.types";
import { mapApiEvaluationToEvaluation } from "@/lib/mappers/evaluation.mapper";
import { Evaluation } from "@/types/evaluatedApplication.types";

export class EvaluationService {
  static async getEvaluatedApplications(): Promise<Evaluation[]> {
    const { data } = await apiClient.get<ApiEvaluation[]>("/application-evaluations/recruiter");
    console.log("this ",data)
    return data.map(mapApiEvaluationToEvaluation);
  }
}