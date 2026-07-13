interface IntegrationBadgeProps {
    connected: boolean;
  }
  
  export function IntegrationBadge({ connected }: IntegrationBadgeProps) {
    return (
      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
          connected
            ? "border border-white/20 bg-white text-black"
            : "border border-white/10 bg-white/5 text-white/50"
        }`}
      >
        {connected ? "Connected" : "Not Connected"}
      </span>
    );
  }