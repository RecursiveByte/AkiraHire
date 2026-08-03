"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import RecruiterRow from "@/components/admin/recruiter/RecruiterRow";
import RecruiterRowSkeleton from "@/components/admin/recruiter/RecruiterRowSkeleton";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

import { SKELETON_ROW_COUNT } from "@/constants/skeleton";
import { RecruiterListItem } from "@/types/admin/admin.types";

interface RecruitersTableProps {
  recruiters: RecruiterListItem[];
  isLoading?: boolean;
  onDeleteRecruiter: (recruiterId: number) => Promise<void>;
}

export default function RecruitersTable({
  recruiters,
  isLoading = false,
  onDeleteRecruiter,
}: RecruitersTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const [selectedRecruiter, setSelectedRecruiter] =
    useState<RecruiterListItem | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const virtualizer = useVirtualizer({
    count: recruiters.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 6,
  });

  if (!isLoading && recruiters.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No recruiters found.
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
          <div className="lg:min-w-[700px]">
            {/* Header */}
            <div className="sticky top-0 z-10 hidden border-b border-white/5 bg-surface-container px-6 py-4 lg:grid lg:grid-cols-[minmax(300px,1fr)_minmax(320px,1fr)_120px] lg:gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
                Recruiter
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
                Email
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
                  <RecruiterRowSkeleton key={index} />
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
                  const recruiter = recruiters[virtualRow.index];

                  return (
                    <div
                      key={recruiter.id}
                      ref={virtualizer.measureElement}
                      data-index={virtualRow.index}
                      className="absolute left-0 top-0 w-full"
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <RecruiterRow
                        recruiter={recruiter}
                        onDelete={() => {
                          setSelectedRecruiter(recruiter);
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
          setSelectedRecruiter(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={async () => {
          if (!selectedRecruiter) return;

          await onDeleteRecruiter(selectedRecruiter.id);

          setSelectedRecruiter(null);
          setIsDeleteModalOpen(false);
        }}
        title="Delete Recruiter"
        description={`Are you sure you want to delete ${
          selectedRecruiter?.name ?? "this recruiter"
        }? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        action="delete"
      />
    </>
  );
}