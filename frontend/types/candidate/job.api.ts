export interface JobApplicationFormApi {
    form_id: number;
    job_id: number;
    job_role: string;
    job_description: string;
    title: string;
    status: string;
  
    form_schema_json: FormSchemaApi;
  
    expires_at: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface FormSchemaApi {
    title: string;
    description: string;
    links: string[];
    additional_questions: AdditionalQuestionApi[];
  }
  
  export interface AdditionalQuestionApi {
    id: string;
    question: string;
    type:
      | "text"
      | "textarea"
      | "number"
      | "dropdown"
      | "checkbox"
      | "radio"
      | "date"
      | "file";
  
    required: boolean;
    options: string[];
    accepted_file_types: string[];
  }