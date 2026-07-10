import { CandidateProfile } from "@/types/candidate/candidate.types";
import InfoRow from "./InfoRow";

interface PersonalInformationCardProps {
  profile: CandidateProfile;
}

export default function PersonalInformationCard({ profile }: PersonalInformationCardProps) {
  return (
    <div className="col-span-12 space-y-6 lg:col-span-7">
      <div className="rounded-2xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl">
        <h3 className="mb-8 border-b border-white/5 pb-4 font-headline-md text-headline-md text-primary">
          Personal Information
        </h3>
        <div className="space-y-6">
          <InfoRow icon="person" label="Name" value={profile.fullName} />
          <InfoRow icon="mail" label="Email Address" value={profile.email} />
          <InfoRow icon="call" label="Phone Number" value={profile.phone} />
        </div>
      </div>
    </div>
  );
}