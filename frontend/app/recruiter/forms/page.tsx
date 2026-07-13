"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import SearchBar from "@/components/common/SearchBar";

import { useForms } from "@/hooks/recruiter/form/useForms";
import { useFormModal } from "@/hooks/recruiter/form/useFormModal";

import FormsTable from "@/components/recruiter/form/FormsTable";
import FormDetailModal from "@/components/recruiter/form-detail/FormDetailModal";

export default function FormsPage() {
  const [search, setSearch] = useState("");

  const {
    forms,
    isLoading,
    error,
    refetch,
    publishForm,
    closeForm: closeRecruiterForm,
    deleteForm,
  } = useForms(search);

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

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by job ID or Form title..."
      />

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