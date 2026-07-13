import { ApplicationStatus } from "@/types/recruiter/application/application.types";


export interface ApiApplicationCandidateProfile {
  full_name: string;
  email: string;
  phone: string;
  resume_url: string;
}


export interface ApiApplicationForm {
  form_id: number;
  title: string;
  description: string;
  status: string;
}


export interface ApiApplicationJob {
  job_id: number;
  role: string;
}


export interface ApiApplicationLink {
  id: string;
  label: string;
  required: boolean;
  value: string;
}


export interface ApiApplicationQuestion {
  id: string;
  question: string;
  type: string;
  required: boolean;
  options: string[];
  accepted_file_types: string[];
  answer: string | number | null;
}


export interface ApiApplication {
  application_id: number;
  submitted_at: string;
  status: ApplicationStatus;

  candidate_profile: ApiApplicationCandidateProfile;

  job: ApiApplicationJob;

  form: ApiApplicationForm;

  links: ApiApplicationLink[];

  questions: ApiApplicationQuestion[];
}