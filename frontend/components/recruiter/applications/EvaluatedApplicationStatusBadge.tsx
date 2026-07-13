import { EvaluationStatus } from "@/types/recruiter/application/evaluatedApplication.types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<EvaluationStatus, { label: string; dot: string; text: string }> = {
  SHORTLISTED: { label: "Shortlisted", dot: "bg-emerald-500", text: "text-emerald-400" },
  REJECTED: { label: "Rejected", dot: "bg-error", text: "text-error" },
};

export default function EvaluatedApplicationStatusBadge({ status }: { status: EvaluationStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-2">
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      <span className={cn("text-label-sm font-medium", config.text)}>{config.label}</span>
    </div>
  );
}