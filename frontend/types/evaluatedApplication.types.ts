export type EvaluationStatus = "SHORTLISTED" | "REJECTED" ;

export interface Evaluation {
  applicationId: number;
  matchScore: number;
  reasoning: string;
  status: EvaluationStatus;
  evaluatedAt: string;
  updatedAt: string;
}