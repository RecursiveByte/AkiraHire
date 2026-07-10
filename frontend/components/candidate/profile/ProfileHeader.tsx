import { CandidateProfile } from "@/types/candidate/candidate.types";

interface ProfileHeaderProps {
  profile: CandidateProfile;
  onEditClick: () => void;
}

export default function ProfileHeader({ profile, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="flex items-end justify-between border-b border-white/5 pb-8">
      <div className="space-y-1">
        <h2 className="font-headline-lg text-headline-lg text-primary">{profile.fullName}</h2>
      </div>

      <button
        type="button"
        onClick={onEditClick}
        className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-bold text-black transition-all hover:bg-opacity-90 active:scale-95"
      >
        <span className="material-symbols-outlined text-xl">edit</span>
        Edit Profile
      </button>
    </div>
  );
}