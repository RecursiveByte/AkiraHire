export default function RecruiterRowSkeleton() {
    return (
      <>
        {/* Desktop */}
        <div className="hidden animate-pulse items-center gap-4 border-b border-white/5 px-6 py-5 lg:grid lg:grid-cols-[minmax(300px,1fr)_minmax(320px,1fr)_120px]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
  
            <div className="h-4 w-40 rounded bg-white/10" />
          </div>
  
          <div className="h-4 w-52 rounded bg-white/10" />
  
          <div className="flex justify-center">
            <div className="h-9 w-9 rounded-lg bg-white/10" />
          </div>
        </div>
  
        {/* Mobile */}
        <div className="mb-3 animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
  
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-white/10" />
              <div className="h-3 w-52 rounded bg-white/10" />
            </div>
          </div>
  
          <div className="mt-5 flex justify-end">
            <div className="h-9 w-9 rounded-lg bg-white/10" />
          </div>
        </div>
      </>
    );
  }