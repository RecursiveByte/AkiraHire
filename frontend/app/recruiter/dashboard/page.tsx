import { DashboardFeaturesGrid } from "@/components/recruiter/dashboard/DashboardFeaturesGrid";

export default function RecruiterDashboardPage() {
  return (
    <div className="px-5 md:px-16 py-8 max-w-[1440px] mx-auto">
      <section className="mb-8">
        <h2 className="text-[40px] font-bold text-white tracking-tight mb-2">
          Recruiter Dashboard
        </h2>
        <p className="text-white/50 text-[20px] max-w-2xl leading-relaxed">
          Welcome back! Manage every part of your hiring workflow from one unified AI workspace.
        </p>
      </section>

      <DashboardFeaturesGrid />
    </div>
  );
}