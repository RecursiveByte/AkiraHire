"use client";

export default function ChatThinking() {
  return (
    <div className="flex max-w-4xl gap-4">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
        <span className="msi text-xs text-white/70">bolt</span>
      </div>

      <div className="flex-1">
        <div className="glass-card rounded-2xl rounded-tl-none p-4 w-20 flex items-center justify-center gap-1.5 bg-white/[0.02] border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }} />
        </div>
      </div>
    </div>
  );
}
