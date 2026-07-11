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
      toast.error("User is not authenticated.");
      throw new Error("User is not authenticated.");
    }

    return user;
  }

  static async getApplications(): Promise<Application[]> {
    const user = this.getCurrentUser();

    const url =
      user.role === "recruiter"
        ? "/applications/recruiter/view"
        : "/applications/candidate/view";

    const { data } = await apiClient.get<ApiApplication[]>(url);

    return data.map(mapApiApplicationToApplication);
  }

  static async deleteApplication(applicationId: number): Promise<void> {
    await apiClient.delete(`/applications/${applicationId}`);
  }
}