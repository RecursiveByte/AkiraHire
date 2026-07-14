"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RecruiterTopbar } from "@/components/recruiter/layout/RecruiterTopbar";
import { useLogout } from "@/hooks/auth/useLogout";

const RECRUITER_NAV_ITEMS = [
  { href: "/recruiter/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/recruiter/assistant", icon: "bolt", label: "Akira AI Assistant" },
  { href: "/recruiter/jobs", icon: "work", label: "Jobs" },
  { href: "/recruiter/applications", icon: "person_search", label: "Applications" },
  { href: "/recruiter/forms", icon: "assignment", label: "Forms" },
  { href: "/recruiter/posts", icon: "article", label: "Posts" },
  { href: "/recruiter/integrations", icon: "link", label: "Integrations" },
];

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const userName = user?.name ?? "User";
  const logout = useLogout();

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <AppSidebar
        onLogout={logout}
        brandName="AkiraHire"
        navItems={RECRUITER_NAV_ITEMS}
        userName={userName}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <RecruiterTopbar onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}