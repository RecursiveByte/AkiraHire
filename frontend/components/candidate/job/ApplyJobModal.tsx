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
import TextField from "./fields/TextField";

import { JobApplicationForm } from "@/types/candidate/job.types";
import { useAuthStore } from "@/store/authStore";

interface ApplyJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobApplicationForm | null;
}

export default function ApplyJobModal({
  open,
  onOpenChange,
  job,
}: ApplyJobModalProps) {
  const { control, handleSubmit } = useForm();

  const user = useAuthStore((state) => state.user);

  if (!job) return null;

  const onSubmit = (data: any) => {
    const payload = {
      form_id: job.formId,
      links: [],
      answers: job.formSchema.additionalQuestions.map((question) => ({
        id: question.id,
        answer: data[question.id],
      })),
    };
  
    console.log("React Hook Form Data");
    console.log(data);
  
    console.log("Backend Payload");
    console.log(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-5xl overflow-y-auto">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField
                control={control}
                name="fullName"
                label="Full Name"
                required
              />

              <div className="space-y-2">
                <Label>Email</Label>

                <Input value={user?.email ?? ""} readOnly disabled />
              </div>

              <TextField
                control={control}
                name="phone"
                label="Phone Number"
                required
              />

              <div className="space-y-2">
                <Label htmlFor="resume">
                  Resume
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input id="resume" type="file" accept=".pdf,.doc,.doc,.docx" />
              </div>
            </div>
          </section>


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
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
