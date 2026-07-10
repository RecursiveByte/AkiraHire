"use client";

import ReactMarkdown from "react-markdown";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { JobApplicationForm } from "@/types/candidate/job.types";

interface JobDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobApplicationForm | null;
}

export default function JobDetailsModal({
  open,
  onOpenChange,
  job,
}: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px] sm:max-w-6xl p-0">
        <ScrollArea className="max-h-[85vh]">
          <div className="space-y-8 p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl">{job.jobRole}</DialogTitle>

              <DialogDescription>{job.title}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-3">
              <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                Job ID: {job.jobId}
              </Badge>

              <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                Expires: {job.expiresAt.toLocaleDateString()}
              </Badge>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Job Description</h2>

              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{job.jobDescription}</ReactMarkdown>
              </article>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
