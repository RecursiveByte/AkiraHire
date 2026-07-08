import { apiClient } from "@/lib/api/apiClient";
import { ApiApplication } from "@/types/api/application.types";
import { mapApiApplicationToApplication } from "@/lib/mappers/application.mapper";
import { Application } from "@/types/application.types";

export const applicationService = {
  async getRecruiterApplications(): Promise<Application[]> {
    const { data } = await apiClient.get<ApiApplication[]>("/applications/recruiter/3/view");
    console.log(data)
    
    return data.map(mapApiApplicationToApplication);
  },
};