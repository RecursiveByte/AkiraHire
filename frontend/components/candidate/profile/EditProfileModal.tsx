import { CandidateResume } from "@/types/candidate/candidate.types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  onFullNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  isSaving: boolean;
  onSave: () => void;
  resume: CandidateResume;
  selectedResumeFileName: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onReplaceResumeClick: () => void;
  onResumeFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  fullName,
  onFullNameChange,
  phone,
  onPhoneChange,
  isSaving,
  onSave,
  resume,
  selectedResumeFileName,
  fileInputRef,
  onReplaceResumeClick,
  onResumeFileChange,
}: EditProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onResumeFileChange}
        />

        <div className="flex items-center justify-between border-b border-white/5 px-8 pb-6 pt-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg tracking-tight text-primary">
              Edit Profile
            </h2>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Update your personal information and resume details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-on-surface-variant transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-8 px-8 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(event) => onFullNameChange(event.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 font-body-md text-primary transition-all focus:border-white/50 focus:shadow-[0_0_4px_rgba(255,255,255,0.15)] focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(event) => onPhoneChange(event.target.value)}
                placeholder="+1 (123) 456-7890"
                className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 font-body-md text-primary transition-all focus:border-white/50 focus:shadow-[0_0_4px_rgba(255,255,255,0.15)] focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              Resume Upload
            </label>
            <div
              onClick={onReplaceResumeClick}
              className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/2 p-10 transition-all hover:border-white/20 hover:bg-white/4"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary">
                  cloud_upload
                </span>
              </div>
              <p className="mb-1 font-medium text-primary">
                Drag and drop your resume here
              </p>
              <p className="text-xs text-on-surface-variant">PDF up to 10MB</p>

              <div className="mt-6 flex items-center gap-3">
                <span className="rounded border border-white/5 bg-white/5 px-2 py-1 text-[10px] text-on-surface-variant">
                  {selectedResumeFileName ?? resume.fileName}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onReplaceResumeClick();
                  }}
                  className="text-[10px] text-error transition-all hover:underline"
                >
                  Replace
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-white/5 bg-white/2 px-8 py-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded border border-white/10 px-6 py-2 font-label-sm text-label-sm text-primary transition-colors hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded bg-primary px-8 py-2 font-label-sm text-label-sm text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            {!isSaving && (
              <span className="material-symbols-outlined text-lg">check</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
