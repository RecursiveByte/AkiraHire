import { useState } from "react";
import { toast } from "sonner";

import { ApplicationService } from "@/services/recruiter/application.service";

interface UseApplicationDeleteProps {
  selectedApplicationId: number | null;
  closeApplication: () => void;
  refetchApplications: () => Promise<void>;
}

interface UseApplicationDeleteResult {
  applicationToDeleteId: number |null;
  isDeleting: boolean;
  setApplicationToDeleteId: (
    applicationId: number | null
  ) => void;
  handleDeleteConfirm: () => Promise<void>;
}

export function useApplicationDelete({
  selectedApplicationId,
  closeApplication,
  refetchApplications,
}: UseApplicationDeleteProps): UseApplicationDeleteResult {
  const [
    applicationToDeleteId,
    setApplicationToDeleteId,
  ] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (applicationToDeleteId === null) return;

    try {
      setIsDeleting(true);

      await ApplicationService.deleteApplication(
        applicationToDeleteId
      );

      await refetchApplications();

      if (
        selectedApplicationId === applicationToDeleteId
      ) {
        closeApplication();
      }

      toast.success("Application deleted successfully.");

      setApplicationToDeleteId(null);
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
    applicationToDeleteId,
    isDeleting,
    setApplicationToDeleteId,
    handleDeleteConfirm,
  };
}