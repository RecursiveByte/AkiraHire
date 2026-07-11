"use client";

import { useApplications } from "@/hooks/application/useApplications";
import { useApplicationDelete } from "@/hooks/application/useApplicationDelete";
import { useApplicationModal } from "@/hooks/application/useApplicationModal";
import { useEvaluatedApplications } from "@/hooks/application/useEvaluatedApplications";
import { useEvaluatedApplicationModal } from "@/hooks/application/useEvaluatedApplicationModal";

import ApplicationsTable from "@/components/recruiter/applications/ApplicationsTable";
import ApplicationDetailModal from "@/components/recruiter/application-detail/ApplicationDetailModal";
import EvaluatedApplicationsTable from "@/components/recruiter/applications/EvaluatedApplicationsTable";
import EvaluatedApplicationDetailModal from "@/components/recruiter/application-detail/EvaluatedApplicationDetailModal";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";

export default function ApplicationsPage() {
  const { applications, isLoading, error, refetchApplications } =
    useApplications();

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
  } = useEvaluatedApplications();

  const { selectedEvaluation, openEvaluation, closeEvaluation } =
    useEvaluatedApplicationModal(evaluatedApplications);

  const showApplicationsSkeleton =
    isLoading || (!!error && applications.length === 0);

  const showEvaluatedSkeleton =
    isEvaluatedApplicationsLoading ||
    (!!evaluatedApplicationsError && evaluatedApplications.length === 0);

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-12">
      {/* Applications Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
            Applications
          </h2>
          <p className="text-on-surface-variant">
            Review candidate submissions across your forms.
          </p>
        </div>

        <ApplicationsTable
          applications={applications}
          isLoading={showApplicationsSkeleton}
          onSelectApplication={openApplication}
          onDeleteApplication={setApplicationToDeleteId}
        />
      </section>

      {/* Evaluated Applications Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
            Evaluated Applications
          </h2>
          <p className="text-on-surface-variant">
            AI-generated match scores and evaluation outcomes.
          </p>
        </div>

        <EvaluatedApplicationsTable
          evaluatedApplications={evaluatedApplications}
          isLoading={showEvaluatedSkeleton}
          onSelectEvaluation={openEvaluation}
          onDeleteEvaluation={(id) => console.log("Delete evaluation", id)}
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
