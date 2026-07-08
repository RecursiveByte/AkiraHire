export default function FormRowSkeleton() {
    return (
      <div className="animate-pulse flex flex-col lg:grid lg:grid-cols-[110px_110px_1fr_110px_190px] lg:gap-4 lg:items-center px-6 py-5">
        {/* Form ID */}
        <div className="lg:min-w-[110px]">
          <div className="h-4 w-14 rounded bg-white/10" />
        </div>
  
        {/* Job ID */}
        <div className="lg:min-w-[110px]">
          <div className="h-4 w-14 rounded bg-white/10" />
        </div>
  
        {/* Form Title */}
        <div className="lg:min-w-[220px]">
          <div className="h-4 w-40 rounded bg-white/10" />
        </div>
  
        {/* Status */}
        <div className="flex items-center gap-2 lg:min-w-[110px]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="h-3 w-16 rounded bg-white/10" />
        </div>
  
        {/* Actions */}
        <div className="flex items-center gap-3 justify-between lg:justify-end lg:min-w-[190px] pt-2 lg:pt-0">
          <div className="h-8 w-24 rounded-lg bg-white/10" />
          <div className="h-8 w-8 rounded-lg bg-white/5" />
        </div>
      </div>
    );
  }