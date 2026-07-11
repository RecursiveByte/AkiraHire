import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Application } from "@/types/application.types";
import { ApplicationService } from "@/services/application.service";

interface UseApplicationsResult {
  applications: Application[];
  isLoading: boolean;
  isDeleting: boolean;
  error: string | null;
  refetch: () => void;
  deleteApplication: (applicationId: number) => Promise<void>;
}

export function useApplications(): UseApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadApplications() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await ApplicationService.getApplications();

        if (isMounted) {
          setApplications(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load applications."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex]);

  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  const deleteApplication = async (applicationId: number) => {
    try {
      setIsDeleting(true);

      await ApplicationService.deleteApplication(applicationId);

      toast.success("Application deleted successfully.");

      refetch();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete application."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    applications,
    isLoading,
    isDeleting,
    error,
    refetch,
    deleteApplication,
  };
}