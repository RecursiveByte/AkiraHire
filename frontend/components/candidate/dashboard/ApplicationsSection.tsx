"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useApplications } from "@/hooks/application/useApplications";
import { useApplicationModal } from "@/hooks/application/useApplicationModal";

import ApplicationSearchBar from "./ApplicationSearchBar";
import ApplicationsTable from "@/components/recruiter/applications/ApplicationsTable";
import ApplicationDetailModal from "@/components/recruiter/application-detail/ApplicationDetailModal";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

export default function ApplicationsSection() {
  const {
    applications,
    isLoading,
    isDeleting,
    error,
    refetch,
    deleteApplication,
  } = useApplications();

  const {
    selectedApplication,
    openApplication,
    closeApplication,
  } = useApplicationModal(applications);

  const [query, setQuery] = useState("");
  const [applicationToDeleteId, setApplicationToDeleteId] = useState<number | null>(null);

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

  const filteredApplications = useMemo(() => {
    if (!query.trim()) return applications;

    return applications.filter((application) =>
      String(application.applicationId).includes(query.trim())
    );
  }, [applications, query]);

  const showApplicationsSkeleton =
    isLoading || (!!error && applications.length === 0);

  const handleDeleteConfirm = async () => {
    if (applicationToDeleteId === null) return;

    await deleteApplication(applicationToDeleteId);

    if (
      selectedApplication?.applicationId === applicationToDeleteId
    ) {
      closeApplication();
    }

    setApplicationToDeleteId(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="font-geist text-headline-md text-primary">
          My Applications
        </h3>

        <ApplicationSearchBar
          value={query}
          onChange={setQuery}
        />
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <ApplicationsTable
          applications={filteredApplications}
          isLoading={showApplicationsSkeleton}
          onSelectApplication={openApplication}
          onDeleteApplication={setApplicationToDeleteId}
        />
      </div>

      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={closeApplication}
          onDelete={() =>
            setApplicationToDeleteId(
              selectedApplication.applicationId
            )
          }
        />
      )}

      <ConfirmActionModal
        isOpen={applicationToDeleteId !== null}
        action="delete"
        title="Delete Application?"
        description="This application will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isDeleting}
        onClose={() => setApplicationToDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}