
import { useState } from "react";
import { ApplicationService } from "@/services/candidate/application.service";
import { CreateApplicationRequest } from "@/types/candidate/application.types";
import { toast } from "sonner";

export const useCreateApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (payload: CreateApplicationRequest) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await ApplicationService.createApplication(payload);
      toast.success("Your application has been submitted successfully.");
      return response;
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to submit application.";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitApplication, isSubmitting, error };
};