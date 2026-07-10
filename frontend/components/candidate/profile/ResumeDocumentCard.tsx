import { CandidateResume } from "@/types/candidate/candidate.types";

interface ResumeDocumentCardProps {
  resume: CandidateResume;
}

export default function ResumeDocumentCard({ resume }: ResumeDocumentCardProps) {
  return (
    <>
      <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-black p-6 transition-all hover:border-white/25 hover:bg-white/5">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <span className="material-symbols-outlined text-3xl text-primary">description</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate font-semibold text-primary">{resume.fileName}</p>
          <p className="mt-1 truncate text-sm text-on-surface-variant">{resume.fileUrl}</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined text-on-surface-variant/40">open_in_new</span>
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm text-on-surface-variant">Last updated {resume.updatedAt}</p>
      </div>
    </>
  );
}