"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { AdminService } from "@/services/admin/admin.service";

import { RecruiterListItem } from "@/types/admin/admin.types";

type RecruitersStatus = "loading" | "success" | "error";

export function useAdminRecruiters() {
  const [recruiters, setRecruiters] = useState<RecruiterListItem[]>([]);
  const [status, setStatus] = useState<RecruitersStatus>("loading");

  async function fetchRecruiters() {
    try {
      const data = await AdminService.getAllRecruiters();

      setRecruiters(data);
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
    fetchRecruiters();
  }, []);

  async function deleteRecruiter(recruiterId: number) {
    try {
      await AdminService.deleteRecruiter(recruiterId);

      await fetchRecruiters();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }

      throw error;
    }
  }

  return {
    recruiters,
    status,

    loading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",

    deleteRecruiter,
  };
}