export interface ApplicationCandidateProfile {
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string;
  }
  
  export interface ApplicationFormSummary {
    formId: number;
    jobId: number;
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
    candidateProfile: ApplicationCandidateProfile;
    form: ApplicationFormSummary;
    links: ApplicationLinkAnswer[];
    questions: ApplicationQuestionAnswer[];
  }