import { RecentActivity as RecentActivityData } from "@/types/admin/admin.types";

interface RecentActivityProps {
  activity?: RecentActivityData | null;
  isLoading?: boolean;
}

export default function RecentActivity({
  activity,
  isLoading = false,
}: RecentActivityProps) {
  const activities = [
    {
      icon: "person_add",
      title: `${activity?.candidates ?? 0} new candidates registered this week.`,
    },
    {
      icon: "badge",
      title: `${activity?.recruiters ?? 0} recruiters joined the platform this week.`,
    },
    {
      icon: "work",
      title: `${activity?.jobs ?? 0} new jobs posted this week.`,
    },
    {
      icon: "description",
      title: `${activity?.applications ?? 0} new applications submitted this week.`,
    },
  ];

  return (
    <div className="glass-panel rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-primary">
                {activity.icon}
              </span>
            </div>

            {isLoading ? (
              <div className="h-4 w-72 animate-pulse rounded bg-white/10" />
            ) : (
              <p className="text-sm text-on-surface">
                {activity.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}