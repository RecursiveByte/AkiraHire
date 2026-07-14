"use client";

import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";

interface LinkedInDraftRowProps {
  draft: LinkedInPostDraft;
  isPosting: boolean;
  onSelect: (draft: LinkedInPostDraft) => void;
  onPost: (draftId: string) => void;
  onDelete: (draftId: string) => void;
}

export default function LinkedInDraftRow({
  draft,
  isPosting,
  onSelect,
  onPost,
  onDelete,
}: LinkedInDraftRowProps) {
  const formattedDate = new Date(draft.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div
      onClick={() => onSelect(draft)}
      className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_140px_200px] lg:gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors cursor-pointer"
    >
      <span className="text-sm font-semibold text-primary truncate">
        {draft.title}
      </span>

      <span className="text-sm text-on-surface-variant truncate">
        {draft.postText}
      </span>

      <span className="text-sm text-on-surface-variant">
        {formattedDate}
      </span>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(draft.draftId);
          }}
          className="text-sm text-error hover:text-error/80 transition-colors px-3 py-1.5 rounded-lg"
        >
          Delete
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPost(draft.draftId);
          }}
          disabled={isPosting}
          className="text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors px-3 py-1.5 rounded-lg whitespace-nowrap"
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}