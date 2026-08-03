interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: string;
  description: string;
  isLoading?: boolean;
}

export default function AdminStatCard({
  label,
  value,
  icon,
  description,
  isLoading = false,
}: AdminStatCardProps) {
  return (
    <div
      className="
        glass-panel
        rounded-2xl
        border
        border-white/10
        p-5
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/[0.02]
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/55">
            {label}
          </p>

          {isLoading ? (
            <div className="mt-3 h-9 w-24 animate-pulse rounded bg-white/10" />
          ) : (
            <h2 className="mt-3 text-3xl font-bold text-white">
              {value}
            </h2>
          )}

          {isLoading ? (
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-white/10" />
          ) : (
            <p className="mt-2 text-sm text-on-surface-variant/70">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <span className="material-symbols-outlined text-2xl text-white/80">
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}