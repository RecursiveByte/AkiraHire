
import { apiClient } from "@/lib/api/apiClient";
import { Integration } from "@/types/recruiter/integration/common/integration.types";

export class IntegrationService {
  static async getIntegrations(): Promise<Integration[]> {
    const response = await apiClient.get<Integration[]>(
      "/integrations"
    );

    return response.data;
  }

  static async disconnectIntegration(accountId: number): Promise<void> {
    await apiClient.delete(`/integrations/connected-accounts/${accountId}`);
  }
}