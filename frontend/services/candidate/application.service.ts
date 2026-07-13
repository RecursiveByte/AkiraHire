import { apiClient } from "@/lib/api/apiClient";
import { CreateApplicationRequest, CreateApplicationResponse } from "@/types/candidate/application/application.types";

export class ApplicationService {
  static async createApplication(payload: CreateApplicationRequest): Promise<CreateApplicationResponse> {
    const { data } = await apiClient.post<CreateApplicationResponse>("/applications", payload);
    return data;
  }

  static async getAppliedFormIds(): Promise<number[]> {
    const { data } = await apiClient.get<number[]>("/applications/applied-form-ids");
    return data;
  }
}