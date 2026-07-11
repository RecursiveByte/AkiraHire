"use client";

import CandidateProfileView from "@/components/candidate/profile/CandidateProfileView";
import { useCandidateProfile } from "@/hooks/candidate/useCandidateProfile";
import CandidateProfileSkeleton from "@/components/candidate/profile/CandidateProfileSkeleton";
import CandidateProfileEmptyState from "@/components/candidate/profile/CandidateProfileEmptyState/CandidateProfileEmptyState";
import CandidateProfileFormModal from "@/components/candidate/profile/CandidateProfileFormModal";
import { useCreateProfileModal } from "@/hooks/candidate/useCreateProfileModal";

export default function CandidateProfilePage() {
  const { profile, resume, loading, isNotFound,setProfileCreated } = useCandidateProfile();

  const createProfileModal = useCreateProfileModal( {onProfileCreated: setProfileCreated});

  if (loading) {
    return <CandidateProfileSkeleton />;
  }

  if (isNotFound) {
    return (
      <div >
        <CandidateProfileEmptyState
          onCreateProfile={createProfileModal.openModal}
        />
        <CandidateProfileFormModal
          isOpen={createProfileModal.isOpen}
          onClose={createProfileModal.closeModal}
          title="Create Candidate Profile"
          description="Complete your profile to start applying for jobs."
          submitButtonText="Create Profile"
          fullName={createProfileModal.fullName}
          onFullNameChange={createProfileModal.setFullName}
          phone={createProfileModal.phone}
          onPhoneChange={createProfileModal.setPhone}
          isSubmitting={createProfileModal.isSaving}
          onSubmit={createProfileModal.handleCreate}
          currentResumeFileName={undefined}
          selectedResumeFileName={createProfileModal.selectedResumeFileName}
          fileInputRef={createProfileModal.fileInputRef}
          onReplaceResumeClick={createProfileModal.triggerFileSelect}
          onResumeFileChange={createProfileModal.handleFileChange}
        />
      </div>
    );
  }

  return (
    <CandidateProfileView initialProfile={profile!} initialResume={resume!} />
  );
}
