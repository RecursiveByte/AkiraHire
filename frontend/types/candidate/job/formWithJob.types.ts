export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "date";

export interface ApiFormQuestion {
  id: string;
  question: string;
  type: FormFieldType;
  required: boolean;
  options: string[];
  accepted_file_types: string[];
}

export interface ApiFormSchema {
  title: string;
  description: string;
  links: string[];
  additional_questions: ApiFormQuestion[];
}

export interface ApiFormWithJob {
  form_id: number;
  job_id: number;
  job_role: string;
  job_description: string;
  title: string;
  status: string;
  form_schema_json: ApiFormSchema;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FormQuestion {
  id: string;
  question: string;
  type: FormFieldType;
  required: boolean;
  options: string[];
}

export interface FormSchema {
  title: string;
  description: string;
  questions: FormQuestion[];
}

export interface FormWithJob {
  formId: number;
  jobId: number;
  jobRole: string;
  jobDescription: string;
  title: string;
  status: string;
  schema: FormSchema;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function mapApiFormWithJobToFormWithJob(api: ApiFormWithJob): FormWithJob {
  return {
    formId: api.form_id,
    jobId: api.job_id,
    jobRole: api.job_role,
    jobDescription: api.job_description,
    title: api.title,
    status: api.status,
    schema: {
      title: api.form_schema_json.title,
      description: api.form_schema_json.description,
      questions: api.form_schema_json.additional_questions.map((q) => ({
        id: q.id,
        question: q.question,
        type: q.type,
        required: q.required,
        options: q.options,
      })),
    },
    expiresAt: api.expires_at,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}