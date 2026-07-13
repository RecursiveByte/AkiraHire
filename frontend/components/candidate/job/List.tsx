"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import Card from "@/components/candidate/job/Card";
import Loading from "@/components/candidate/job/Loading";
import Empty from "@/components/candidate/job/Empty";
import JobDetailsModal from "@/components/candidate/job/JobDetailsModal";
import ApplyJobModal from "@/components/candidate/job/ApplyJobModal";

import { JobApplicationForm } from "@/types/candidate/job.types";
import { useAppliedFormIds } from "@/hooks/candidate/useAppliedFormIds";


type Props = {
  jobs: JobApplicationForm[];
  isLoading: boolean;
  error: string | null;
};


export default function List({
  jobs,
  isLoading,
  error,
}: Props) {

  const parentRef = useRef<HTMLDivElement>(null);

  const { appliedFormIds, markAsApplied } = useAppliedFormIds();


  const [selectedJob, setSelectedJob] =
    useState<JobApplicationForm | null>(null);


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

            const applied = appliedFormIds.has(job.formId);


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

                  applied={applied}

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

        onSuccess={() =>
          selectedJob &&
          markAsApplied(selectedJob.formId)
        }

        onOpenChange={setIsApplyOpen}

        job={selectedJob}

      />

    </>
  );
}