import { LoginCard } from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col  text-white">
      <div className="bg-pattern fixed inset-0 z-0" />
      <div className="fixed left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <main className="relative z-10 flex flex-grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[440px] flex-col gap-6">
          <LoginCard />
        </div>
      </main>

    </div>
  );
}