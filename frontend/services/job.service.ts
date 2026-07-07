import { apiClient } from "@/lib/api/client";
import { mapApiJobToJob } from "@/lib/mappers/job.mapper";
import { Job,ApiJob } from "@/types/job.types";


export const jobService = {
  async getRecruiterJobs(): Promise<Job[]> {
    const { data } = await apiClient.get<ApiJob[]>("/jobs/recruiter/");
    return data.map(mapApiJobToJob);
  },
};