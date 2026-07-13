import { apiClient } from "@/lib/api/apiClient";
import { ApiEvaluation } from "@/types/api/evaluation.types";
import { mapApiEvaluationToEvaluation } from "@/lib/mappers/evaluation.mapper";
import { Evaluation } from "@/types/evaluatedApplication.types";
import { ApplicationStatus } from "@/types/application.types";


export class EvaluationService {
  static async getEvaluatedApplications(
    status?: Exclude<ApplicationStatus, "UNDER_REVIEW">
  ): Promise<Evaluation[]> {
    const { data } = await apiClient.get<ApiEvaluation[]>(
      "/application-evaluations/recruiter",
      {
        params: {
          status,
        },
      }
    );

    return data.map(mapApiEvaluationToEvaluation);
  }
  static async deleteEvaluation(applicationId: number): Promise<void> {
    await apiClient.delete(`/application-evaluations/${applicationId}`);
  }
}
