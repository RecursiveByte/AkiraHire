import { apiClient } from "@/lib/api/apiClient";
import {
  UpdateCandidateProfileInput,
  CandidateProfile,
  CandidateResume,
  CreateCandidateProfileInput,
} from "@/types/candidate/candidate.types";
import {} from "@/types/application.types";
import {
  mapApiCandidateProfile,
  mapApiCandidateResume,
} from "@/lib/mappers/candidateMapper";
import { ApiCandidateProfile } from "@/types/candidate/candidate.api";

import { JobApplicationFormApi } from "@/types/candidate/job.api";
import { mapApiJobApplicationForm } from "@/lib/mappers/candidateMapper";
import { JobApplicationForm } from "@/types/candidate/job.types";

import { Application } from "@/types/application.types";
import { ApiApplication } from "@/types/api/application.types";
import { mapApiApplicationToApplication } from "@/lib/mappers/application.mapper";

export class CandidateProfileService {
  static async getProfile() {
    const response = await apiClient.get<ApiCandidateProfile>(
      "/candidate/profile"
    );

    return {
      profile: mapApiCandidateProfile(response.data),
      resume: mapApiCandidateResume(response.data),
    };
  }

  static async getJobs(search?: string): Promise<JobApplicationForm[]> {
    const response = await apiClient.get<JobApplicationFormApi[]>(
      "/forms/with-job",
      {
        params: {
          search,
        },
      }
    );

    console.log(response.data);

    return response.data.map(mapApiJobApplicationForm);
  }

  static async createProfile(input: CreateCandidateProfileInput): Promise<{
    profile: CandidateProfile;
    resume: CandidateResume;
  }> {
    const formData = new FormData();

    formData.append(
      "candidate_data",
      JSON.stringify({ full_name: input.fullName, phone: input.phone })
    );
    formData.append("resume", input.resumeFile);

    const response = await apiClient.post<ApiCandidateProfile>(
      "/candidate/profile",
      formData
    );

    return {
      profile: mapApiCandidateProfile(response.data),
      resume: mapApiCandidateResume(response.data),
    };
  }

  static async updateProfile(input: UpdateCandidateProfileInput): Promise<{
    profile: CandidateProfile;
    resume: CandidateResume;
  }> {
    const formData = new FormData();

    if (input.fullName) formData.append("full_name", input.fullName);
    if (input.phone) formData.append("phone", input.phone);
    if (input.resumeFile) formData.append("resume", input.resumeFile);

    const response = await apiClient.patch<ApiCandidateProfile>(
      "/candidate/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      profile: mapApiCandidateProfile(response.data),
      resume: mapApiCandidateResume(response.data),
    };
  }

  static async getCandidateApplications(
    search?: string
  ): Promise<Application[]> {
    const { data } = await apiClient.get<ApiApplication[]>(
      "/applications/candidate/",
      {
        params: search ? { search } : undefined,
      }
    );

    return data.map(mapApiApplicationToApplication);
  }
}
