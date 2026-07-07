"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Job } from "@/types/job.types";
import JobRow from "./JobRow";

interface JobsTableProps {
  jobs: Job[];
  onSelectJob: (jobId: string) => void;
  onDeleteJob: (jobId: string) => void;
  onPublishJob: (jobId: string) => void;
}

export default function JobsTable({
  jobs,
  onSelectJob,
  onDeleteJob,
  onPublishJob,
}: JobsTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: jobs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 6,
  });

  if (jobs.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
        No jobs to show yet.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div
        ref={parentRef}
        className="scrollbar-hide lg:overflow-x-auto overflow-y-auto max-h-[560px]"
      >
        <div className="lg:min-w-[900px]">
          {/* Header */}
          <div className="hidden lg:grid lg:grid-cols-[120px_minmax(260px,1fr)_120px_150px_190px] lg:gap-4 px-6 py-4 border-b border-white/5 sticky top-0 bg-surface-container z-10">
            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[120px]">
              Job ID
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[260px]">
              Role Title
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[120px]">
              Status
            </span>

            <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-semibold lg:min-w-[150px]">
              Date Created
            </span>

            <span className="text-[11px] bg uppercase tracking-widest text-on-surface-variant/60 font-semibold  text-center lg:min-w-[190px]">
              Actions
            </span>
          </div>

          <div
            className="relative w-full divide-y divide-white/5"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const job = jobs[virtualRow.index];

              return (
                <div
                  key={job.jobId}
                  ref={virtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <JobRow
                    job={job}
                    onClick={onSelectJob}
                    onDelete={onDeleteJob}
                    onPublish={onPublishJob}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}