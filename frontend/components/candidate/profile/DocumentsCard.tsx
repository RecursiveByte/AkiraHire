"use client";

import { CandidateResume } from "@/types/candidate/candidate.types";
import ResumeDocumentCard from "./ResumeDocumentCard";

interface DocumentsCardProps {
  resume: CandidateResume;
}

export default function DocumentsCard({ resume }: DocumentsCardProps) {
  return (
    <div className="col-span-12 space-y-6 lg:col-span-5">
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="font-headline-md text-headline-md text-primary">Documents</h3>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-8">
          <ResumeDocumentCard resume={resume} />
        </div>
      </div>
    </div>
  );
}