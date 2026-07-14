import { LINKEDIN_DRAFT_TABLE_GRID } from "@/constants/linkedinDraftTable";

export default function LinkedInDraftRowSkeleton() {
  return (
    <div
      className={`grid grid-cols-1 lg:${LINKEDIN_DRAFT_TABLE_GRID} lg:gap-4 px-6 py-4 items-center animate-pulse`}
    >
      <div className="h-4 w-2/3 bg-white/10 rounded" />
      <div className="h-4 w-full bg-white/5 rounded" />
      <div className="h-4 w-1/2 bg-white/5 rounded" />

      <div className="flex justify-end gap-3">
        <div className="h-8 w-16 bg-white/5 rounded-lg" />
        <div className="h-8 w-16 bg-white/10 rounded-lg" />
      </div>
    </div>
  );
}