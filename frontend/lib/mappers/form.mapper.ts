import { Form, FormStatus } from "@/types/form.types";
import { ApiForm, ApiFormStatus } from "@/types/form.types";

const STATUS_MAP: Record<ApiFormStatus, FormStatus> = {
  draft: "DRAFT",
  open: "OPEN",
  closed: "CLOSED",
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function mapApiFormToForm(apiForm: ApiForm): Form {
  return {
    formId: apiForm.form_id,
    jobId: apiForm.job_id,
    title: apiForm.title,
    status: STATUS_MAP[apiForm.status],
    formSchemaJson: apiForm.form_schema_json,
    expiresAt: formatDate(apiForm.expires_at),
    createdAt: formatDate(apiForm.created_at),
    updatedAt: formatDate(apiForm.updated_at),
  };
}