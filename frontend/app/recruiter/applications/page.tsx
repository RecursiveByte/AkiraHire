"use client";

import { useApplications } from "@/hooks/useApplications";
import { useApplicationModal } from "@/hooks/useApplicationModal";
import { useEvaluatedApplications } from "@/hooks/useEvaluatedApplications";
import { useEvaluatedApplicationModal } from "@/hooks/useEvaluatedApplicationModal";
import ApplicationsTable from "@/components/recruiter/applications/ApplicationsTable";
import ApplicationDetailModal from "@/components/recruiter/application-detail/ApplicationDetailModal";
import EvaluatedApplicationsTable from "@/components/recruiter/applications/EvaluatedApplicationsTable";
import EvaluatedApplicationDetailModal from "@/components/recruiter/application-detail/EvaluatedApplicationDetailModal";

export default function ApplicationsPage() {
  const { applications, isLoading, error, refetch } = useApplications();
  const { selectedApplication, openApplication, closeApplication } = useApplicationModal(applications);

  const {
    evaluatedApplications,
    isLoading: isEvaluatedApplicationsLoading,
    error: evaluatedApplicationsError,
    refetch: refetchEvaluatedApplications,
  } = useEvaluatedApplications();

  const {
    selectedEvaluation,
    openEvaluation,
    closeEvaluation,
  } = useEvaluatedApplicationModal(evaluatedApplications);

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-12">
      {/* Applications Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Applications</h2>
          <p className="text-on-surface-variant">Review candidate submissions across your forms.</p>
        </div>

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
            Loading applications...
          </div>
        ) : (
          !error && (
            <ApplicationsTable
              applications={applications}
              onSelectApplication={openApplication}
              onDeleteApplication={(id) => console.log("Delete application", id)}
            />
          )
        )}
      </section>

      {/* Evaluated Applications Section */}
      <section className="space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Evaluated Applications</h2>
          <p className="text-on-surface-variant">AI-generated match scores and evaluation outcomes.</p>
        </div>

        {evaluatedApplicationsError && (
          <div className="glass-panel rounded-xl p-6 flex items-center justify-between text-sm">
            <span className="text-error">{evaluatedApplicationsError}</span>
            <button onClick={refetchEvaluatedApplications} className="text-primary underline">
              Retry
            </button>
          </div>
        )}

        {isEvaluatedApplicationsLoading ? (
          <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
            Loading evaluated applications...
          </div>
        ) : (
          !evaluatedApplicationsError && (
            <EvaluatedApplicationsTable
              evaluatedApplications={evaluatedApplications}
              onSelectEvaluation={openEvaluation}
              onDeleteEvaluation={(id) => console.log("Delete evaluation", id)}
            />
          )
        )}
      </section>

      {selectedApplication && (
        <ApplicationDetailModal application={selectedApplication} onClose={closeApplication} />
      )}

      {selectedEvaluation && (
        <EvaluatedApplicationDetailModal
          evaluatedApplication={selectedEvaluation}
          onClose={closeEvaluation}
        />
      )}
    </div>
  );
}