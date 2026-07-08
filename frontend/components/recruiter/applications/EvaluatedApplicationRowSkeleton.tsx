export default function EvaluatedApplicationRowSkeleton() {
    return (
      <div className="animate-pulse flex flex-col gap-3 lg:grid lg:grid-cols-[100px_100px_1fr_140px_140px_60px] lg:gap-4 lg:items-center px-6 py-5">
        {/* App ID */}
        <div className="lg:min-w-[100px]">
          <div className="h-4 w-16 rounded bg-white/10" />
        </div>
  
        {/* Score */}
        <div className="lg:min-w-[100px]">
          <div className="h-5 w-12 rounded bg-white/10" />
        </div>
  
        {/* Reasoning */}
        <div className="lg:min-w-[240px] space-y-2">
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/5" />
        </div>
  
        {/* Status */}
        <div className="flex items-center gap-2 lg:min-w-[140px]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="h-3 w-20 rounded bg-white/10" />
        </div>
  
        {/* Evaluated */}
        <div className="lg:min-w-[140px]">
          <div className="h-4 w-24 rounded bg-white/10" />
        </div>
  
        {/* Actions */}
        <div className="flex justify-end">
          <div className="h-8 w-8 rounded-lg bg-white/5" />
        </div>
      </div>
    );
  }