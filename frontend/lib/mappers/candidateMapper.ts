import { ApiCandidateProfile } from "@/types/candidate/candidate.api";
import {
  CandidateProfile,
  CandidateResume,
} from "@/types/candidate/candidate.types";

export function mapApiCandidateProfile(
  api: ApiCandidateProfile
): CandidateProfile {
  return {
    fullName: api.full_name,
    email: api.email,
    phone: api.phone,
  };
}

export function mapApiCandidateResume(
  api: ApiCandidateProfile
): CandidateResume {
  return {
    fileName: decodeURIComponent(api.resume_url.split("/").pop() ?? ""),
    fileUrl: api.resume_url,
    updatedAt: new Date(api.updated_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };
}

import { JobApplicationFormApi } from "@/types/candidate/job/job.api";

import { JobApplicationForm } from "@/types/candidate/job/job.types";

export function mapApiJobApplicationForm(
  job: JobApplicationFormApi
): JobApplicationForm {
  return {
    formId: job.form_id,
    jobId: job.job_id,
    jobRole: job.job_role,
    jobDescription: job.job_description,

    title: job.title,
    status: job.status,

    expiresAt: new Date(job.expires_at),
    createdAt: new Date(job.created_at),
    updatedAt: new Date(job.updated_at),

    formSchema: {
      title: job.form_schema_json.title,
      description: job.form_schema_json.description,
      links: job.form_schema_json.links,

      additionalQuestions: job.form_schema_json.additional_questions.map(
        (question) => ({
          id: question.id,
          question: question.question,
          type: question.type,
          required: question.required,
          options: question.options,
          acceptedFileTypes: question.accepted_file_types,
        })
      ),
    },
  };
}
