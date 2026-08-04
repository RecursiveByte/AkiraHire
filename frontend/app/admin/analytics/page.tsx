"use client";

import UserDistributionChart from "@/components/admin/analytics/UserDistributionChart";
import UserGrowthChart from "@/components/admin/analytics/UserGrowthChart";

import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";

export default function AnalyticsPage() {
  const {
    distribution,
    growth,
    loading,
  } = useAdminAnalytics();


  

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline-lg text-white">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-on-surface-variant">
          Analyze platform growth and user insights.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <UserDistributionChart
          distribution={distribution}
          isLoading={loading}
        />

        <UserGrowthChart
          growth={growth}
          isLoading={loading}
        />
      </div>
    </div>
  );
}