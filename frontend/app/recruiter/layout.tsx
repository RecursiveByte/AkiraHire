"use client";

import { useState } from "react";

import { RecruiterSidebar } from "@/components/recruiter/RecruiterSidebar";
import { RecruiterTopbar } from "@/components/recruiter/RecruiterTopbar";

const MOCK_USER = {
  name: "Marcus",
  title: "Senior Recruiter",
  avatarUrl: undefined,
};

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">

      <RecruiterSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userName={MOCK_USER.name}
        userTitle={MOCK_USER.title}
        avatarUrl={MOCK_USER.avatarUrl}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <RecruiterTopbar
          collapsed={collapsed}
          userName={MOCK_USER.name}
          avatarUrl={MOCK_USER.avatarUrl}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}