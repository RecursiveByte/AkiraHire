import { CandidateListItem } from "@/types/admin/admin.types";

  interface CandidateRowProps {
    candidate: CandidateListItem ;
    onDelete: () => void;
  }
  
  export default function CandidateRow({
    candidate,
    onDelete,
  }: CandidateRowProps) {
    return (
      <>
        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(240px,1fr)_minmax(280px,1fr)_180px_120px] items-center gap-4 px-6 py-5 transition hover:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              {candidate.fullName.charAt(0)}
            </div>
  
            <span className="font-medium text-white">
              {candidate.fullName}
            </span>
          </div>
  
          <p className="text-white/70">
            {candidate.email}
          </p>
  
          <p className="text-white/70">
            {candidate.phone}
          </p>
  
          <div className="flex justify-center">
            <button
              onClick={onDelete}
              className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 p-2 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20"
            >
              <span className="material-symbols-outlined text-[20px] text-red-400">
                delete
              </span>
            </button>
          </div>
        </div>
  
        {/* Mobile */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              {candidate.fullName.charAt(0)}
            </div>
  
            <div>
              <h3 className="font-medium text-white">
                {candidate.fullName}
              </h3>
  
              <p className="text-sm text-white/60">
                {candidate.email}
              </p>
            </div>
          </div>
  
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Phone
            </p>
  
            <p className="mt-1 text-sm text-white/80">
              {candidate.phone}
            </p>
          </div>
  
          <div className="mt-5 flex justify-end">
            <button
              onClick={onDelete}
              className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 p-2 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20"
            >
              <span className="material-symbols-outlined text-[20px] text-red-400">
                delete
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }