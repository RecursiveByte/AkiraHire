"use client";

import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";
import LinkedInDraftRow from "./LinkedInDraftRow";
import LinkedInDraftRowSkeleton from "./LinkedInDraftRowSkeleton";
import { LINKEDIN_DRAFT_SKELETON_COUNT } from "@/constants/skeleton";

interface LinkedInDraftsTableProps {
  drafts: LinkedInPostDraft[];
  isLoading: boolean;
  error?: string | null;
  postingId: string | null;
  onSelect: (draft: LinkedInPostDraft) => void;
  onPost: (draftId: string) => void;
  onDelete: (draftId: string) => void;
}

export default function LinkedInDraftsTable({
  drafts,
  isLoading,
  error,
  postingId,
  onSelect,
  onPost,
  onDelete,
}: LinkedInDraftsTableProps) {
  if (isLoading) {
    return (
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="lg:overflow-x-auto overflow-y-auto max-h-140">
          <div className="lg:min-w-300 divide-y divide-white/5">
            {Array.from({ length: LINKEDIN_DRAFT_SKELETON_COUNT }).map(
              (_, i) => (
                <LinkedInDraftRowSkeleton key={i} />
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (drafts.length === 0 || error) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No LinkedIn drafts to show yet.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="lg:overflow-x-auto overflow-y-auto max-h-140">
        <div className="lg:min-w-300">
          <div className="hidden lg:grid lg:grid-cols-[1fr_2fr_140px_200px] lg:gap-4 px-6 py-4 border-b border-white/5 sticky top-0 bg-surface-container z-10">
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Title
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Post Text
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Created At
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold text-center">
              Actions
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {drafts.map((draft) => (
              <LinkedInDraftRow
                key={draft.draftId}
                draft={draft}
                isPosting={postingId === draft.draftId}
                onSelect={onSelect}
                onPost={onPost}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}