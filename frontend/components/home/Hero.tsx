import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-center mb-16">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
        <span className="flex h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

        <span className="font-geist text-[10px] uppercase tracking-widest text-white/70">
          AI-Powered Recruitment Platform
        </span>
      </div>

      <h1 className="font-geist text-[44px] md:text-[72px] font-bold leading-none tracking-tighter mb-4 max-w-4xl mx-auto">
        Recruit Smarter
        <br />
        <span className="text-white/70">Hire Faster.</span>
      </h1>

      <p className="text-white/70 max-w-xl mx-auto mb-8">
        Simplify recruitment with Akira AI. Generate AI-powered job
        descriptions, create Google Forms in seconds, publish directly to
        LinkedIn, and manage candidates from one intelligent hiring workspace.
      </p>

      {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-3"> */}
      {/* <Link */}
      {/* // href="/signup" */}
      {/* // className="w-full sm:w-auto rounded bg-white px-8 py-3 text-center font-bold text-black btn-glow transition-all active:scale-95" */}
      {/* // > */}
      {/* Get Started */}
      {/* </Link> */}
      {/* <button className="w-full sm:w-auto px-8 py-3 rounded font-bold border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2"> */}
      {/* <span className="msi text-xl">play_circle</span> */}
      {/* Demo */}
      {/* </button> */}
      {/* </div> */}
    </div>
  );
}
