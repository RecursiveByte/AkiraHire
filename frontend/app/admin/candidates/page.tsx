"use client";

import CandidatesTable from "@/components/admin/CandidatesTable";
import { useAdminCandidates } from "@/hooks/admin/useAdminCandidates";

export default function CandidatesPage() {
  const { candidates, loading, deleteCandidate} = useAdminCandidates();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Candidates</h1>

        <p className="mt-2 text-sm text-white/60">
          View and manage all registered candidates on the platform.
        </p>
      </div>

      <CandidatesTable
        candidates={candidates}
        isLoading={loading}
        onDeleteCandidate={deleteCandidate}
      />
    </div>
  );
}
