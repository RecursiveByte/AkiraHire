"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Application } from "@/types/application.types";
import ApplicationRow from "./ApplicationRow";
import ApplicationRowSkeleton from "./ApplicationRowSkeleton";
import { SKELETON_ROW_COUNT } from "@/constants/skeleton";

interface ApplicationsTableProps {
  applications: Application[];
  isLoading: boolean;
  onSelectApplication: (applicationId: number) => void;
  onDeleteApplication: (applicationId: number) => void;
}

export default function ApplicationsTable({
  applications,
  isLoading,
  onSelectApplication,
  onDeleteApplication,
}: ApplicationsTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: applications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 6,
  });

  if (!isLoading && applications.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No applications to show yet.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div
        ref={parentRef}
        className="lg:overflow-x-auto overflow-y-auto max-h-140"
      >
        <div className="lg:min-w-275">
          <div className="hidden lg:grid lg:grid-cols-[150px_110px_110px_1fr_140px_120px_60px] lg:gap-4 px-6 py-4 border-b border-white/5 sticky top-0 bg-surface-container z-10">
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-37.5">
              Application ID
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-27.5">
              Form ID
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-27.5">
              Job ID
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-45">
              Applicant
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[120px]">
              Resume
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[140px]">
              Submitted At
            </span>
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold text-right">
              Actions
            </span>
          </div>

          {isLoading ? (
            Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => <ApplicationRowSkeleton key={i} />)
          ) : (
            <div
              className="relative w-full divide-y divide-white/5"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const application = applications[virtualRow.index];
                return (
                  <div
                    key={application.applicationId}
                    ref={virtualizer.measureElement}
                    data-index={virtualRow.index}
                    className="absolute top-0 left-0 w-full"
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                  >
                    <ApplicationRow
                      application={application}
                      onClick={onSelectApplication}
                      onDelete={onDeleteApplication}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}