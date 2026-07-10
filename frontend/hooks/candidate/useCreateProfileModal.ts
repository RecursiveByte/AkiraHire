"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CandidateProfile,CandidateResume } from "@/types/candidate/candidate.types";

import { CandidateProfileService } from "@/services/candidate.service";

interface UseCreateProfileModalArgs {
    onProfileCreated?: (data: { profile: CandidateProfile; resume: CandidateResume }) => void;}

export function useCreateProfileModal(
  { onProfileCreated }: UseCreateProfileModalArgs = {}
) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedResumeFile, setSelectedResumeFile] =
    useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function openModal() {
    setFullName("");
    setPhone("");
    setSelectedResumeFile(null);
    setIsOpen(true);
  }

  function closeModal() {
    if (isSaving) return;
    setIsOpen(false);
  }

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setSelectedResumeFile(file);
  }

  async function handleCreate() {
    if (!selectedResumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    setIsSaving(true);

    try {
        const created = await CandidateProfileService.createProfile({
        fullName,
        phone,
        resumeFile: selectedResumeFile,
      });
      console.log("created ",created)
      toast.success("Candidate profile created successfully.");

      setIsOpen(false);

      onProfileCreated?.(created);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        if (Array.isArray(detail) && detail.length > 0) {
          toast.error(detail[0].msg);
        } else if (typeof detail === "string") {
          toast.error(detail);
        } else {
          toast.error("Failed to create profile.");
        }
      } else {
        toast.error("Failed to create profile.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return {
    isOpen,
    openModal,
    closeModal,

    fullName,
    setFullName,

    phone,
    setPhone,

    selectedResumeFileName: selectedResumeFile?.name ?? null,

    fileInputRef,

    triggerFileSelect,
    handleFileChange,

    isSaving,

    handleCreate,
  };
}