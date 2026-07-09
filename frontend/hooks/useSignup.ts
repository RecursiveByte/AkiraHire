"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { SignupFormValues } from "@/lib/validators/auth.validator";

export function useSignup() {
  const router = useRouter();

  const { setAccessToken, setUser } = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function signup(payload: SignupFormValues) {
    setIsSubmitting(true);

    try {
      const { accessToken, user } = await AuthService.signup(payload);

      setAccessToken(accessToken);

      setUser(user);

      toast.success("Account created successfully!");

      router.push(
        user.role === "recruiter" ? "/recruiter/dashboard" : "/"
      );
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail ?? "Signup failed.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    signup,
    isSubmitting,
  };
}
