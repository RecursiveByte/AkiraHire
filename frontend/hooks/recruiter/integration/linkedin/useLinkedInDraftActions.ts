"use client";

import { useState } from "react";
import { LinkedInDraftService } from "@/services/recruiter/lntegration/linkedin.service";
import { toast } from "sonner";

interface UseLinkedInDraftActionsParams {
  refetchDrafts: () => void;
}

export function useLinkedInDraftActions({
  refetchDrafts,
}: UseLinkedInDraftActionsParams) {
  const [draftToDeleteId, setDraftToDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postingId, setPostingId] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (!draftToDeleteId) return;

    setIsDeleting(true);

    try {
      await LinkedInDraftService.deleteDraft(draftToDeleteId);
      refetchDrafts();
      toast.success("Draft deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete draft.");
    } finally {
      setIsDeleting(false);
      setDraftToDeleteId(null);
    }
  };

  const postToLinkedIn = async (draftId: string, images: File[] = []) => {
    setPostingId(draftId);

    try {
      await LinkedInDraftService.publishDraft(draftId, images);
      refetchDrafts();
      toast.success("Post published to LinkedIn successfully.");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        toast.error(
          "Your LinkedIn account is not connected. Please connect it first."
        );
      } else {
        toast.error("Failed to publish draft to LinkedIn.");
      }
    } finally {
      setPostingId(null);
    }
  };

  return {
    draftToDeleteId,
    setDraftToDeleteId,
    isDeleting,
    handleDeleteConfirm,
    postingId,
    postToLinkedIn,
  };
}