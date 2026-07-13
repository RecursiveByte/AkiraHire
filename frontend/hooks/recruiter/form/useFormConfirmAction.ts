import { useState } from "react";

import { Form } from "@/types/recruiter/form/form.types";
import { MODAL_CONFIG } from "@/constants/modal";

type ModalAction = "delete" | "publish" | "close" | null;

interface UseFormConfirmActionArgs {
  form: Form;
  onDelete: (formId: number) => Promise<void>;
  onPublish: (formId: number) => Promise<void>;
  onCloseForm: (formId: number) => Promise<void>;
}

export function useFormConfirmAction({
  form,
  onDelete,
  onPublish,
  onCloseForm,
}: UseFormConfirmActionArgs) {
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  const config = modalAction ? MODAL_CONFIG[modalAction] : null;

  const requestAction = (action: Exclude<ModalAction, null>) => {
    setModalAction(action);
  };

  const closeModal = () => {
    setModalAction(null);
  };

  const handleConfirm = async () => {
    switch (modalAction) {
      case "delete":
        await onDelete(form.formId);
        break;

      case "publish":
        await onPublish(form.formId);
        break;

      case "close":
        await onCloseForm(form.formId);
        break;

      default:
        break;
    }

    setModalAction(null);
  };

  return {
    modalAction,
    config,
    requestAction,
    closeModal,
    handleConfirm,
  };
}