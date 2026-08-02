"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import CandidateRow from "./CandidateRow";
import CandidateRowSkeleton from "./CandidateRowSkeleton";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

import { SKELETON_ROW_COUNT } from "@/constants/skeleton";
import { CandidateListItem } from "@/types/admin/admin.types";


interface CandidatesTableProps {
  candidates: CandidateListItem[];
  isLoading?: boolean;
  onDeleteCandidate: (candidateId: number) => Promise<void>;
}


export default function CandidatesTable({
  candidates,
  isLoading = false,
  onDeleteCandidate,
}: CandidatesTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateListItem | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const virtualizer = useVirtualizer({
    count: candidates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 6,
  });

  if (!isLoading && candidates.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No candidates found.
      </div>
    );
  }

  return (
    <>
      <div className="glass-panel overflow-hidden rounded-xl">
        <div
          ref={parentRef}
          className="scrollbar-hide overflow-y-auto lg:overflow-x-auto max-h-[560px]"
        >
          <div className="lg:min-w-[900px]">
            {/* Header */}
            <div className="sticky top-0 z-10 hidden border-b border-white/5 bg-surface-container px-6 py-4 lg:grid lg:grid-cols-[minmax(240px,1fr)_minmax(280px,1fr)_180px_120px] lg:gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
                Candidate
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
                Email
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
                Phone
              </span>

              <span className="text-center text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
                Actions
              </span>
            </div>

            {isLoading ? (
              <div className="divide-y divide-white/5">
                {Array.from({
                  length: SKELETON_ROW_COUNT,
                }).map((_, index) => (
                  <CandidateRowSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div
                className="relative w-full divide-y divide-white/5"
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const candidate = candidates[virtualRow.index];

                  return (
                    <div
                      key={candidate.id}
                      ref={virtualizer.measureElement}
                      data-index={virtualRow.index}
                      className="absolute left-0 top-0 w-full px-2 py-2"
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <CandidateRow
                        candidate={candidate}
                        onDelete={() => {
                          setSelectedCandidate(candidate);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setSelectedCandidate(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={async () => {
          if (!selectedCandidate) return;

          await onDeleteCandidate(selectedCandidate.id);

          setSelectedCandidate(null);
          setIsDeleteModalOpen(false);
        }}
        title="Delete Candidate"
        description={`Are you sure you want to delete ${selectedCandidate?.fullName ?? "this candidate"}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        action="delete"
      />
    </>
  );
}