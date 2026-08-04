"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { AdminService } from "@/services/admin/admin.service";

import {
  UserDistribution,
  UserGrowthItem,
} from "@/types/admin/admin.types";

type AnalyticsStatus =
  | "loading"
  | "success"
  | "error";

export function useAdminAnalytics() {
  const [distribution, setDistribution] =
    useState<UserDistribution | null>(null);

  const [growth, setGrowth] =
    useState<UserGrowthItem[]>([]);

  const [status, setStatus] =
    useState<AnalyticsStatus>("loading");

  async function fetchAnalytics() {
    try {
      const [
        distributionData,
        growthData,
      ] = await Promise.all([
        AdminService.getUserDistribution(),
        AdminService.getUserGrowth(),
      ]);

      setDistribution(distributionData);
      setGrowth(growthData);

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
    fetchAnalytics();
  }, []);

  return {
    distribution,
    growth,
    status,

    loading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}