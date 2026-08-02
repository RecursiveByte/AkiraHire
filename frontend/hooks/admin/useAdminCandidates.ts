"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { AdminService } from "@/services/admin/admin.service";
import { CandidateListItem } from "@/types/admin/admin.types";

type CandidatesStatus = "loading" | "success" | "error";

export function useAdminCandidates() {
  const [candidates, setCandidates] = useState<CandidateListItem[]>([]);
  const [status, setStatus] = useState<CandidatesStatus>("loading");

  async function fetchCandidates() {
    try {
      const data = await AdminService.getAllCandidates();

      setCandidates(data);
      setStatus("success");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }

      setStatus("error");
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  async function deleteCandidate(candidateId: number) {
    try {
      await AdminService.deleteCandidate(candidateId);

      toast.success("Candidate deleted successfully.");

      await fetchCandidates();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete candidate. Please try again.");
    }
  }
  return {
    candidates,
    status,
    deleteCandidate,
    loading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
