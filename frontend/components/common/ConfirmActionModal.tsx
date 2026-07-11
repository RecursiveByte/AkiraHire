"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Trash2,
  Rocket,
  Lock,
  Info,
} from "lucide-react";

type ConfirmActionType =
  | "delete"
  | "publish"
  | "close"
  | "default";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  action?: ConfirmActionType;
}

const ACTION_CONFIG = {
  delete: {
    icon: Trash2,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    button:
      "bg-red-600 hover:bg-red-500 focus-visible:ring-red-500 text-white",
  },

  publish: {
    icon: Rocket,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    button:
      "!bg-emerald-600 hover:!bg-emerald-500 !text-white !shadow-none",
  },

  close: {
    icon: Lock,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    button:
      "!bg-white hover:!bg-gray-200 !text-black !shadow-none",
  },

  default: {
    icon: Info,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    button:
      "bg-blue-600 hover:bg-blue-500 focus-visible:ring-blue-500 text-white",
  },
};

export function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  action = "default",
}: ConfirmActionModalProps) {
  const config = ACTION_CONFIG[action];
  const Icon = config.icon;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose();
        }
      }}
    >
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="max-w-md border border-white/10 bg-[#0a0a0a] text-white shadow-2xl"
      >
        <AlertDialogHeader>
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${config.iconBg}`}
          >
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>

          <AlertDialogTitle className="text-xl font-semibold">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-2 text-sm leading-6 text-white/60">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-3">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {cancelLabel}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={async (e) => {
              e.stopPropagation();
              await onConfirm();
            }}
            className={`cursor-pointer ${config.button}`}
          >
            {isLoading ? "Please wait..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}