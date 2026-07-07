export default function JobsLoading() {
    return (
      <div className="max-w-[1400px] mx-auto px-margin-desktop py-12 animate-pulse space-y-6">
        <div className="h-10 w-64 bg-white/5 rounded" />
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-xl" />
          ))}
        </div>
        <div className="h-[600px] bg-white/5 rounded-xl" />
      </div>
    );
  }