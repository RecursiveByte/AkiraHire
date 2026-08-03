export default function CandidateRowSkeleton() {
    return (
      <>
        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(250px,1fr)_minmax(280px,1fr)_180px_120px] items-center gap-4 px-6 py-5 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
  
            <div className="space-y-2">
              <div className="h-4 w-36 rounded bg-white/10" />
            </div>
          </div>
  
          <div className="h-4 w-52 rounded bg-white/10" />
  
          <div className="h-4 w-36 rounded bg-white/10" />
  
          <div className="flex justify-center">
            <div className="h-9 w-9 rounded-lg bg-white/10" />
          </div>
        </div>
  
        {/* Mobile */}
        <div className="lg:hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
  
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-white/10" />
              <div className="h-3 w-52 rounded bg-white/10" />
            </div>
          </div>
  
          <div className="mt-4 space-y-2">
            <div className="h-3 w-12 rounded bg-white/10" />
            <div className="h-4 w-36 rounded bg-white/10" />
          </div>
  
          <div className="mt-5 flex justify-end">
            <div className="h-9 w-9 rounded-lg bg-white/10" />
          </div>
        </div>
      </>
    );
  }