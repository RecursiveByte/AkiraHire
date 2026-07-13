"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { CandidateProfile, CandidateResume } from "@/types/candidate/candidate.types";
import { CandidateProfileService } from "@/services/candidate/candidate.service";

interface UseEditProfileModalArgs {
  profile: CandidateProfile;
  resume: CandidateResume;
  onProfileUpdated: (profile: CandidateProfile) => void;
  onResumeUpdated: (resume: CandidateResume) => void;
}

export function useEditProfileModal({
  profile,
  resume,
  onProfileUpdated,
  onResumeUpdated,
}: UseEditProfileModalArgs) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function openModal() {
    setFullName(profile.fullName);
    setPhone(profile.phone);
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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setSelectedResumeFile(file);
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      const { profile: updatedProfile, resume: updatedResume } =
        await CandidateProfileService.updateProfile({
          fullName,
          phone,
          resumeFile: selectedResumeFile ?? undefined,
        });

      onProfileUpdated(updatedProfile);
      onResumeUpdated(updatedResume);

      toast.success("Profile updated successfully.");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
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
    selectedResumeFileName: selectedResumeFile?.name ?? resume.fileName,
    fileInputRef,
    triggerFileSelect,
    handleFileChange,
    isSaving,
    handleSave,
  };
}
