"use client";

import { useIntegrations } from "@/hooks/recruiter/integration/useIntegrations";
import { IntegrationCard } from "./IntegrationCard";
import { Loader2 } from "lucide-react";

export const INTEGRATION_ICONS: Record<string, string> = {
  "Google Forms": "/google-forms.svg",
  "LinkedIn Posts": "/linkedin.svg",
};

export function IntegrationList() {
  const {
    integrations,
    loading,
    error,
    refetch,
    connectGoogleForms,
    disconnectIntegration,
    disconnectingId,
    connectLinkedIn,
  } = useIntegrations();

  const connectHandlers: Record<string, () => void> = {
    "Google Forms": connectGoogleForms,
    "LinkedIn Posts": connectLinkedIn,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-white/50">
        <Loader2 className="animate-spin" size={18} />
        <span className="text-sm">Loading integrations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] py-24 text-center">
        <p className="text-sm text-white/60">{error}</p>
        <button
          onClick={refetch}
          className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration, idx) => (
        <IntegrationCard
          key={idx}
          integration={integration}
          iconSrc={INTEGRATION_ICONS[integration.name]}
          disconnecting={disconnectingId === integration.id}
          onConnect={connectHandlers[integration.name]}
          onDisconnect={() => {
            disconnectIntegration(integration.id!);
          }}
        />
      ))}
    </div>
  );
}
