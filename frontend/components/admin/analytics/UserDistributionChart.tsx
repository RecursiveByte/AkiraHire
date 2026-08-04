"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { UserDistribution } from "@/types/admin/admin.types";

interface UserDistributionChartProps {
  distribution: UserDistribution | null;
  isLoading?: boolean;
}

const COLORS = ["#2563EB", "#EC4899"];

export default function UserDistributionChart({
  distribution,
  isLoading = false,
}: UserDistributionChartProps) {
  const data = [
    {
      name: "Candidates",
      value: distribution?.candidates ?? 0,
    },
    {
      name: "Recruiters",
      value: distribution?.recruiters ?? 0,
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">User Distribution</h2>

        <p className="mt-1 text-sm text-on-surface-variant">
          Distribution of registered users.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[340px] items-center justify-center">
          <div className="h-56 w-56 animate-pulse rounded-full bg-white/10" />
        </div>
      ) : (
        <div className="h-[340px] rounded-2xl border bg-white   p-4 shadow-xl">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                label={({ name, percent = 0 }) =>
                  `${name} ${Math.round(percent * 100)}%`
                }
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#F8FAFC",
                }}
              />

              <Legend
                verticalAlign="bottom"
                wrapperStyle={{
                  color: "#E2E8F0",
                  fontSize: "14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
