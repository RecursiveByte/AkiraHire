import { FormStatus } from "@/types/recruiter/form/form.types";

const ACTION_CONFIG: Record<
  FormStatus,
  { label: string; icon: string; classes: string }
> = {
  OPEN: {
    label: "Close",
    icon: "lock",
    classes: "border border-amber-400/30 text-amber-400 hover:bg-white/5",
  },

  DRAFT: {
    label: "Publish",
    icon: "ios_share",
    classes: "border border-white/15 text-primary hover:bg-white/5",
  },

  CLOSED: {
    label: "Closed",
    icon: "visibility_off",
    classes: "border border-white/10 text-on-surface-variant/60",
  },
};

interface FormActionButtonProps {
  status: FormStatus;
  onPublish?: () => void;
  onClose?: () => void;
}

export default function FormActionButton({
  status,
  onPublish,
  onClose,
}: FormActionButtonProps) {
  const config = ACTION_CONFIG[status];

  const isPublish = status === "DRAFT";
  const isClose = status === "OPEN";


  return (
    <button
      onClick={(e) => {
        e.stopPropagation();

        if (isPublish) {
          onPublish?.();
        } else if (isClose) {
          onClose?.();
        }
      }}
      disabled={!isPublish && !isClose}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${config.classes} ${
        !isPublish && !isClose ? "cursor-default" : ""
      }`}
    >
      <span className="material-symbols-outlined text-[16px]">
        {config.icon}
      </span>
      {config.label}
    </button>
  );
}