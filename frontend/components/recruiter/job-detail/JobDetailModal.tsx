import { Job } from "@/types/job.types";
import StatusIndicator from "@/components/recruiter/jobs/StatusIndicator";
import JobActionButton from "@/components/recruiter/jobs/JobActionButton";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";
import { useJobConfirmAction } from "@/hooks/recruiter/job/useJobConfirmAction";

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  onDelete: (jobId: number) => Promise<void>;
  onPublish: (jobId: number) => Promise<void>;
  onCloseJob: (jobId: number) => Promise<void> | void;
}

export default function JobDetailModal({
  job,
  onClose,
  onDelete,
  onPublish,
  onCloseJob,
}: JobDetailModalProps) {
  const { config, modalAction, requestAction, closeModal, handleConfirm } =
    useJobConfirmAction({ job, onDelete, onPublish, onCloseJob });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-black border border-white/10 shadow-2xl w-full max-w-lg rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-xs text-on-surface-variant/60 tracking-widest uppercase">
              {job.jobId}
            </p>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              {job.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close job details"
          >
            <span className="material-symbols-outlined text-primary">
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Status
            </p>
            <StatusIndicator status={job.status} />
          </div>

          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Job Description
            </p>
            <div className="border border-white/10 rounded-xl p-4 bg-surface-container">
              <p className="whitespace-pre-line text-on-surface leading-relaxed text-sm max-h-40 overflow-y-auto scrollbar-hide">
                {job.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-surface-container p-4 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-1">
                Application Deadline
              </p>
              <p className="text-sm text-primary font-medium">
                {job.applicationDeadline}
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-1">
                Created At
              </p>
              <p className="text-sm text-primary font-medium">
                {job.createdAt}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-0 flex items-center justify-between gap-3">
          <button
            onClick={() => requestAction("delete")}
            className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
            Delete Job
          </button>

          <div className="flex items-center gap-3">
            { (job.status !== "CLOSED" &&  job.status !== "DRAFT" ) && (
              <button
                onClick={() => requestAction("close")}
                className="flex items-center gap-2 px-4 py-2.5 border border-white/15 rounded-lg text-sm text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  visibility_off
                </span>
                Close Job
              </button>
            )}
            <JobActionButton
              status={job.status}
              onPublish={async() => requestAction("publish")}
            />
          </div>
        </div>
      </div>

      {config && (
        <ConfirmActionModal
          isOpen={modalAction !== null}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title={config.title(job.title)}
          description={config.description}
          confirmLabel={config.confirmLabel}
          action={config.action}
        />
      )}
    </div>
  );
}