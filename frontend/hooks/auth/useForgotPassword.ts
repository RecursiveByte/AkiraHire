
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AuthService } from "@/services/auth.service";

export function useForgotPassword() {
  const [isSending, setIsSending] = useState(false);

  const sendOtp = async (email: string) => {
    if (isSending) return false;

    setIsSending(true);

    try {
      await AuthService.forgotPassword(email);
      toast.success("OTP sent to your email.");
      return true;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail ?? "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendOtp,
    isSending,
  };
}