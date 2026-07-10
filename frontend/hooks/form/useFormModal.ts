import { useState } from "react";
import { Form } from "@/types/form.types";

export function useFormModal(forms: Form[]) {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);

  const selectedForm = forms.find((form) => form.formId === selectedFormId) ?? null;

  const openForm = (formId: number) => setSelectedFormId(formId);
  const closeForm = () => setSelectedFormId(null);

  return { selectedForm, openForm, closeForm };
}