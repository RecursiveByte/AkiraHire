export default function JobRowSkeleton() {
    return (
      <div className="animate-pulse flex flex-col gap-3 px-6 py-4 lg:grid lg:grid-cols-[120px_minmax(260px,1fr)_120px_150px_190px] lg:gap-4 lg:items-center lg:py-4 border-b border-white/5">
        {/* Job ID */}
        <div className="h-4 w-20 rounded bg-white/10" />
  
        {/* Role Title */}
        <div className="space-y-2 lg:min-w-[260px]">
          <div className="h-4 w-48 rounded bg-white/10" />
          <div className="h-3 w-32 rounded bg-white/5" />
        </div>
  
        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="h-3 w-16 rounded bg-white/10" />
        </div>
  
        {/* Date Created */}
        <div className="h-4 w-24 rounded bg-white/10" />
  
        {/* Actions */}
        <div className="flex items-center justify-between lg:justify-center gap-4">
          <div className="h-7 w-24 rounded bg-white/10" />
          <div className="h-7 w-7 rounded bg-white/5" />
        </div>
      </div>
    );
  }