"use client";

import { useAdminRecruiters } from "@/hooks/admin/useAdminRecruiters";
import RecruitersTable from "@/components/admin/recruiter/RecruitersTable";

export default function RecruitersPage() {
  const {
    recruiters,
    loading,
    deleteRecruiter,
  } = useAdminRecruiters();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Recruiters
        </h1>

        <p className="mt-2 text-sm text-white/60">
          View and manage all recruiters registered on AkiraHire.
        </p>
      </div>

      <RecruitersTable
        recruiters={recruiters}
        isLoading={loading}
        onDeleteRecruiter={deleteRecruiter}
      />
    </div>
  );
}