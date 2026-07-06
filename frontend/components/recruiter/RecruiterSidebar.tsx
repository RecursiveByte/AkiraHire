"use client";

import { Dispatch, SetStateAction } from "react";

import { RecruiterNavItem } from "./RecruiterNavItem";
import { UserProfileCard } from "./UserProfileCard";

const NAV_ITEMS = [
  { href: "/recruiter/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/recruiter/assistant", icon: "bolt", label: "Akira AI Assistant" },
  { href: "/recruiter/jobs", icon: "work", label: "Jobs" },
  {
    href: "/recruiter/applications",
    icon: "person_search",
    label: "Applications",
  },
  { href: "/recruiter/forms", icon: "assignment", label: "Forms" },
];

interface RecruiterSidebarProps {
  userName: string;
  userTitle: string;
  avatarUrl?: string;

  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;

  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export function RecruiterSidebar({
  userName,
  userTitle,
  avatarUrl,
  collapsed,
  setCollapsed,
  isSidebarOpen,
  setIsSidebarOpen,
}: RecruiterSidebarProps) {
  return (
    <aside
      className={`
        fixed md:relative
        top-0 left-0 z-50
        flex h-screen flex-col
        border-r border-white/5
        bg-[#050505]
        transition-all duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        ${collapsed ? "md:w-20" : "md:w-65"}
        w-72
      `}
    >
      <div
        className={`flex h-20 items-center px-4 ${
          collapsed ? "md:justify-center justify-between" : "justify-between"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
            <span className="msi text-black">bolt</span>
          </div>

          {!collapsed && (
            <span className="whitespace-nowrap text-xl font-bold text-white">
              AkiraHire
            </span>
          )}
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
        >
          <span className="msi text-[22px]">close</span>
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => (
          <RecruiterNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}

        <div className="mt-auto space-y-3 pb-5">
          {!collapsed && (
            <UserProfileCard
              name={userName}
              title={userTitle}
              avatarUrl={avatarUrl}
            />
          )}

          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden md:flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-white transition hover:bg-white/10"
          >
            <span className="msi">
              {collapsed
                ? "keyboard_double_arrow_right"
                : "keyboard_double_arrow_left"}
            </span>

            {!collapsed && (
              <span className="ml-2 text-sm font-medium">
                Collapse
              </span>
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
}