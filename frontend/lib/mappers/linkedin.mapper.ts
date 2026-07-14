import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";
import { LinkedInDraftApiResponse } from "@/types/recruiter/integration/linkedin/linkedin.api";

export function mapDraft(raw : LinkedInDraftApiResponse): LinkedInPostDraft {
    return {
      draftId: raw.draft_id,
      title: raw.title,
      postText: raw.post_text,
      createdAt: raw.created_at,
    };
  }