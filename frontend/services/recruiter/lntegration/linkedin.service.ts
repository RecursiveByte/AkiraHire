import { apiClient } from "@/lib/api/apiClient";
import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";
import { mapDraft } from "@/lib/mappers/linkedin.mapper";
import { LinkedInDraftApiResponse } from "@/types/recruiter/integration/linkedin/linkedin.api";

export class LinkedInDraftService {
  static async getDrafts(search?: string): Promise<LinkedInPostDraft[]> {
    const response = await apiClient.get<LinkedInDraftApiResponse[]>(
      "/linkedin/drafts",
      { params: { search: search || undefined } }
    );

    return response.data.map(mapDraft);
  }

  static async deleteDraft(draftId: string): Promise<void> {
    await apiClient.delete(`/linkedin/drafts/${draftId}`);
  }

  static async publishDraft(draftId: string, images: File[]): Promise<void> {
    const formData = new FormData();
    formData.append("draft_id", draftId);
    formData.append("approved", "true");

    images.forEach((image) => formData.append("images", image));

    await apiClient.post("/linkedin/publish-post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    
  }
}
