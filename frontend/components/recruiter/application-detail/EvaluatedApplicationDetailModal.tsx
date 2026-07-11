import { Evaluation } from "@/types/evaluatedApplication.types";
import { formatDate } from "@/lib/utils";
import EvaluatedApplicationStatusBadge from "@/components/recruiter/applications/EvaluatedApplicationStatusBadge";

interface EvaluatedApplicationDetailModalProps {
  evaluatedApplication: Evaluation;
  onClose: () => void;
}

export default function EvaluatedApplicationDetailModal({
  evaluatedApplication,
  onClose,
}: EvaluatedApplicationDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-black border border-white/10 shadow-2xl w-full max-w-lg max-h-[85vh] rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-white/10 flex justify-between items-start shrink-0">
          <div className="space-y-2">
            <p className="text-xs text-on-surface-variant/60 tracking-widest uppercase">
              Application #{evaluatedApplication.applicationId}
            </p>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Evaluation Result
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close evaluation details"
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Status
            </p>
            <EvaluatedApplicationStatusBadge status={evaluatedApplication.status} />
          </div>

          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Match Score
            </p>
            <p className="text-3xl font-headline-md text-primary">
              {evaluatedApplication.matchScore}%
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Reasoning
            </p>
            <div className="border border-white/10 rounded-xl p-4 bg-surface-container">
              <p className="text-on-surface whitespace-pre-line  leading-relaxed text-sm">
                {evaluatedApplication.reasoning}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container p-4 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-1">
                Evaluated At
              </p>
              <p className="text-sm text-primary font-medium">
                {formatDate(evaluatedApplication.evaluatedAt)}
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-1">
                Updated At
              </p>
              <p className="text-sm text-primary font-medium">
                {formatDate(evaluatedApplication.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}