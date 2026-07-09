import { Application } from "@/types/application.types";
import { formatDate } from "@/lib/utils";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

interface ApplicationRowProps {
  application: Application;
  onClick: (applicationId: number) => void;
  onDelete: (applicationId: number) => void;
}

export default function ApplicationRow({
  application,
  onClick,
  onDelete,
}: ApplicationRowProps) {
  return (
    <div
      onClick={() => onClick(application.applicationId)}
      className="flex flex-col gap-3 lg:grid lg:grid-cols-[150px_110px_110px_1fr_130px_120px_140px_60px] lg:gap-4 lg:items-center px-6 py-5 hover:bg-white/[0.03] cursor-pointer transition-colors"
    >
      {/* Application ID */}
      <div className="flex items-center justify-between lg:block lg:min-w-[150px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Application ID
        </span>

        <span className="text-sm text-on-surface-variant">
          #{application.applicationId}
        </span>
      </div>


      {/* Form ID */}
      <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Form ID
        </span>

        <span className="text-sm text-on-surface-variant">
          #{application.form.formId}
        </span>
      </div>


      {/* Job ID */}
      <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Job ID
        </span>

        <span className="text-sm text-on-surface-variant">
          #{application.jobId}
        </span>
      </div>


      {/* Applicant */}
      <div className="flex items-center justify-between lg:block lg:min-w-[180px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Applicant
        </span>

        <span
          className="text-primary font-medium truncate block"
          title={application.candidateProfile.fullName}
        >
          {application.candidateProfile.fullName}
        </span>
      </div>


      {/* Status */}
      <div className="flex items-center justify-between lg:block lg:min-w-[130px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Status
        </span>

        <ApplicationStatusBadge status={application.status} />
      </div>


      {/* Resume */}
      <div className="flex items-center justify-between lg:block lg:min-w-[120px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Resume
        </span>

        <a
          href={application.candidateProfile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-blue-400 underline hover:opacity-80 transition-opacity"
        >
          View Resume
        </a>
      </div>


      {/* Submitted At */}
      <div className="flex items-center justify-between lg:block lg:min-w-[140px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Submitted At
        </span>

        <span className="text-sm text-on-surface-variant whitespace-nowrap">
          {formatDate(application.submittedAt)}
        </span>
      </div>


      {/* Actions */}
      <div className="flex items-center justify-end pt-2 lg:pt-0 border-t border-white/5 lg:border-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(application.applicationId);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant/60 hover:text-error hover:bg-white/5 transition-colors"
          aria-label={`Delete application ${application.applicationId}`}
        >
          <span className="material-symbols-outlined text-[18px]">
            delete
          </span>
        </button>
      </div>
    </div>
  );
}