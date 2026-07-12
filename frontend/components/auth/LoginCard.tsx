"use client";

import { SocialAuthButtons } from "./SocialAuthButtons";
import { LoginForm } from "./LoginForm";
import { AuthFooter } from "./AuthFooter";

export function LoginCard() {
  return (
    <div className="glass-card flex flex-col gap-8 mt-10 rounded-xl p-8 md:p-10">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-white/60">Sign in to continue to your account.</p>
      </div>

      <SocialAuthButtons />

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-white/5" />
        <span className="mx-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
          OR
        </span>
        <div className="flex-grow border-t border-white/5" />
      </div>

      <LoginForm />

      <AuthFooter />
    </div>
  );
}