"use client";

import { useEffect, useState, useCallback } from "react";
import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";
import { LinkedInDraftService } from "@/services/recruiter/lntegration/linkedin.service";
import { useDebounce } from "@/hooks/common/useDebounce";

export function useLinkedInDrafts(search: string) {
  const [drafts, setDrafts] = useState<LinkedInPostDraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchDrafts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await LinkedInDraftService.getDrafts(debouncedSearch);
      setDrafts(data);
    } catch (err) {
      setError("Failed to load LinkedIn drafts.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  return {
    drafts,
    isLoading,
    error,
    refetchDrafts: fetchDrafts,
  };
}