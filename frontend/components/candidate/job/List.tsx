"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import Card from "@/components/candidate/job/Card";
import Loading from "@/components/candidate/job/Loading";
import Empty from "@/components/candidate/job/Empty";
import JobDetailsModal from "@/components/candidate/job/JobDetailsModal";
import ApplyJobModal from "@/components/candidate/job/ApplyJobModal";
import { useJobs } from "@/hooks/candidate/useJobs";
import { JobApplicationForm } from "@/types/candidate/job.types";

export default function List() {
  const parentRef = useRef<HTMLDivElement>(null);

  const { jobs, isLoading, error } = useJobs();

  const [selectedJob, setSelectedJob] = useState<JobApplicationForm | null>(
    null
  );

  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const virtualizer = useVirtualizer({
    count: jobs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 5,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-6 text-destructive">
        {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <div
        ref={parentRef}
        className="h-full overflow-y-auto rounded-lg border p-2"
      >
        <div
          className="relative w-full"
          style={{
            height: virtualizer.getTotalSize(),
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const job = jobs[virtualItem.index];

            return (
              <div
                key={virtualItem.key}
                className="absolute left-0 top-0 w-full"
                style={{
                  height: virtualItem.size,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Card
                  job={job}
                  onViewDetails={(job) => {
                    setSelectedJob(job);
                    setIsDetailsOpen(true);
                  }}
                  onApply={(job) => {
                    setSelectedJob(job);
                    setIsApplyOpen(true);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <JobDetailsModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        job={selectedJob}
      />
      <ApplyJobModal
        open={isApplyOpen}
        onOpenChange={setIsApplyOpen}
        job={selectedJob}
      />
    </>
  );
}
