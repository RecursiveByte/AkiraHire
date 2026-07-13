import { Application } from "@/types/recruiter/application/application.types";
import { ApiApplication } from "@/types/api/application.types";


export function mapApiApplicationToApplication(
  apiApplication: ApiApplication
): Application {
  return {
    applicationId: apiApplication.application_id,

    submittedAt: apiApplication.submitted_at,

    status: apiApplication.status,

    jobId: apiApplication.job.job_id,

    jobTitle: apiApplication.job.role,

    candidateProfile: {
      fullName: apiApplication.candidate_profile.full_name,
      email: apiApplication.candidate_profile.email,
      phone: apiApplication.candidate_profile.phone,
      resumeUrl: apiApplication.candidate_profile.resume_url,
    },

    form: {
      formId: apiApplication.form.form_id,
      title: apiApplication.form.title,
      description: apiApplication.form.description,
      status: apiApplication.form.status,
    },

    links: apiApplication.links.map((link) => ({
      id: link.id,
      label: link.label,
      required: link.required,
      value: link.value,
    })),

    questions: apiApplication.questions.map((question) => ({
      id: question.id,
      question: question.question,
      type: question.type,
      required: question.required,
      options: question.options,
      acceptedFileTypes: question.accepted_file_types,
      answer: question.answer,
    })),
  };
}