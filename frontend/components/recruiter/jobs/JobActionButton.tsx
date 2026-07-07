import { JobStatus } from "@/types/job.types";

const ACTION_CONFIG: Record<JobStatus, { label: string; icon: string; classes: string }> = {
  ACTIVE: {
    label: "Published",
    icon: "check_circle",
    classes: "border border-emerald-400/30 text-emerald-400",
  },
  DRAFT: {
    label: "Publish",
    icon: "ios_share",
    classes: "border border-white/15 text-primary hover:bg-white/5",
  },
  CLOSED: {
    label: "Closed",
    icon: "visibility_off",
    classes: "border border-white/10 text-on-surface-variant/60",
  },
};

interface JobActionButtonProps {
  status: JobStatus;
  onPublish?: () => void;
}

export default function JobActionButton({ status, onPublish }: JobActionButtonProps) {
  const config = ACTION_CONFIG[status];
  const isActionable = status === "DRAFT";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // don't trigger the row's onClick (modal open)
        if (isActionable) onPublish?.();
      }}
      disabled={!isActionable}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${config.classes} ${
        !isActionable ? "cursor-default" : ""
      }`}
    >
      <span className="material-symbols-outlined text-[16px]">{config.icon}</span>
      {config.label}
    </button>
  );
}