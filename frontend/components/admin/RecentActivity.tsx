const activities = [
    {
      icon: "person_add",
      title: "24 new candidates registered today.",
    },
    {
      icon: "badge",
      title: "3 recruiters joined the platform.",
    },
    {
      icon: "work",
      title: "18 new jobs posted.",
    },
    {
      icon: "description",
      title: "247 new applications submitted.",
    },
    {
      icon: "smart_toy",
      title: "12 AI resume evaluations completed.",
    },
  ];
  
  export default function RecentActivity() {
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
  
              <p className="text-sm text-on-surface">
                {activity.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }