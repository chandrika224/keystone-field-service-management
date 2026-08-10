import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import type { ReportSummary } from "@/data/manager/reports";

interface ManagerWorkOrderStatusChartProps {
  summary: ReportSummary;
}

export default function ManagerWorkOrderStatusChart({
  summary,
}: ManagerWorkOrderStatusChartProps) {
  const data = [
    {
      name: "Completed",
      value: summary.completedWorkOrders,
    },
    {
      name: "Pending",
      value: summary.pendingWorkOrders,
    },
    {
      name: "Cancelled",
      value: summary.cancelledWorkOrders,
    },
  ];

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Work Order Status
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Overall distribution of work order statuses.
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        {total === 0 ? (
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
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
              >
                <Cell fill="#16a34a" />
                <Cell fill="#eab308" />
                <Cell fill="#dc2626" />
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-3 border-t pt-4">
        {data.map((item) => {
          const percentage =
            total === 0
              ? 0
              : Math.round(
                  (item.value / total) * 100
                );

          return (
            <div
              key={item.name}
              className="text-center"
            >
              <p className="text-xs text-muted-foreground">
                {item.name}
              </p>

              <p className="mt-1 text-lg font-bold">
                {percentage}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}