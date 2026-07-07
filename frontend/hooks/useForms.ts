import { useEffect, useState } from "react";
import { Form } from "@/types/form.types";
import { formService } from "@/services/form.service";

interface UseFormsResult {
  forms: Form[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useForms(): UseFormsResult {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadForms() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await formService.getRecruiterForms();
        if (isMounted) setForms(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Failed to load forms.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadForms();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex]);

  const refetch = () => setRefetchIndex((i) => i + 1);

  return { forms, isLoading, error, refetch };
}