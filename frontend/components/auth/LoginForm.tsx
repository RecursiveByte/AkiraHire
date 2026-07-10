"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/auth/useLogin";
import { loginSchema, type LoginFormValues } from "@/lib/validators/auth.validator";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isSubmitting } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(login)} noValidate>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Email Address
        </label>
        <div
          className={`input-precision group relative overflow-hidden rounded-lg ${
            errors.email ? "border-red-500/60" : ""
          }`}
        >
          <span className="msi absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-white/40">
            alternate_email
          </span>
          <input
            type="email"
            {...register("email")}
            placeholder="name@company.com"
            className="w-full border-none bg-transparent py-3 pl-10 pr-4 text-sm placeholder:text-white/40 focus:ring-0"
          />
        </div>
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Password
        </label>
        <div
          className={`input-precision group relative overflow-hidden rounded-lg ${
            errors.password ? "border-red-500/60" : ""
          }`}
        >
          <span className="msi absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-white/40">
            lock
          </span>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className="w-full border-none bg-transparent py-3 pl-10 pr-10 text-sm placeholder:text-white/40 focus:ring-0"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="msi absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-white/40 transition-colors hover:text-white cursor-pointer"
          >
            {showPassword ? "visibility_off" : "visibility"}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-premium mt-2 w-full rounded-lg py-3.5 text-sm font-bold tracking-tight shadow-lg cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}