import { Application } from "@/types/application.types";
import ApplicationPreview from "./ApplicationPreview";

interface ApplicationDetailModalProps {
  application: Application;
  onClose: () => void;
}

export default function ApplicationDetailModal({ application, onClose }: ApplicationDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-black border border-white/10 shadow-2xl w-full max-w-lg max-h-[85vh] rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-white/10 flex justify-between items-start shrink-0">
          <div className="space-y-2">
            <p className="text-xs text-on-surface-variant/60 tracking-widest uppercase">
              Application #{application.applicationId} • Form #{application.form.formId} • Job #
              {application.form.jobId}
            </p>
            <h2 className="font-headline-lg text-headline-lg text-primary">{application.form.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close application details"
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-3">
              Application Preview
            </p>
            <div className="border border-white/10 rounded-xl p-5 bg-surface-container">
              <ApplicationPreview application={application} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}