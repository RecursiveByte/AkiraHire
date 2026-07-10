"use client";

export default function CandidateProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <div className="h-9 w-72 rounded-md bg-white/10" />
          <div className="mt-3 h-5 w-96 rounded-md bg-white/5" />
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Card */}
          <div className="glass-card rounded-xl p-6">
            <div className="mb-6 h-7 w-40 rounded bg-white/10" />

            <div className="space-y-6">
              <div>
                <div className="mb-2 h-4 w-24 rounded bg-white/10" />
                <div className="h-11 rounded-lg bg-white/5" />
              </div>

              <div>
                <div className="mb-2 h-4 w-20 rounded bg-white/10" />
                <div className="h-11 rounded-lg bg-white/5" />
              </div>

              <div>
                <div className="mb-2 h-4 w-24 rounded bg-white/10" />
                <div className="h-11 rounded-lg bg-white/5" />
              </div>
            </div>
          </div>

          {/* Resume Card */}
          <div className="glass-card rounded-xl p-6">
            <div className="mb-6 h-7 w-44 rounded bg-white/10" />

            <div className="rounded-xl border border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-5 w-56 rounded bg-white/10" />
                  <div className="h-4 w-28 rounded bg-white/5" />
                </div>

                <div className="h-10 w-24 rounded-lg bg-white/10" />
              </div>
            </div>

            <div className="mt-6 h-11 w-full rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}