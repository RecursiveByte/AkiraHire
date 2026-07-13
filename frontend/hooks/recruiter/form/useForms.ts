import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Form } from "@/types/recruiter/form/form.types";
import { FormService } from "@/services/recruiter/form.service";
import { useDebounce } from "@/hooks/common/useDebounce";

interface UseFormsResult {
  forms: Form[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  publishForm: (formId: number) => Promise<void>;
  closeForm: (formId: number) => Promise<void>;
  deleteForm: (formId: number) => Promise<void>;
}

export function useForms(search: string = ""): UseFormsResult {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    let isMounted = true;

    async function loadForms() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await FormService.getRecruiterForms(
          debouncedSearch || undefined
        );

        if (isMounted) {
          setForms(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load forms."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadForms();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex, debouncedSearch]);

  const refetch = () => {
    setRefetchIndex((i) => i + 1);
  };

  const publishForm = async (formId: number) => {
    await FormService.publishForm(formId);
    toast.success("Form published successfully.");
    refetch();
  };

  const closeForm = async (formId: number) => {
    await FormService.closeForm(formId);
    toast.success("Form closed successfully.");
    refetch();
  };

  const deleteForm = async (formId: number) => {
    await FormService.deleteForm(formId);
    toast.success("Form deleted successfully.");
    refetch();
  };

  return {
    forms,
    isLoading,
    error,
    refetch,
    publishForm,
    closeForm,
    deleteForm,
  };
}