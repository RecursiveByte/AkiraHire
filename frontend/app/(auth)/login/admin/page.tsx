import { AdminLoginForm } from "@/components/auth/AdminLogin";

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] px-4">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)]">        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_24px_-8px_rgba(0,0,0,0.5)]">
            <span className="msi text-[26px] text-white/90">
              admin_panel_settings
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Admin Sign In
            </h1>

            <p className="text-sm text-white/40">
              Restricted access. Authorized administrators only.
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent p-[1px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/90 p-8 backdrop-blur-xl">
            <AdminLoginForm />
          </div>
        </div>

      </div>
    </main>
  );
}