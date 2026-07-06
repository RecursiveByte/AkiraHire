export default function Hero() {
    return (
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] font-geist uppercase tracking-widest text-white/70">
            Next-Gen Recruitment Platform
          </span>
        </div>
  
        <h1 className="font-geist text-[44px] md:text-[72px] font-bold leading-none tracking-tighter mb-4 max-w-4xl mx-auto">
          Recruitment,
          <br />
          <span className="text-white/70">Reimagined.</span>
        </h1>
  
        <p className="text-white/70 max-w-xl mx-auto mb-8">
          Sovereign AI agents that source, screen, and schedule top-tier talent in seconds. Built
          for the modern engineering organization.
        </p>
  
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded font-bold btn-glow transition-all active:scale-95">
            Get Started
          </button>
          <button className="w-full sm:w-auto px-8 py-3 rounded font-bold border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <span className="msi text-xl">play_circle</span>
            Demo
          </button>
        </div>
      </div>
    );
  }