import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="relative bg-pattern flex min-h-screen flex-col items-center justify-center px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>

          <p className="mt-2 text-sm text-white/50">
            Join AkiraHire and start building your future
          </p>
        </div>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-white hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
