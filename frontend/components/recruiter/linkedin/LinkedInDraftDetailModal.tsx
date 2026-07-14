"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";

interface LinkedInDraftDetailModalProps {
  draft: LinkedInPostDraft;
  isPosting: boolean;
  onClose: () => void;
  onPost: (draftId: string) => void;
  onDelete: (draftId: string) => void;
}

export default function LinkedInDraftDetailModal({
  draft,
  isPosting,
  onClose,
  onPost,
  onDelete,
}: LinkedInDraftDetailModalProps) {
  const formattedDate = new Date(draft.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl border overflow-auto border-white/10 bg-[#0a0a0a] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            {draft.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Created At
            </span>

            <p className="text-sm text-on-surface-variant mt-1">
              {formattedDate}
            </p>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Post Text
            </span>

            <div className="text-sm text-on-surface-variant mt-2 leading-relaxed whitespace-pre-line max-h-96 overflow-auto ">
            {draft.postText}

            </div>
            {/* <div className="mt-2 max-h-96 overflow-auto rounded-md border border-white/10 p-3"> */}
              {/* <div className="min-w-max whitespace-pre-wrap"> */}
                {/* {draft.postText} */}
              {/* </div> */}
            {/* </div> */}
          </div>
        </div>

        <div className="flex items-center sm:justify-end gap-3 pt-4 mt-4 border-t border-white/5">
          <button
            onClick={() => onDelete(draft.draftId)}
            className="text-sm text-error hover:text-error/80 transition-colors px-4 py-2 rounded-lg"
          >
            Delete
          </button>

          <button
            onClick={() => onPost(draft.draftId)}
            disabled={isPosting}
            className="text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg"
          >
            {isPosting ? "Posting..." : "Post on LinkedIn"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
