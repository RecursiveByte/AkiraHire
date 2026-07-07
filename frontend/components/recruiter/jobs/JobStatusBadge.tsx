import { JobStatus } from "@/types/job.types";

interface JobStatusBadgeProps {
  status: JobStatus;
  variant?: "outline" | "solid";
}

export default function JobStatusBadge({ status, variant = "outline" }: JobStatusBadgeProps) {
  if (variant === "solid") {
    return (
      <span className="bg-primary text-surface text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tighter">
        {status}
      </span>
    );
  }

  return (
    <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-white/60">
      {status}
    </span>
  );
}