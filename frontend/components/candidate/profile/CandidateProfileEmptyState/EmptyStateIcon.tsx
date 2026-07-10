import { UserX } from "lucide-react";

export default function EmptyStateIcon() {
  return (
    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
      <UserX className="h-12 w-12 text-zinc-300" />
    </div>
  );
}