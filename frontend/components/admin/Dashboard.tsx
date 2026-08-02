import AdminStatCard from "@/components/admin/AdminStatCard";
import RecentActivity from "@/components/admin/RecentActivity";

const stats = [
  {
    label: "Candidates",
    value: 1284,
    icon: "groups",
    description: "Registered candidates",
  },
  {
    label: "Recruiters",
    value: 96,
    icon: "badge",
    description: "Active recruiters",
  },
  {
    label: "Jobs",
    value: 342,
    icon: "work",
    description: "Live job postings",
  },
  {
    label: "Applications",
    value: 5812,
    icon: "description",
    description: "Applications received",
  },
];

export default function Dashboard() {
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
          />
        ))}
      </div>

      <RecentActivity />
    </div>
  );
}