"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyholeOpen, Mail, ArrowRight, ArrowLeft } from "lucide-react";

import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const { sendOtp, isSending } = useForgotPassword();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const success = await sendOtp(email);

    if (success) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 selection:bg-white/30 selection:text-white">
      <div className="w-full max-w-[380px]">
        <div className="rounded-3xl border border-white/[0.08] bg-[#111111] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <LockKeyholeOpen className="h-5 w-5 text-white" strokeWidth={1.5} />
          </div>

          <div className="mb-7">
            <h1 className="mb-1.5 text-xl font-semibold tracking-tight text-white">
              Forgot password?
            </h1>
            <p className="text-[13px] leading-relaxed text-[#A1A1AA]">
              Enter your email and we&apos;ll send you an OTP to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="ml-0.5 text-xs font-medium text-[#A1A1AA]"
              >
                Email address
              </label>

              <div className="group relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA] transition-colors group-focus-within:text-white"
                  strokeWidth={1.75}
                />

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3.5 text-sm text-white placeholder:text-white/20 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.08] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-neutral-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSending ? "Sending..." : "Send code"}</span>

              {!isSending && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-7 border-t border-white/5 pt-5 text-center">
            <Link
              href="/login"
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1AA] transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}