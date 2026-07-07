"use client";

import { useJobs } from "@/hooks/useJobs";
import { useJobModal } from "@/hooks/useJobModal";
import JobsHeader from "@/components/recruiter/jobs/JobsHeader";
import JobsTable from "@/components/recruiter/jobs/JobsTable";
import JobDetailModal from "@/components/recruiter/job-detail/JobDetailModal";

export default function JobsPage() {
  const { jobs, isLoading, error, refetch } = useJobs();
  const { selectedJob, openJob, closeJob } = useJobModal(jobs);

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-6">
      <JobsHeader />

      {error && (
        <div className="glass-panel rounded-xl p-6 flex items-center justify-between text-sm">
          <span className="text-error">{error}</span>
          <button onClick={refetch} className="text-primary underline">
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
          Loading jobs...
        </div>
      ) : (
        !error && (
          <JobsTable
            jobs={jobs}
            onSelectJob={openJob}
            onDeleteJob={(id) => console.log("Delete job", id)}
            onPublishJob={(id) => console.log("Publish job", id)}
          />
        )
      )}

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