"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useLogout } from "@/hooks/auth/useLogout";
import { UserProfileCard } from "@/components/common/UserProfileCard";

export const ADMIN_NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    href: "/admin/candidates",
    icon: "groups",
    label: "Candidates",
  },
  {
    href: "/admin/recruiters",
    icon: "badge",
    label: "Recruiters",
  },
  {
    href: "/admin/analytics",
    icon: "analytics",
    label: "Analytics",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const userName = user?.name ?? "Admin";
  const logout = useLogout();

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
      <AppSidebar
        onLogout={logout}
        brandName="AkiraHire Admin"
        navItems={ADMIN_NAV_ITEMS}
        userName={userName}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#050505]/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
            >
              <span className="msi text-[24px]">menu</span>
            </button>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              Admin Portal
            </span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <UserProfileCard name={userName} variant="inline" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
