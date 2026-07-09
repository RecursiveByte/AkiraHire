export type ApplicationStatus =
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "REJECTED";


export interface ApplicationCandidateProfile {
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
}


export interface ApplicationFormSummary {
  formId: number;
  title: string;
  description: string;
  status: string;
}


export interface ApplicationLinkAnswer {
  id: string;
  label: string;
  required: boolean;
  value: string;
}


export interface ApplicationQuestionAnswer {
  id: string;
  question: string;
  type: string;
  required: boolean;
  options: string[];
  acceptedFileTypes: string[];
  answer: string | number | null;
}


export interface Application {
  applicationId: number;
  submittedAt: string;

  status: ApplicationStatus;

  jobId: number;
  jobTitle: string;

  candidateProfile: ApplicationCandidateProfile;

  form: ApplicationFormSummary;

  links: ApplicationLinkAnswer[];

  questions: ApplicationQuestionAnswer[];
}