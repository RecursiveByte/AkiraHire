// jobs.types.ts

export interface JobApplicationForm {
  formId: number;
  jobId: number;
  jobRole: string;
  jobDescription: string;

  title: string;
  status: string;

  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;

  formSchema: FormSchema;
}

export interface FormSchema {
  title: string;
  description: string;
  links: string[];
  additionalQuestions: AdditionalQuestion[];
}

export interface AdditionalQuestion {
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
  acceptedFileTypes: string[];
}