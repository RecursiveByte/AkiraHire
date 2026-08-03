import { apiClient } from "@/lib/api/apiClient";
import { CandidateListItemDto } from "@/types/admin/admin.api";
import { mapCandidates } from "@/lib/mappers/adminCandidate.mapper";
import { CandidateListItem } from "@/types/admin/admin.types";
import { RecruiterListItem } from "@/types/admin/admin.types";
import { Dashboard } from "@/types/admin/admin.types";

export class AdminService {
  static async getAllCandidates(): Promise<CandidateListItem[]> {
    const { data } = await apiClient.get<CandidateListItemDto[]>(
      "/candidate/profiles"
    );
    return mapCandidates(data);
  }

  static async getAllRecruiters(): Promise<RecruiterListItem[]> {
    const { data } = await apiClient.get<RecruiterListItem[]>(
      "/recruiter/profiles"
    );

    return data;
  }

  static async getDashboard(): Promise<Dashboard> {
    const { data } = await apiClient.get<Dashboard>("/admin/dashboard");

    return data;
  }

  static async deleteCandidate(candidateId: number): Promise<void> {
    await apiClient.delete(`/candidate/profile/${candidateId}`);
  }

  static async deleteRecruiter(recruiterId: number): Promise<void> {
    await apiClient.delete(`/recruiter/profile/${recruiterId}`);
  }
}
