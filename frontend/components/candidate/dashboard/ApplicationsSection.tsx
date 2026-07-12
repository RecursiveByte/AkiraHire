"use client";

import { useMemo, useState } from "react";

import { useApplications } from "@/hooks/recruiter/application/useApplications";
import { useApplicationModal } from "@/hooks/recruiter/application/useApplicationModal";
import { useApplicationDelete } from "@/hooks/recruiter/application/useApplicationDelete";

import ApplicationSearchBar from "./ApplicationSearchBar";
import ApplicationsTable from "@/components/recruiter/applications/ApplicationsTable";
import ApplicationDetailModal from "@/components/recruiter/application-detail/ApplicationDetailModal";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

export default function ApplicationsSection() {
  const {
    applications,
    isLoading,
    error,
    refetchApplications,
  } = useApplications();

  const {
    selectedApplication,
    openApplication,
    closeApplication,
  } = useApplicationModal(applications);

  const {
    applicationToDeleteId,
    setApplicationToDeleteId,
    isDeleting,
    handleDeleteConfirm,
  } = useApplicationDelete({
    selectedApplicationId:
      selectedApplication?.applicationId ?? null,
    closeApplication,
    refetchApplications,
  });

  const [query, setQuery] = useState("");

  const filteredApplications = useMemo(() => {
    if (!query.trim()) return applications;

    return applications.filter((application) =>
      String(application.applicationId).includes(query.trim())
    );
  }, [applications, query]);

  const showApplicationsSkeleton =
    isLoading || (!!error && applications.length === 0);

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