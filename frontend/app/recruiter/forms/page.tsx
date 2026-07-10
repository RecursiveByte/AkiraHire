"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useForms } from "@/hooks/form/useForms";
import { useFormModal } from "@/hooks/form/useFormModal";
import FormDetailModal from "@/components/recruiter/form-detail/FormDetailModal";
import FormsTable from "@/components/recruiter/form/FormsTable";

export default function FormsPage() {
  const { forms, isLoading, error, refetch } = useForms();
  const { selectedForm, openForm, closeForm } = useFormModal(forms);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        action: {
          label: "Retry",
          onClick: refetch,
        },
      });
    }
  }, [error, refetch]);

  const showSkeleton = isLoading || (!!error && forms.length === 0);

  return (
    <div className="max-w-[1200px] mx-auto p-12 space-y-6">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Forms</h2>
        <p className="text-on-surface-variant">Manage application forms tied to your jobs.</p>
      </div>

      <FormsTable
        forms={forms}
        isLoading={showSkeleton}
        onSelectForm={openForm}
        onDeleteForm={(id) => console.log("Delete form", id)}
        onPublishForm={(id) => console.log("Publish form", id)}
      />

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