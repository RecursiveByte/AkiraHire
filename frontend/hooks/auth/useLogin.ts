"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

import { LoginFormValues } from "@/lib/validators/auth.validator";

export function useLogin() {
  const router = useRouter();

  const { setAccessToken, setUser } = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function login(payload: LoginFormValues) {
    setIsSubmitting(true);

    try {
      const { accessToken, user } = await AuthService.login(payload);

      setAccessToken(accessToken);
      setUser(user);

      toast.success("Welcome back!");

      const redirectMap: Record<string, string> = {
        recruiter: "/recruiter/dashboard",
        candidate: "/candidate/dashboard",
        admin: "/admin/dashboard",
      };

      router.push(redirectMap[user.role] ?? "/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail ?? "Login failed.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    login,
    isSubmitting,
  };
}