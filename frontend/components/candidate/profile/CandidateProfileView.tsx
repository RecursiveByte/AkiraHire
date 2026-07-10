"use client";

import { useState } from "react";
import { CandidateProfile, CandidateResume } from "@/types/candidate/candidate.types";
import { useEditProfileModal } from "@/hooks/candidate/useEditProfileModal";
import ProfileHeader from "./ProfileHeader";
import PersonalInformationCard from "./PersonalInformationCard";
import DocumentsCard from "./DocumentsCard";
import CandidateProfileFormModal from "@/components/candidate/profile/CandidateProfileFormModal";

interface CandidateProfileViewProps {
  initialProfile: CandidateProfile;
  initialResume: CandidateResume;
}

export default function CandidateProfileView({
  initialProfile,
  initialResume,
}: CandidateProfileViewProps) {
  const [profile, setProfile] = useState<CandidateProfile>(initialProfile);
  const [resume, setResume] = useState<CandidateResume>(initialResume);

  const editModal = useEditProfileModal({
    profile,
    resume,
    onProfileUpdated: setProfile,
    onResumeUpdated: setResume,
  });

  return (
    <div className="mx-auto max-w-4xl  space-y-6">
      <ProfileHeader profile={profile} onEditClick={editModal.openModal} />

      <div className="grid grid-cols-12 gap-6">
        <PersonalInformationCard profile={profile} />
        <DocumentsCard resume={resume} />
      </div>
      <CandidateProfileFormModal
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
        title="Edit Profile"
        description="Update your personal information and resume details."
        submitButtonText="Save Changes"
        fullName={editModal.fullName}
        onFullNameChange={editModal.setFullName}
        phone={editModal.phone}
        onPhoneChange={editModal.setPhone}
        isSubmitting={editModal.isSaving}
        onSubmit={editModal.handleSave}
        currentResumeFileName={resume.fileName}
        selectedResumeFileName={editModal.selectedResumeFileName}
        fileInputRef={editModal.fileInputRef}
        onReplaceResumeClick={editModal.triggerFileSelect}
        onResumeFileChange={editModal.handleFileChange}
      />
    </div>
  );
}
