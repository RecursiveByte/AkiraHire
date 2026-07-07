export default function JobsHeader() {
    return (
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Jobs Management</h2>
          <p className="text-on-surface-variant max-w-md">
            Oversee your active recruitment pipelines and AI-assisted sourcing parameters.
          </p>
        </div>
  
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-white/15 rounded-lg text-sm text-primary hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>
      </div>
    );
  }