"use client";

import { useAuthStore } from "@/store/authStore";
import { UserProfileCard } from "@/components/common/UserProfileCard";

interface RecruiterTopbarProps {
  onOpenSidebar: () => void;
}

export function RecruiterTopbar({ onOpenSidebar }: RecruiterTopbarProps) {
  const user = useAuthStore((state) => state.user);
  const userName = user?.name ?? "User";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center border-b border-white/5 bg-[#050505]/80 px-6 backdrop-blur-xl">
      <button
        onClick={onOpenSidebar}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
      >
        <span className="msi text-[24px]">menu</span>
      </button>

      <div className="ml-auto">
        <UserProfileCard name={userName} variant="inline" />
      </div>
    </header>
  );
}