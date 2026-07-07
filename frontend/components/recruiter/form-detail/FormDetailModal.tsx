import { Form } from "@/types/form.types";
import FormStatusIndicator from "@/components/recruiter/form/FormStatusIndicator";
import FormActionButton from "@/components/recruiter/form/FormActionButton";
import FormSchemaPreview from "@/components/recruiter/form-detail/FormSchemaPreview";

interface FormDetailModalProps {
  form: Form;
  onClose: () => void;
  onDelete: (formId: number) => void;
  onPublish: (formId: number) => void;
  onCloseForm: (formId: number) => void;
}

export default function FormDetailModal({
  form,
  onClose,
  onDelete,
  onPublish,
  onCloseForm,
}: FormDetailModalProps) {
  const schema = form.formSchemaJson;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-black border border-white/10 shadow-2xl w-full max-w-lg max-h-[85vh] rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-white/10 flex justify-between items-start shrink-0">
          <div className="space-y-2">
            <p className="text-xs text-on-surface-variant/60 tracking-widest uppercase">
              Form #{form.formId} • Job #{form.jobId}
            </p>
            <h2 className="font-headline-lg text-headline-lg text-primary">{schema.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close form details"
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Status
            </p>
            <FormStatusIndicator status={form.status} />
          </div>

          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-2">
              Description
            </p>
            <p className="text-on-surface leading-relaxed text-sm">{schema.description}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-3">
              Form Preview
            </p>
            <div className="border border-white/10 rounded-xl p-5 bg-surface-container">
              <FormSchemaPreview schema={schema} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container p-4 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-1">
                Expires At
              </p>
              <p className="text-sm text-primary font-medium">{form.expiresAt}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase text-on-surface-variant/60 tracking-widest mb-1">
                Created At
              </p>
              <p className="text-sm text-primary font-medium">{form.createdAt}</p>
            </div>
          </div>
        </div>

        <div className="p-8 pt-6 border-t border-white/5 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onDelete(form.formId)}
            className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Delete Form
          </button>

          <div className="flex items-center gap-3">
            {form.status !== "CLOSED" && (
              <button
                onClick={() => onCloseForm(form.formId)}
                className="flex items-center gap-2 px-4 py-2.5 border border-white/15 rounded-lg text-sm text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                Close Form
              </button>
            )}
            <FormActionButton status={form.status} onPublish={() => onPublish(form.formId)} />
          </div>
        </div>
      </div>
    </div>
  );
}