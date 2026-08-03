"use client";

import AdminStatCard from "@/components/admin/AdminStatCard";
import RecentActivity from "@/components/admin/RecentActivity";

import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

export default function Dashboard() {
  const {
    dashboard,
    loading,
  } = useAdminDashboard();

  const stats = [
    {
      label: "Candidates",
      value: dashboard?.stats.candidates ?? 0,
      icon: "groups",
      description: "Registered candidates",
    },
    {
      label: "Recruiters",
      value: dashboard?.stats.recruiters ?? 0,
      icon: "badge",
      description: "Registered recruiters",
    },
    {
      label: "Jobs",
      value: dashboard?.stats.jobs ?? 0,
      icon: "work",
      description: "Live job postings",
    },
    {
      label: "Applications",
      value: dashboard?.stats.applications ?? 0,
      icon: "description",
      description: "Applications received",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline-lg text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-on-surface-variant">
          Monitor users, recruiters, jobs, and overall platform activity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <AdminStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            isLoading={loading}
          />
        ))}
      </div>

      <RecentActivity
        activity={dashboard?.activity}
        isLoading={loading}
      />
    </div>
  );
}