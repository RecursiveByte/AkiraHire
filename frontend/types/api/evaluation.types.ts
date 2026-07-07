export type ApiEvaluationStatus = "SHORTLISTED" | "REJECTED";

export interface ApiEvaluation {
  application_id: number;
  match_score: number;
  reasoning: string;
  status: ApiEvaluationStatus;
  evaluated_at: string;
  updated_at: string;
}

export type GetEvaluationsResponse = ApiEvaluation[];