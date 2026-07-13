import { apiClient } from "@/lib/api/apiClient";
import { mapApiJobToJob } from "@/lib/mappers/job.mapper";
import { Job, ApiJob } from "@/types/recruiter/job/job.types";

class JobService {

  static async getRecruiterJobs(search?: string): Promise<Job[]> {
    const response = await apiClient.get<ApiJob[]>("/jobs/recruiter", {
      params: {
        search,
      },
    });

    return response.data.map(mapApiJobToJob);
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
