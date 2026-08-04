"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { UserGrowthItem } from "@/types/admin/admin.types";

interface UserGrowthChartProps {
  growth: UserGrowthItem[];
  isLoading?: boolean;
}

export default function UserGrowthChart({
  growth,
  isLoading = false,
}: UserGrowthChartProps) {
  const data = growth.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
  }));

  const maxValue = Math.max(
    ...growth.flatMap((item) => [
      item.candidates,
      item.recruiters,
    ]),
    0
  );

  const ticks = Array.from(
    { length: maxValue + 3 },
    (_, i) => i
  );

  const CHART_WIDTH = Math.max(
    data.length * 70,
    900
  );

  return (
    <div className="glass-panel rounded-2xl p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          User Growth
        </h2>

        <p className="mt-1 text-sm text-on-surface-variant">
          New users registered over the last 30 days.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[320px] items-end gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-1 items-end"
            >
              <div
                className="w-full animate-pulse rounded-t bg-white/10"
                style={{
                  height: `${40 + (index % 5) * 30}px`,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            style={{
              width: CHART_WIDTH,
              height: 340,
            }}
            className="rounded-xl bg-white p-4"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d1d5db"
                />

                <XAxis
                  dataKey="date"
                  interval={0}
                  tickMargin={8}
                  tick={{
                    fill: "#374151",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  domain={[0, maxValue + 2]}
                  ticks={ticks}
                  allowDecimals={false}
                  tick={{
                    fill: "#374151",
                    fontSize: 12,
                  }}
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="candidates"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="recruiters"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}