import Link from "next/link";
import { Briefcase, Plus } from "lucide-react";

interface EmptyStateActionsProps {
  onCreateProfile?: () => void;
}

export default function EmptyStateActions({
  onCreateProfile,
}: EmptyStateActionsProps) {
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
      <button
        onClick={onCreateProfile}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200"
      >
        <Plus size={18} />
        Create Profile
      </button>

      <Link
        href="/candidate/jobs"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 font-medium text-white hover:bg-zinc-900"
      >
        <Briefcase size={18} />
        Browse Jobs
      </Link>
    </div>
  );
}