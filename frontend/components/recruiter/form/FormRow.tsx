import { Form } from "@/types/recruiter/form/form.types";
import FormStatusIndicator from "./FormStatusIndicator";
import FormActionButton from "./FormActionButton";
import { ConfirmActionModal } from "@/components/common/ConfirmActionModal";
import { useFormConfirmAction } from "@/hooks/recruiter/form/useFormConfirmAction";

interface FormRowProps {
  form: Form;
  onClick: (formId: number) => void;
  onDelete: (formId: number) => Promise<void>;
  onPublish: (formId: number) => Promise<void>;
  onCloseForm: (formId: number) => Promise<void>;
}

export default function FormRow({
  form,
  onClick,
  onDelete,
  onPublish,
  onCloseForm,
}: FormRowProps) {
  const { config, modalAction, requestAction, closeModal, handleConfirm } =
    useFormConfirmAction({
      form,
      onDelete,
      onPublish,
      onCloseForm,
    });

    console.log(" ths is ",form)

  return (
    <>
      <div
        onClick={() => onClick(form.formId)}
        className="flex flex-col lg:grid lg:grid-cols-[110px_110px_1fr_110px_190px] lg:gap-4 lg:items-center px-6 py-5 hover:bg-white/[0.03] cursor-pointer transition-colors"
      >
        {/* Form ID */}
        <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
          <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
            Form ID
          </span>
          <span className="text-sm text-on-surface-variant">
            #{form.formId}
          </span>
        </div>

        {/* Job ID */}
        <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
          <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
            Job ID
          </span>
          <span className="text-sm text-on-surface-variant">
            #{form.jobId}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between lg:block lg:min-w-[220px]">
          <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
            Form Title
          </span>
          <span
            className="text-primary font-medium truncate block"
            title={form.title}
          >
            {form.title}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
          <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
            Status
          </span>
          <FormStatusIndicator status={form.status} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-between lg:justify-end lg:min-w-[190px] pt-2 lg:pt-0 border-t border-white/5 lg:border-0">
          <FormActionButton
            status={form.status}
            onPublish={ () => requestAction("publish")}
            onClose={() => requestAction("close")}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              requestAction("delete");
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant/60 hover:text-error hover:bg-white/5 transition-colors"
            aria-label={`Delete ${form.title}`}
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
          </button>
        </div>
      </div>

      {config && (
        <ConfirmActionModal
          isOpen={modalAction !== null}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title={config.title(form.title)}
          description={config.description}
          confirmLabel={config.confirmLabel}
          action={config.action}
        />
      )}
    </>
  );
}