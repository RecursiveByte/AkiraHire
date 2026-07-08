export default function ApplicationRowSkeleton() {
    return (
      <div className="animate-pulse flex flex-col lg:grid lg:grid-cols-[150px_110px_110px_1fr_140px_120px_60px] lg:gap-4 lg:items-center px-6 py-5">
        {/* Application ID */}
        <div className="lg:min-w-37.5">
          <div className="h-4 w-20 rounded bg-white/10" />
        </div>
  
        {/* Form ID */}
        <div className="lg:min-w-27.5">
          <div className="h-4 w-14 rounded bg-white/10" />
        </div>
  
        {/* Job ID */}
        <div className="lg:min-w-27.5">
          <div className="h-4 w-14 rounded bg-white/10" />
        </div>
  
        {/* Applicant */}
        <div className="space-y-2 lg:min-w-45">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-3 w-24 rounded bg-white/5" />
        </div>
  
        {/* Resume */}
        <div className="lg:min-w-[120px]">
          <div className="h-4 w-16 rounded bg-white/10" />
        </div>
  
        {/* Submitted At */}
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