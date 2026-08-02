import { CandidateListItem } from "@/types/admin/admin.types";
import { CandidateListItemDto } from "@/types/admin/admin.api";  

  export function mapCandidate(
    dto: CandidateListItemDto
  ): CandidateListItem {
    return {
      id: dto.candidate_id,
      fullName: dto.full_name,
      email: dto.email,
      phone: dto.phone,
    };
  }
  
  export function mapCandidates(
    dtos: CandidateListItemDto[]
  ): CandidateListItem[] {
    return dtos.map(mapCandidate);
  }