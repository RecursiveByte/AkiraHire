
export interface ApplicationLinkPayload {
    id: string;
    url: string;
  }
  
  export interface ApplicationAnswerPayload {
    id: string;
    answer: any;
  }
  
  export interface CreateApplicationRequest {
    form_id: number;
    links: ApplicationLinkPayload[];
    answers: ApplicationAnswerPayload[];
  }
  
  export interface CreateApplicationResponse {
    application_id: number;
    form_id: number;
    submitted_at: string;
  }