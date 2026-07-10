// "use client";

// import { useRef, useState } from "react";
// import { toast } from "sonner";
// import { CandidateResume } from "@/types/candidate.types";
// import { ResumeService } from "@/services/candidate.service";

// interface UseResumeUploadArgs {
//   onSuccess: (resume: CandidateResume) => void;
// }

// export function useResumeUpload({ onSuccess }: UseResumeUploadArgs) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   function triggerFileSelect() {
//     fileInputRef.current?.click();
//   }

//   async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     event.target.value = "";

//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       toast.error("Only PDF files are allowed.");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const updatedResume = await ResumeService.uploadResume(file);
//       onSuccess(updatedResume);
//       toast.success("Resume updated successfully.");
//     } catch {
//       toast.error("Failed to upload resume. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   }

//   return { fileInputRef, isUploading, triggerFileSelect, handleFileChange };
// }