import { toast } from "sonner";
import { apiClient } from "@/lib/api/apiClient";
import { useAuthStore } from "@/store/authStore";
import { ApiApplication } from "@/types/api/application.types";
import { mapApiApplicationToApplication } from "@/lib/mappers/application.mapper";
import { Application } from "@/types/application.types";

export class ApplicationService {
  private static getCurrentUser() {
    const user = useAuthStore.getState().user;

    if (!user) {
      toast.error("The Server might be down or session expired");
      throw new Error("Server down or session expired");
    }

    return user;
  }

  static async getRecruiterApplications(
    search?: string
  ): Promise<Application[]> {
    const { data } = await apiClient.get<ApiApplication[]>(
      "/applications/recruiter/view",
      {
        params: search ? { search } : {},
      }
    );
  
    return data.map(mapApiApplicationToApplication);
  }

  static async searchApplications(search: string): Promise<Application[]> {
    const { data } = await apiClient.get<ApiApplication[]>(
      "/applications/search",
      {
        params: {
          search,
        },
      }
    );

    return data.map(mapApiApplicationToApplication);
  }

  static async deleteApplication(applicationId: number): Promise<void> {
    await apiClient.delete(`/applications/${applicationId}`);
  }
}
