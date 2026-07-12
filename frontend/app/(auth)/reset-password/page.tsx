"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validators/auth.validator";
import { AuthService } from "@/services/auth.service";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

const OTP_DURATION_SECONDS = 60;
const STORAGE_KEY_PREFIX = "otp_expiry:";

function getExpiryKey(email: string) {
  return `${STORAGE_KEY_PREFIX}${email}`;
}

function readSecondsLeft(email: string): number {
  if (typeof window === "undefined" || !email) {
    return OTP_DURATION_SECONDS;
  }

  const stored = localStorage.getItem(getExpiryKey(email));

  if (!stored) {
    const expiresAt = Date.now() + OTP_DURATION_SECONDS * 1000;
    localStorage.setItem(getExpiryKey(email), String(expiresAt));
    return OTP_DURATION_SECONDS;
  }

  const expiresAt = Number(stored);

  return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
}

function restartTimer(email: string): number {
  const expiresAt = Date.now() + OTP_DURATION_SECONDS * 1000;
  localStorage.setItem(getExpiryKey(email), String(expiresAt));

  return OTP_DURATION_SECONDS;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OTP_DURATION_SECONDS);
  const [isReady, setIsReady] = useState(false);

  const { sendOtp, isSending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!email) return;

    setSecondsLeft(readSecondsLeft(email));
    setIsReady(true);
  }, [email]);

  useEffect(() => {
    if (!isReady || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(readSecondsLeft(email));
    }, 1000);

    return () => clearInterval(interval);
  }, [isReady, secondsLeft, email]);

  const isExpired = isReady && secondsLeft <= 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  async function handleResend() {
    if (!isExpired || isSending || !email) return;

    const success = await sendOtp(email);

    if (success) {
      setSecondsLeft(restartTimer(email));
    }
  }

  async function onSubmit(data: ResetPasswordFormValues) {
    if (isExpired) return;

    try {
      await AuthService.resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      localStorage.removeItem(getExpiryKey(email));

      router.push("/login");
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 selection:bg-white/30 selection:text-white">
      <div className="w-full max-w-[380px]">
        <div className="rounded-3xl border border-white/[0.08] bg-[#111111] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <span className="msi text-[20px] text-white">key</span>
            </div>

            <div
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium tabular-nums ${
                isExpired
                  ? "border-red-500/20 bg-red-500/10 text-red-400"
                  : "border-white/10 bg-white/5 text-white/60"
              }`}
            >
              {isExpired ? "OTP expired" : timerLabel}
            </div>
          </div>

          <div className="mb-7">
            <h1 className="mb-1.5 text-xl font-semibold tracking-tight text-white">
              Reset password
            </h1>

            <p className="text-[13px] leading-relaxed text-white/60">
              Enter the code sent to{" "}
              <span className="text-white">{email || "your email"}</span> and
              choose a new password.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* OTP */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  OTP Code
                </label>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!isExpired || isSending}
                  className="text-xs font-medium text-white/60 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-white/20 disabled:hover:text-white/20"
                >
                  {isSending ? "Sending..." : "Resend code"}
                </button>
              </div>

              <div
                className={`input-precision relative overflow-hidden rounded-lg ${
                  errors.otp ? "border-red-500/60" : ""
                }`}
              >
                <input
                  {...register("otp")}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  className="w-full border-none bg-transparent px-4 py-3 text-center text-sm tracking-[0.4em] placeholder:tracking-normal placeholder:text-white/40 focus:ring-0"
                />
              </div>

              {errors.otp && (
                <p className="text-xs text-red-400">{errors.otp.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                New Password
              </label>

              <div
                className={`input-precision relative overflow-hidden rounded-lg ${
                  errors.newPassword ? "border-red-500/60" : ""
                }`}
              >
                <span className="msi absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-white/40">
                  lock
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="••••••••"
                  className="w-full border-none bg-transparent py-3 pl-10 pr-10 text-sm placeholder:text-white/40 focus:ring-0"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="msi absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[20px] text-white/40 hover:text-white"
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-xs text-red-400">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Confirm Password
              </label>

              <div
                className={`input-precision relative overflow-hidden rounded-lg ${
                  errors.confirmPassword ? "border-red-500/60" : ""
                }`}
              >
                <span className="msi absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-white/40">
                  lock
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className="w-full border-none bg-transparent py-3 pl-10 pr-4 text-sm placeholder:text-white/40 focus:ring-0"
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isExpired}
              className="btn-premium mt-2 w-full cursor-pointer rounded-lg py-3.5 text-sm font-bold tracking-tight shadow-lg disabled:opacity-60"
            >
              {isExpired
                ? "Code expired"
                : isSubmitting
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>

          <div className="mt-7 border-t border-white/5 pt-5 text-center">
            <Link
              href="/login"
              className="text-xs font-medium text-white/60 transition-colors hover:text-white"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}