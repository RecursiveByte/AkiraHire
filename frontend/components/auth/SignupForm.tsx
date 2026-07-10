"use client";

import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validators/auth.validator";
import { useSignup } from "@/hooks/auth/useSignup";
import { RoleToggle} from "./RoleToggle";

import type { AuthRole } from "@/types/auth.types";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState<AuthRole>("candidate");  

  const { signup, isSubmitting } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "candidate",
    },
  });

  function onSubmit(data: SignupFormValues) {
    console.log("hie")
    signup({
      ...data,
      role,
    });
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Name */}

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Full Name
        </label>

        <div
          className={`input-precision relative overflow-hidden rounded-lg ${
            errors.name ? "border-red-500/60" : ""
          }`}
        >
          <span className="msi absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-white/40">
            person
          </span>

          <input
            {...register("name")}
            placeholder="Rimuru"
            className="w-full border-none bg-transparent py-3 pl-10 pr-4 text-sm placeholder:text-white/40 focus:ring-0"
          />
        </div>

        {errors.name && (
          <p className="text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Email Address
        </label>

        <div
          className={`input-precision relative overflow-hidden rounded-lg ${
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

        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Password
        </label>

        <div
          className={`input-precision relative overflow-hidden rounded-lg ${
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
            className="msi absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[20px] text-white/40 hover:text-white"
          >
            {showPassword ? "visibility_off" : "visibility"}
          </button>
        </div>

        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <RoleToggle role={role} onChange={setRole} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-premium mt-2 w-full rounded-lg py-3.5 text-sm font-bold tracking-tight shadow-lg cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
