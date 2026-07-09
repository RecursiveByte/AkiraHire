"use client";

import { useAuthStore } from "@/store/authStore";
import { UserProfileCard } from "@/components/common/UserProfileCard";

interface TopNavProps {
  onOpenSidebar: () => void;
}

export default function TopNav({ onOpenSidebar }: TopNavProps) {
  const user = useAuthStore((state) => state.user);
  const userName = user?.name ?? "User";

  return (
    <header className="sticky top-0 h-16 border-b border-outline-variant/40 nav-blur flex justify-between items-center px-4 md:px-12 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onOpenSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
        >
          <span className="msi text-[22px]">menu</span>
        </button>
      </div>

      <UserProfileCard name={userName} variant="inline" />
    </header>
  );
}
