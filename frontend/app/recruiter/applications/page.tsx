"use client";

import { useState } from "react";

import SearchBar from "@/components/common/SearchBar";
import FilterDropdown from "@/components/common/FilterDropdown";

import { useApplications } from "@/hooks/recruiter/application/useApplications";
import { useApplicationDelete } from "@/hooks/recruiter/application/useApplicationDelete";
import { useApplicationModal } from "@/hooks/recruiter/application/useApplicationModal";
import { useEvaluatedApplications } from "@/hooks/recruiter/application/useEvaluatedApplications";
import { useEvaluatedApplicationModal } from "@/hooks/recruiter/application/useEvaluatedApplicationModal";

import ApplicationsTable from "@/components/recruiter/applications/ApplicationsTable";
import ApplicationDetailModal from "@/components/recruiter/application-detail/ApplicationDetailModal";
import EvaluatedApplicationsTable from "@/components/recruiter/applications/EvaluatedApplicationsTable";
import EvaluatedApplicationDetailModal from "@/components/recruiter/application-detail/EvaluatedApplicationDetailModal";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");

  const STATUS_OPTIONS = [
    { label: "All", value: "ALL" },
    { label: "Shortlisted", value: "SHORTLISTED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  const [statusSearch, setStatusSearch] = useState<
    "SHORTLISTED" | "REJECTED" | undefined
  >(undefined);

  const { applications, isLoading, error, refetchApplications } =
    useApplications(search);

  const { selectedApplication, openApplication, closeApplication } =
    useApplicationModal(applications);

  const {
    applicationToDeleteId,
    setApplicationToDeleteId,
    isDeleting,
    handleDeleteConfirm,
  } = useApplicationDelete({
    selectedApplicationId: selectedApplication?.applicationId ?? null,
    closeApplication,
    refetchApplications,
  });

  const {
    evaluatedApplications,
    isLoading: isEvaluatedApplicationsLoading,
    error: evaluatedApplicationsError,
    deleteEvaluation,
  } = useEvaluatedApplications(statusSearch);

  const { selectedEvaluation, openEvaluation, closeEvaluation } =
    useEvaluatedApplicationModal(evaluatedApplications);

  const showApplicationsSkeleton =
    isLoading || (!!error && applications.length === 0);

  const showEvaluatedSkeleton =
    isEvaluatedApplicationsLoading ||
    (!!evaluatedApplicationsError && evaluatedApplications.length === 0);

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-12">
      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
            Applications
          </h2>

          <p className="text-on-surface-variant">
            Review candidate submissions across your forms.
          </p>
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by application ID or job title..."
        />

        <ApplicationsTable
          applications={applications}
          isLoading={showApplicationsSkeleton}
          onSelectApplication={openApplication}
          onDeleteApplication={setApplicationToDeleteId}
        />
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
            Evaluated Applications
          </h2>

          <p className="text-on-surface-variant">
            AI-generated match scores and evaluation outcomes.
          </p>
        </div>

        <FilterDropdown
          value={statusSearch ?? "ALL"}
          onChange={(val) =>
            setStatusSearch(
              val === "ALL" ? undefined : (val as "SHORTLISTED" | "REJECTED")
            )
          }
          options={STATUS_OPTIONS}
        />

        <EvaluatedApplicationsTable
          evaluatedApplications={evaluatedApplications}
          isLoading={showEvaluatedSkeleton}
          onSelectEvaluation={openEvaluation}
          onDeleteEvaluation={deleteEvaluation}
        />
      </section>

      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={closeApplication}
          onDelete={() =>
            setApplicationToDeleteId(selectedApplication.applicationId)
          }
        />
      )}

      {selectedEvaluation && (
        <EvaluatedApplicationDetailModal
          evaluatedApplication={selectedEvaluation}
          onClose={closeEvaluation}
          onDelete={deleteEvaluation}
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
    </div>
  );
}
