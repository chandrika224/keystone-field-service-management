import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TechnicianPerformance } from "@/data/manager/reports";

import {
  getTechnicianCompletionRate,
} from "@/data/manager/reports";

interface ManagerTechnicianPerformanceChartProps {
  data: TechnicianPerformance[];
}

export default function ManagerTechnicianPerformanceChart({
  data,
}: ManagerTechnicianPerformanceChartProps) {
  const chartData = data.map((technician) => ({
    name: technician.name,
    completionRate:
      getTechnicianCompletionRate(technician),
  }));

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Technician Performance
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Technician completion rate based on assigned
          and completed work orders.
        </p>
      </div>

      {/* Chart */}

      <div className="h-[360px]">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No technician data available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                unit="%"
              />

              <YAxis
                type="category"
                dataKey="name"
                width={110}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  "Completion Rate",
                ]}
              />

              <Bar
                dataKey="completionRate"
                name="Completion Rate"
                radius={[0, 6, 6, 0]}
              >
                {chartData.map((technician) => (
                  <Cell
                    key={technician.name}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}