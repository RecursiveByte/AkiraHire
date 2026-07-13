import { IntegrationList } from "@/components/recruiter/integrations/IntegrationList";

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Ecosystem
            </span>
            <div className="h-px w-8 bg-white/20" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Connected Apps
          </h1>
          <p className="mt-2 max-w-lg text-white/50">
            Supercharge your recruiting workflow by syncing data between AkiraHire and your tools.
          </p>
        </div>

        <IntegrationList />
      </div>
    </div>
  );
}