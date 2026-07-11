import { useState } from "react";
import { Job } from "@/types/job.types";
import { MODAL_CONFIG } from "@/constants/modal";

type ModalAction = "delete" | "publish" | "close" | null;

interface UseJobConfirmActionArgs {
  job: Job;
  onDelete: (jobId: number) => Promise<void>;
  onPublish: (jobId: number) => Promise<void>;
  onCloseJob: (jobId: number) => Promise<void> | void;
}

export function useJobConfirmAction({
  job,
  onDelete,
  onPublish,
  onCloseJob,
}: UseJobConfirmActionArgs) {
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  const config = modalAction !== null ? MODAL_CONFIG[modalAction] : null;

  const requestAction = (action: Exclude<ModalAction, null>) =>
    setModalAction(action);

  const closeModal = () => setModalAction(null);

  const handleConfirm = async () => {
    switch (modalAction) {
      case "delete":
        await onDelete(job.jobId);
        break;
      case "publish":
        await onPublish(job.jobId);
        break;
      case "close":
        await onCloseJob(job.jobId);
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