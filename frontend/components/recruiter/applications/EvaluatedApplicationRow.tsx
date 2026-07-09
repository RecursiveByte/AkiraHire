import ApplicationStatusBadge from "@/components/recruiter/applications/ApplicationStatusBadge";
import { formatDate } from "@/lib/utils";
import { Evaluation } from "@/types/evaluatedApplication.types";

interface EvaluatedApplicationRowProps {
  evaluatedApplication: Evaluation;
  onClick: (applicationId: number) => void;
  onDelete: (applicationId: number) => void;
}

export default function EvaluatedApplicationRow({
  evaluatedApplication,
  onClick,
  onDelete,
}: EvaluatedApplicationRowProps) {

  return (
    <div
      onClick={() => onClick(evaluatedApplication.applicationId)}
      className="flex  flex-col gap-3 lg:grid lg:grid-cols-[100px_100px_1fr_140px_140px_60px] lg:gap-4 lg:items-center px-6 py-5 hover:bg-white/5 cursor-pointer transition-colors duration-200"
    >
      <div className="flex items-center justify-between lg:block lg:min-w-[100px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          App ID
        </span>
        <span className="font-mono text-on-surface-variant/80 text-sm">
          #{evaluatedApplication.applicationId}
        </span>
      </div>

      <div className="flex items-center justify-between lg:block lg:min-w-[100px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Score
        </span>
        <span className="text-primary font-semibold text-body-lg">
          {evaluatedApplication.matchScore}%
        </span>
      </div>

      <div className="lg:min-w-[240px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden block mb-1">
          Reasoning
        </span>
        <p className="text-on-surface-variant/80 whitespace-pre-line text-sm line-clamp-2 lg:pr-4">
          {evaluatedApplication.reasoning}
        </p>
      </div>

      <div className="flex items-center justify-between lg:block lg:min-w-[140px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Status
        </span>
        <ApplicationStatusBadge status={evaluatedApplication.status} />
      </div>

      <div className="flex items-center justify-between lg:block lg:min-w-[140px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Evaluated
        </span>
        <span className="text-on-surface-variant/70 text-sm">
          {formatDate(evaluatedApplication.evaluatedAt)}
        </span>
      </div>

      <div className="flex items-center justify-end pt-2 lg:pt-0 border-t border-white/5 lg:border-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(evaluatedApplication.applicationId);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant/60 hover:text-error hover:bg-white/5 transition-colors"
          aria-label={`Delete evaluation ${evaluatedApplication.applicationId}`}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
}