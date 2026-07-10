import { useCallback, useEffect, useState } from "react";

import { CandidateProfileService } from "@/services/candidate.service";

import { JobApplicationForm } from "@/types/candidate/job.types";

export function useJobs() {
    const [jobs, setJobs] = useState<JobApplicationForm[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await CandidateProfileService.getJobs();

            setJobs(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load jobs.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return {
        jobs,
        isLoading,
        error,
        refetch: fetchJobs,
    };
}