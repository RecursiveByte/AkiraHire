import { Application } from "@/types/recruiter/application/application.types";
import { formatDate } from "@/lib/utils";
import ApplicationPreview from "./ApplicationPreview";
import ApplicationStatusBadge from "@/components/recruiter/applications/ApplicationStatusBadge";

interface ApplicationDetailModalProps {
  application: Application;
  onClose: () => void;
  onDelete: (applicationId: number) => void;
}

export default function ApplicationDetailModal({
  application,
  onClose,
  onDelete,
}: ApplicationDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-black border border-white/10 shadow-2xl w-full max-w-lg max-h-[85vh] rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-start shrink-0">
          <div className="space-y-2">

            <p className="text-xs text-on-surface-variant/60 tracking-widest uppercase">
              Application #{application.applicationId}
            </p>

            <h2 className="font-headline-lg text-headline-lg text-primary">
              {application.candidateProfile.fullName}
            </h2>

            <div className="flex items-center gap-3 pt-1">
              <ApplicationStatusBadge status={application.status} />

              <span className="text-xs text-on-surface-variant/60">
                Submitted {formatDate(application.submittedAt)}
              </span>
            </div>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close application details"
          >
            <span className="material-symbols-outlined text-primary">
              close
            </span>
          </button>

        </div>


        {/* Content */}
        <div className="p-8 space-y-6 overflow-y-auto scrollbar-hide">

          {/* Job Details */}
          <div className="border border-white/10 rounded-xl p-5 bg-surface-container space-y-3">
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest">
              Job Details
            </p>

            <div className="flex justify-between">
              <span className="text-sm text-on-surface-variant">
                Job ID
              </span>

              <span className="text-sm text-primary">
                #{application.jobId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-on-surface-variant">
                Job Title
              </span>

              <span className="text-sm text-primary">
                {application.jobTitle}
              </span>
            </div>
          </div>


          {/* Form Details */}
          <div className="border border-white/10 rounded-xl p-5 bg-surface-container space-y-3">
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest">
              Form Details
            </p>

            <div className="flex justify-between">
              <span className="text-sm text-on-surface-variant">
                Form ID
              </span>

              <span className="text-sm text-primary">
                #{application.form.formId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-on-surface-variant">
                Form Title
              </span>

              <span className="text-sm text-primary">
                {application.form.title}
              </span>
            </div>
          </div>


          {/* Application Preview */}
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-3">
              Application Preview
            </p>

            <div className="border border-white/10 rounded-xl p-5 bg-surface-container">
              <ApplicationPreview application={application} />
            </div>
          </div>


          {/* Delete Button */}
          <button
            onClick={() => onDelete(application.applicationId)}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-error/10 text-error hover:bg-error/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>

            Delete Application
          </button>

        </div>

      </div>
    </div>
  );
}