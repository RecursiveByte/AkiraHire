interface StatCardProps {
    label: string;
    value: string | number;
    deltaLabel?: string;
  }
  
  export default function StatCard({ label, value, deltaLabel }: StatCardProps) {
    return (
      <div className="glass-panel p-5 rounded-xl">
        <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-3">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-headline-md text-primary">{value}</p>
          {deltaLabel && (
            <span className="flex items-center gap-0.5 text-xs text-emerald-400 font-medium">
              {deltaLabel}
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
            </span>
          )}
        </div>
      </div>
    );
  }