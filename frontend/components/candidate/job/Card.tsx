"use client";

import { Button } from "@/components/ui/button";
import { JobApplicationForm } from "@/types/candidate/job.types";
import { CheckCircle2 } from "lucide-react";

interface CardProps {
  job: JobApplicationForm;
  onViewDetails?: (job: JobApplicationForm) => void;
  onApply?: (job: JobApplicationForm) => void;
  applied?: boolean;
}

export default function Card({
  job,
  onViewDetails,
  onApply,
  applied,
}: CardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-background p-5 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {job.jobRole.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{job.jobRole}</h3>

          <p className="text-sm text-muted-foreground">Job ID: {job.jobId}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => onViewDetails?.(job)}>
          View Details
        </Button>

        <Button
          className={`w-[140px] justify-center ${
            applied
              ? "bg-emerald-500 text-black hover:bg-emerald-500 disabled:opacity-100 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          disabled={applied}
          onClick={() => !applied && onApply?.(job)}
        >
          {applied ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Applied
            </>
          ) : (
            "Apply Now"
          )}
        </Button>
      </div>
    </div>
  );
}
