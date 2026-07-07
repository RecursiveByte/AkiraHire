"use client";

import { useForms } from "@/hooks/useForms";
import { useFormModal } from "@/hooks/useFormModal";
import FormDetailModal from "@/components/recruiter/form-detail/FormDetailModal";
import FormsTable from "@/components/recruiter/form/FormsTable";

export default function FormsPage() {
  const { forms, isLoading, error, refetch } = useForms();
  const { selectedForm, openForm, closeForm } = useFormModal(forms);

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-6">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Forms</h2>
        <p className="text-on-surface-variant">Manage application forms tied to your jobs.</p>
      </div>

      {error && (
        <div className="glass-panel rounded-xl p-6 flex items-center justify-between text-sm">
          <span className="text-error">{error}</span>
          <button onClick={refetch} className="text-primary underline">
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant">
          Loading forms...
        </div>
      ) : (
        !error && (
          <FormsTable
            forms={forms}
            onSelectForm={openForm}
            onDeleteForm={(id) => console.log("Delete form", id)}
            onPublishForm={(id) => console.log("Publish form", id)}
          />
        )
      )}

      {selectedForm && (
        <FormDetailModal
          form={selectedForm}
          onClose={closeForm}
          onDelete={(id) => console.log("Delete form", id)}
          onPublish={(id) => console.log("Publish form", id)}
          onCloseForm={(id) => console.log("Close form", id)}
        />
      )}
    </div>
  );
}