"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { AppSidebar } from "@/components/layout/AppSidebar";
import TopNav from "@/components/candidate/layout/TopNav";
import { useLogout } from "@/hooks/auth/useLogout";

const CANDIDATE_NAV_ITEMS = [
  { href: "/candidate/dashboard", icon: "space_dashboard", label: "Dashboard" },
  { href: "/candidate/profile", icon: "account_circle", label: "Profile" },
  { href: "/candidate/jobs", icon: "work", label: "Jobs" },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const userName = user?.name ?? "User";
  const logout  = useLogout()

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      <AppSidebar
        brandName="AkireHire"
        navItems={CANDIDATE_NAV_ITEMS}
        userName={userName}
        onLogout={logout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <div className="flex-1 min-h-0 flex flex-col min-w-0">
        <TopNav onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-8 pb-12 md:px-12">
          <div className="mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col space-y-12">{children}</div>
        </main>
      </div>

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/3 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}