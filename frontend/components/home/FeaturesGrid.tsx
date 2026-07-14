import FeatureCard from "@/components/home/FeatureCard";
import { ASSETS } from "@/constants/assets";

const FEATURES = [
  {
    icon: "dashboard",
    title: "Unified Hiring Workspace",
    description:
      "Coordinate multiple AI agents to create jobs, generate application forms, publish hiring posts, and manage recruitment from one unified workspace.",
  },
  {
    image: ASSETS.AKIRA_LOGO,
    title: "Akira AI Assistant",
    description:
      "Let Akira AI handle job descriptions, Google Forms, LinkedIn content, and recruitment tasks so you can focus on hiring the right talent.",
  },
  {
    icon: "trending_up",
    title: "Recruit Smarter",
    description:
      "Leverage AI-powered workflows to streamline hiring, reduce manual effort, and connect with the right candidates faster.",
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
