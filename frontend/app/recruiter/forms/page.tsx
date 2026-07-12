"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { useForms } from "@/hooks/recruiter/form/useForms";
import { useFormModal } from "@/hooks/recruiter/form/useFormModal";

import FormsTable from "@/components/recruiter/form/FormsTable";
import FormDetailModal from "@/components/recruiter/form-detail/FormDetailModal";

export default function FormsPage() {
  const {
    forms,
    isLoading,
    error,
    refetch,
    publishForm,
    closeForm: closeRecruiterForm,
    deleteForm,
  } = useForms();

  const {
    selectedForm,
    openForm,
    closeForm,
  } = useFormModal(forms);

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
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
          Forms
        </h2>

        <p className="text-on-surface-variant">
          Manage application forms tied to your jobs.
        </p>
      </div>

      <FormsTable
        forms={forms}
        isLoading={showSkeleton}
        onSelectForm={openForm}
        onDeleteForm={deleteForm}
        onPublishForm={publishForm}
        onCloseForm={closeRecruiterForm}
      />

      {selectedForm && (
        <FormDetailModal
          form={selectedForm}
          onClose={closeForm}
          onDelete={deleteForm}
          onPublish={publishForm}
          onCloseForm={closeRecruiterForm}
        />
      )}
    </div>
  );
}