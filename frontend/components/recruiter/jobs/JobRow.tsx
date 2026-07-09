import { Job } from "@/types/job.types";
import StatusIndicator from "./StatusIndicator";
import JobActionButton from "./JobActionButton";

interface JobRowProps {
  job: Job;
  onClick: (jobId: number) => void;
  onDelete: (jobId: number) => Promise<void>;
  onPublish: (jobId: number) => Promise<void>;
}

export default function JobRow({
  job,
  onClick,
  onDelete,
  onPublish,
}: JobRowProps) {
  return (
    <div
      onClick={() => onClick(job.jobId)}
      className="
        flex flex-col
        gap-3
        lg:grid
        lg:grid-cols-[120px_minmax(260px,1fr)_120px_150px_190px]
        lg:gap-4
        lg:items-center
        px-6
        py-5
        hover:bg-white/3
        cursor-pointer
        transition-colors
      "
    >
      {/* Job ID */}
      <div className="flex items-center justify-between lg:block">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Job ID
        </span>

        <span className="text-sm text-on-surface-variant">#{job.jobId}</span>
      </div>

      {/* Role */}
      <div className="flex items-center justify-between lg:block min-w-0">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Role Title
        </span>

        <p className="text-primary font-medium truncate" title={job.title}>
          {job.title}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between lg:block">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Status
        </span>

        <StatusIndicator status={job.status} />
      </div>

      {/* Date Created */}
      <div className="flex items-center justify-between lg:block">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Date Created
        </span>

        <span className="text-sm text-on-surface-variant whitespace-nowrap">
          {job.createdAt}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t border-white/5 lg:border-0">
        <JobActionButton
          status={job.status}
          onPublish={() => onPublish(job.jobId)}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(job.jobId);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant/60 hover:text-error hover:bg-white/5 transition-colors"
          aria-label={`Delete ${job.title}`}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
}
