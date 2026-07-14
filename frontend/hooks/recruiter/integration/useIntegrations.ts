"use client";

import { useEffect, useState } from "react";

import { IntegrationService } from "@/services/recruiter/lntegration/integration.service";
import { Integration } from "@/types/recruiter/integration/common/integration.types";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [disconnectingId, setDisconnectingId] = useState<number | null>(null);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await IntegrationService.getIntegrations();

      setIntegrations(data);
    } catch (err) {
      setError("Failed to load integrations.");
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleForms = () =>
    (window.location.href = `${API_BASE_URL}/google-forms/auth/google/connect`);

  const disconnectIntegration = async (accountId: number) => {
    try {
      setDisconnectingId(accountId);
      await IntegrationService.disconnectIntegration(accountId);
      await fetchIntegrations();
      toast.success("Integration disconnected successfully.");
    } catch (err:any) {
      toast.error("Failed to disconnect integration.");
      setError("Failed to disconnect integration.");
    } finally {
      setDisconnectingId(null);
    }
  };

  const connectLinkedIn = () =>
    (window.location.href = `${API_BASE_URL}/linkedin/auth/connect`);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  return {
    integrations,
    loading,
    error,
    refetch: fetchIntegrations,
    connectGoogleForms,
    disconnectingId,
    disconnectIntegration,
    connectLinkedIn,
  };
}
