import { Form } from "@/types/form.types";
import FormStatusIndicator from "./FormStatusIndicator";
import FormActionButton from "./FormActionButton";

interface FormRowProps {
  form: Form;
  onClick: (formId: number) => void;
  onDelete: (formId: number) => void;
  onPublish: (formId: number) => void;
}

export default function FormRow({ form, onClick, onDelete, onPublish }: FormRowProps) {
  return (
    <div
      onClick={() => onClick(form.formId)}
      className="flex flex-col  lg:grid lg:grid-cols-[110px_110px_1fr_110px_190px] lg:gap-4 lg:items-center px-6 py-5 hover:bg-white/[0.03] cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Form ID
        </span>
        <span className="text-sm text-on-surface-variant">#{form.formId}</span>
      </div>

      <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Job ID
        </span>
        <span className="text-sm text-on-surface-variant">#{form.jobId}</span>
      </div>

      <div className="flex items-center justify-between lg:block lg:min-w-[220px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Form Title
        </span>
        <span className="text-primary font-medium truncate block" title={form.title}>
          {form.title}
        </span>
      </div>

      <div className="flex items-center justify-between lg:block lg:min-w-[110px]">
        <span className="text-[11px] uppercase tracking-widest text-on-surface-variant/50 lg:hidden">
          Status
        </span>
        <FormStatusIndicator status={form.status} />
      </div>

      <div className="flex items-center gap-3 justify-between lg:justify-end lg:min-w-[190px] pt-2 lg:pt-0 border-t border-white/5 lg:border-0">
        <FormActionButton status={form.status} onPublish={() => onPublish(form.formId)} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(form.formId);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant/60 hover:text-error hover:bg-white/5 transition-colors"
          aria-label={`Delete ${form.title}`}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
}