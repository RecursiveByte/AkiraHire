import { JobStatus } from "@/types/job.types";

const STATUS_STYLES: Record<JobStatus, { dot: string; text: string; label: string }> = {
  OPEN: { dot: "bg-emerald-400", text: "text-emerald-400", label: "OPEN" },
  DRAFT: { dot: "bg-amber-400", text: "text-amber-400", label: "Draft" },
  CLOSED: { dot: "bg-white/40", text: "text-on-surface-variant", label: "Closed" },
};

export default function StatusIndicator({ status }: { status: JobStatus }) {
  console.log(status)
  const style = STATUS_STYLES[status];
  return (
    <span className={`flex items-center gap-1.5 text-sm font-medium ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}