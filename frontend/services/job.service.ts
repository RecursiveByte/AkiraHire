import { apiClient } from "@/lib/api/apiClient";
import { mapApiJobToJob } from "@/lib/mappers/job.mapper";
import { Job, ApiJob } from "@/types/job.types";

class JobService {
  static async getRecruiterJobs(): Promise<Job[]> {
    const { data } = await apiClient.get<ApiJob[]>("/jobs/recruiter/");
    return data.map(mapApiJobToJob);
  }

  static async deleteJob(jobId: number) {
    const response = await apiClient.delete(`/jobs/${jobId}`);
    return response.data;
  }

  static async publishJob(jobId: number) {
    const response = await apiClient.patch(`/jobs/${jobId}/publish`);
    return response.data;
  }

  static async closeJob(jobId: number) {
    const response = await apiClient.patch(`/jobs/${jobId}/close`);
    return response.data;
  }
}

export default JobService;
