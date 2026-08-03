import { RecruiterListItem } from "@/types/admin/admin.types";

interface RecruiterRowProps {
  recruiter: RecruiterListItem;
  onDelete: () => void;
}

export default function RecruiterRow({
  recruiter,
  onDelete,
}: RecruiterRowProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center border-b border-white/5 px-6 py-5 transition hover:bg-white/[0.03] lg:grid lg:grid-cols-[minmax(300px,1fr)_minmax(320px,1fr)_120px] lg:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
            {recruiter.name.charAt(0)}
          </div>

          <span className="font-medium text-white">
            {recruiter.name}
          </span>
        </div>

        <p className="truncate text-white/70">
          {recruiter.email}
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
      <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
            {recruiter.name.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-white">
              {recruiter.name}
            </h3>

            <p className="truncate text-sm text-white/60">
              {recruiter.email}
            </p>
          </div>
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