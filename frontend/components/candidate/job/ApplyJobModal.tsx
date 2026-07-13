"use client";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import QuestionRenderer from "./QuestionRenderer";

import { JobApplicationForm } from "@/types/candidate/job/job.types";
import { useAuthStore } from "@/store/authStore";
import { useCreateApplication } from "@/hooks/candidate/applications/useCreateApplication";

interface ApplyJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobApplicationForm | null;
  onSuccess?: () => void;
}

export default function ApplyJobModal({
  open,
  onOpenChange,
  job,
  onSuccess,
}: ApplyJobModalProps) {
  const { register, control, handleSubmit } = useForm();

  const user = useAuthStore((state) => state.user);
  const { submitApplication, isSubmitting } = useCreateApplication();

  if (!job) return null;

  const onSubmit = async (data: any) => {
    const payload = {
      form_id: job.formId,
      links: job.formSchema.links.map((link) => ({
        id: link.id,
        url: data.links?.[link.id] || "",
      })),
      answers: job.formSchema.additionalQuestions.map((question) => ({
        id: question.id,
        answer: data[question.id],
      })),
    };

    const result = await submitApplication(payload);
    if (result) {
      onOpenChange(false);

      onSuccess?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:min-w-3xl   overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.jobRole}</DialogTitle>

          <DialogDescription>
            Please complete the application form below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
          <section className="space-y-6 rounded-xl border p-6">
            <div>
              <h2 className="text-lg font-semibold">Candidate Information</h2>

              <p className="text-sm text-muted-foreground">
                Verify your information before submitting your application.
              </p>
            </div>
          </section>

          {job.formSchema.links.length > 0 && (
            <section className="space-y-6 rounded-xl border p-6">
              <div>
                <h2 className="text-lg font-semibold">Links</h2>
                <p className="text-sm text-muted-foreground">
                  Please provide the following links.
                </p>
              </div>

              <div className="space-y-4">
                {job.formSchema.links.map((link) => (
                  <div key={link.id} className="space-y-2">
                    <Label htmlFor={link.id}>
                      {link.label}
                      {link.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                    <Input
                      id={link.id}
                      type="url"
                      placeholder={`https://...`}
                      {...register(`links.${link.id}`, {
                        required: link.required
                          ? `${link.label} is required`
                          : false,
                      })}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {job.formSchema.additionalQuestions.length > 0 && (
            <section className="space-y-6 rounded-xl border p-6">
              <div>
                <h2 className="text-lg font-semibold">Additional Questions</h2>

                <p className="text-sm text-muted-foreground">
                  Answer the following questions required for this job.
                </p>
              </div>

              <div className="space-y-6">
                {job.formSchema.additionalQuestions.map((question) => (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    control={control}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
