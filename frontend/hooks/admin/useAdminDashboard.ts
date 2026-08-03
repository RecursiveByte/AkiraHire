"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { AdminService } from "@/services/admin/admin.service";

import { Dashboard } from "@/types/admin/admin.types";

type DashboardStatus = "loading" | "success" | "error";

export function useAdminDashboard() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  const [status, setStatus] = useState<DashboardStatus>("loading");

  async function fetchDashboard() {
    try {
      const data = await AdminService.getDashboard();

      setDashboard(data);

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
    fetchDashboard();
  }, []);

  return {
    dashboard,
    status,
    loading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
