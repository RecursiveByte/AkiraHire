import { apiClient } from "@/lib/api/apiClient";
import { CandidateListItemDto } from "@/types/admin/admin.api";
import { mapCandidates } from "@/lib/mappers/adminCandidate.mapper";
import { CandidateListItem } from "@/types/admin/admin.types";

export class AdminService {
  static async getAllCandidates(): Promise< CandidateListItem[]> {
    const { data } = await apiClient.get< CandidateListItemDto []>(
      "/candidate/profiles"
    );
    return mapCandidates(data);
  }

  static async deleteCandidate(candidateId: number): Promise<void> {
    await apiClient.delete(`/candidate/profile/${candidateId}`);
  }
}