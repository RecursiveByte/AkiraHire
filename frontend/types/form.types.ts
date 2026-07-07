export type FormStatus = "DRAFT" | "ACTIVE" | "CLOSED";

export interface Form {
  formId: number;
  jobId: number;
  title: string;
  status: FormStatus;
  formSchemaJson:FormSchema;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export type ApiFormStatus = "draft" | "active" | "closed";

export interface ApiForm {
  form_id: number;
  job_id: number;
  title: string;
  status: ApiFormStatus;
  form_schema_json: Record<string, unknown>;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export type FormQuestionType =
  | "radio"
  | "checkbox"
  | "select"
  | "text"
  | "textarea"
  | "number"
  | "file";

export interface FormSchemaLink {
  id: string;
  label: string;
  required: boolean;
}

export interface FormSchemaQuestion {
  id: string;
  type: FormQuestionType;
  options: string[];
  question: string;
  required: boolean;
  accepted_file_types: string[];
}

export interface FormSchema {

  title: string;
  description: string;

  name: string;
  email: string;
  phone: string;
  resumeUrl: string;

  links: FormSchemaLink[];
  additional_questions: FormSchemaQuestion[];
}