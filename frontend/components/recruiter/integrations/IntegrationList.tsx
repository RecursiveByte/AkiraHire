"use client";

import { useIntegrations } from "@/hooks/recruiter/integration/useIntegrations";
import { IntegrationCard } from "./IntegrationCard";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Integration } from "@/types/recruiter/integration/common/integration.types";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";
import { ASSETS } from "@/constants/assets";

export const INTEGRATION_ICONS: Record<string, string> = {
  "Google Forms": ASSETS.GOOGLE_FORMS_ICON,
  "LinkedIn Posts": ASSETS.LINKEDIN_ICON,
};

export const INTEGRATION_DESCRIPTIONS: Record<string, string> = {
  "Google Forms":
    "Create application forms automatically for your jobs, collect candidate responses, and manage submissions directly from Akira Hire.",

  "LinkedIn Posts":
    "Publish hiring posts directly to LinkedIn, manage drafts, and streamline your recruitment outreach from one place.",
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

  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

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
        description={INTEGRATION_DESCRIPTIONS[integration.name]}
          integration={integration}
          iconSrc={INTEGRATION_ICONS[integration.name]}
          disconnecting={disconnectingId === integration.id}
          onConnect={connectHandlers[integration.name]}
          onDisconnect={() => setSelectedIntegration(integration)}
        />
      ))}
      <ConfirmActionModal
        isOpen={selectedIntegration !== null}
        onClose={() => setSelectedIntegration(null)}
        onConfirm={async () => {
          if (!selectedIntegration?.id) return;

          await disconnectIntegration(selectedIntegration.id);
          setSelectedIntegration(null);
        }}
        isLoading={selectedIntegration?.id === disconnectingId}
        action="delete"
        title={`Disconnect ${selectedIntegration?.name}?`}
        description={`Are you sure you want to disconnect ${selectedIntegration?.name}? You can reconnect it at any time.`}
        confirmLabel="Disconnect"
        cancelLabel="Cancel"
      />
    </div>
  );
}
