import  FeatureCard  from "@/components/home/FeatureCard";

const FEATURES = [
  {
    icon: "radar",
    title: "AI Sourcing",
    description: "Scan GitHub and LinkedIn to find the top 0.1% for your stack.",
  },
  {
    icon: "neurology",
    title: "Smart Screening",
    description: "Automated technical interviews that adapt to proficiency in real-time.",
  },
  {
    icon: "groups",
    title: "Unified Pipeline",
    description: "One workspace for feedback, scheduling, and engineering team sync.",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}