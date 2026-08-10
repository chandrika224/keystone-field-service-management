import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { WorkOrderPerformance } from "@/data/manager/reports";

interface ManagerWorkOrderTrendsChartProps {
  data: WorkOrderPerformance[];
}

export default function ManagerWorkOrderTrendsChart({
  data,
}: ManagerWorkOrderTrendsChartProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Work Order Trends
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monthly comparison of completed, pending and
          cancelled work orders.
        </p>
      </div>

      {/* Chart */}

      <div className="h-[350px] w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No work order data available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="period"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="pending"
                name="Pending"
                stroke="#eab308"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="cancelled"
                name="Cancelled"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}