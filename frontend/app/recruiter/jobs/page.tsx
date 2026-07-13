"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import SearchBar from "@/components/common/SearchBar";

import { useJobs } from "@/hooks/recruiter/job/useJobs";
import { useJobModal } from "@/hooks/recruiter/job/useJobModal";

import JobsHeader from "@/components/recruiter/jobs/JobsHeader";
import JobsTable from "@/components/recruiter/jobs/JobsTable";
import JobDetailModal from "@/components/recruiter/job-detail/JobDetailModal";

export default function JobsPage() {
  const {
    jobs,
    isLoading,
    error,
    search,
    setSearch,
    deleteJob,
    publishJob,
    CloseJob,
    refetch,
  } = useJobs();

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

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by job ID or role..."
      />

      <JobsTable
        jobs={jobs}
        isLoading={showSkeleton}
        onSelectJob={openJob}
        onDeleteJob={deleteJob}
        onPublishJob={publishJob}
        onCloseJob={CloseJob}
      />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={closeJob}
          onDelete={deleteJob}
          onPublish={publishJob}
          onCloseJob={CloseJob}
        />
      )}
    </div>
  );
}