import EmptyStateIcon from "@/components/candidate/profile/CandidateProfileEmptyState/EmptyStateIcon";
import EmptyStateActions from "@/components/candidate/profile/CandidateProfileEmptyState/EmptyStateActions";
import FeatureCards from "@/components/candidate/profile/CandidateProfileEmptyState/FeatureCards";

interface CandidateProfileEmptyStateProps {
  onCreateProfile?: () => void;
}

export default function CandidateProfileEmptyState({
  onCreateProfile,
}: CandidateProfileEmptyStateProps) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <EmptyStateIcon />

        <h1 className="mt-8 text-4xl font-bold text-white">
          You're not registered as a candidate
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-zinc-400">
          Complete your profile to start applying for jobs, upload your resume,
          and track your applications.
        </p>

        <EmptyStateActions onCreateProfile={onCreateProfile} />

        <FeatureCards />
      </div>
    </div>
  );
}