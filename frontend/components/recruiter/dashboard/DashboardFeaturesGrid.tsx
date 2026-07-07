import { DashboardFeatureCard } from "./DashboardFeatureCard";

const FEATURES = [
  {
    icon: "bolt",
    title: "Akira AI Assistant",
    description:
      "Your intelligent recruitment assistant capable of evaluating resumes, generating job descriptions, creating hiring forms, matching candidates, answering recruitment questions, and automating hiring tasks.",
    ctaLabel: "Open Assistant",
    href: "/recruiter/assistant",
  },
  {
    icon: "work",
    title: "Jobs",
    description:
      "Create, manage, edit and monitor all job postings from one place. Keep track of active roles and internal requisitions.",
    ctaLabel: "View Jobs",
    href: "/recruiter/jobs",
  },
  {
    icon: "group",
    title: "Applications",
    description:
      "Track every applicant, review resumes, monitor hiring stages and manage recruitment workflows with precision tracking.",
    ctaLabel: "View Applications",
    ctaIcon: "group",
    href: "/recruiter/applications",
  },
  {
    icon: "assignment",
    title: "Forms",
    description:
      "Create AI-powered hiring forms, application forms, screening questionnaires and interview forms tailored for each role.",
    ctaLabel: "Open Forms",
    href: "/recruiter/forms",
  },
];

export function DashboardFeaturesGrid() {
  return (
    <div className="glass-card rounded-3xl p-8 border border-white/10 bg-white/1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {FEATURES.map((feature) => (
          <DashboardFeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}