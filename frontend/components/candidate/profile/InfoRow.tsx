interface InfoRowProps {
    icon: string;
    label: string;
    value: string;
  }
  
  export default function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
      <div className="group flex items-center justify-between border-b border-white/5 py-2">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">{icon}</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/60">{label}</p>
            <p className="text-body-lg font-medium text-primary">{value}</p>
          </div>
        </div>
      </div>
    );
  }