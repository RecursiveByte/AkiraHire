"use client";

import { useState } from "react";

import SearchBar from "@/components/common/SearchBar";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

import { useLinkedInDrafts } from "@/hooks/recruiter/integration/linkedin/useLinkedInDrafts";
import { useLinkedInDraftActions } from "@/hooks/recruiter/integration/linkedin/useLinkedInDraftActions";

import LinkedInDraftsTable from "@/components/recruiter/linkedin/LinkedInDraftsTable";
import LinkedInDraftDetailModal from "@/components/recruiter/linkedin/LinkedInDraftDetailModal";
import LinkedInPublishModal from "@/components/recruiter/linkedin/LinkedInPublishModal";

import { LinkedInPostDraft } from "@/types/recruiter/integration/linkedin/linkedin.types";

export default function LinkedInDraftsPage() {
  const [search, setSearch] = useState("");
  const [draftToPostId, setDraftToPostId] = useState<string | null>(null);
  const [selectedDraft, setSelectedDraft] = useState<LinkedInPostDraft | null>(
    null
  );

  const { drafts, isLoading, error, refetchDrafts } =
    useLinkedInDrafts(search);

  const {
    draftToDeleteId,
    setDraftToDeleteId,
    isDeleting,
    handleDeleteConfirm,
    postingId,
    postToLinkedIn,
  } = useLinkedInDraftActions({ refetchDrafts });

  const showSkeleton = isLoading || (!!error && drafts.length === 0);

  const handlePostConfirm = async (images: File[]) => {
    if (!draftToPostId) return;

    await postToLinkedIn(draftToPostId, images);
    setDraftToPostId(null);
    setSelectedDraft(null);
  };

  const handleDeleteConfirmAndClose = async () => {
    await handleDeleteConfirm();
    setSelectedDraft(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-12">
      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
            LinkedIn Post Drafts
          </h2>

          <p className="text-on-surface-variant">
            Review, publish, or discard AI-generated LinkedIn hiring posts.
          </p>
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by draft title..."
        />

        <LinkedInDraftsTable
          drafts={drafts}
          isLoading={showSkeleton}
          error={error}
          postingId={postingId}
          onSelect={setSelectedDraft}
          onPost={setDraftToPostId}
          onDelete={setDraftToDeleteId}
        />
      </section>

      {selectedDraft && (
        <LinkedInDraftDetailModal
          draft={selectedDraft}
          isPosting={postingId === selectedDraft.draftId}
          onClose={() => setSelectedDraft(null)}
          onPost={setDraftToPostId}
          onDelete={setDraftToDeleteId}
        />
      )}

      <ConfirmActionModal
        isOpen={draftToDeleteId !== null}
        action="delete"
        title="Delete Draft?"
        description="This LinkedIn post draft will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isDeleting}
        onClose={() => setDraftToDeleteId(null)}
        onConfirm={handleDeleteConfirmAndClose}
      />

      <LinkedInPublishModal
        isOpen={draftToPostId !== null}
        isPosting={postingId === draftToPostId}
        onClose={() => setDraftToPostId(null)}
        onConfirm={handlePostConfirm}
      />
    </div>
  );
}