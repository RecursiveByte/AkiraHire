"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useJobs } from "@/hooks/useJobs";
import { useJobModal } from "@/hooks/useJobModal";
import JobsHeader from "@/components/recruiter/jobs/JobsHeader";
import JobsTable from "@/components/recruiter/jobs/JobsTable";
import JobDetailModal from "@/components/recruiter/job-detail/JobDetailModal";

export default function JobsPage() {
  const { jobs, isLoading, error, refetch } = useJobs();
  const { selectedJob, openJob, closeJob } = useJobModal(jobs);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        action: {
          label: "Retry",
          onClick: refetch,
        },
      });
    }
  }, [error, refetch]);

  const showSkeleton = isLoading || (!!error && jobs.length === 0);
  
  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-6">
      <JobsHeader />

      <JobsTable
        jobs={jobs}
        isLoading={showSkeleton}
        onSelectJob={openJob}
        onDeleteJob={(id) => console.log("Delete job", id)}
        onPublishJob={(id) => console.log("Publish job", id)}
      />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={closeJob}
          onDelete={(id) => console.log("Delete job", id)}
          onPublish={(id) => console.log("Publish job", id)}
          onCloseJob={(id) => console.log("Close job", id)}
        />
      )}
    </div>
  );
}