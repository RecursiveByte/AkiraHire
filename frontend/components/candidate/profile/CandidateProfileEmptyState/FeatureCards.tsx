import FeatureCard from "@/components/candidate/profile/CandidateProfileEmptyState/FeatureCard";

const FEATURES = [
  {
    icon: "bolt",
    title: "Fast Setup",
    description: "Complete your profile in just a few minutes.",
  },
  {
    icon: "description",
    title: "Resume Ready",
    description: "Upload your resume once and apply instantly.",
  },
  {
    icon: "analytics",
    title: "Application Tracking",
    description: "Track every application from your dashboard.",
  },
];

export default function FeatureCards() {
  return (
    <div className="mt-16 grid gap-5 md:grid-cols-3">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}