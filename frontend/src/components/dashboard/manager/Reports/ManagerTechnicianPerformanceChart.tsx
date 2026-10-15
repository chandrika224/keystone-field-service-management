
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerTechnicianPerformanceChartProps {
  workOrders: DispatcherWorkOrder[];
}

export default function ManagerTechnicianPerformanceChart({
  workOrders,
}: ManagerTechnicianPerformanceChartProps) {
  const technicians = Object.values(
    workOrders.reduce<
      Record<
        string,
        {
          id: string;
          name: string;
          assigned: number;
          completed: number;
        }
      >
    >((result, order) => {
      if (!order.technicianId) return result;

      const id = String(order.technicianId);

      if (!result[id]) {
        result[id] = {
          id,
          name: order.technicianName || `Technician ${id}`,
          assigned: 0,
          completed: 0,
        };
      }

      result[id].assigned++;

      if (
        order.status === "COMPLETED" ||
        order.status === "CLOSED"
      ) {
        result[id].completed++;
      }

      return result;
    }, {})
  );

  const chartData = technicians
    .map((technician) => ({
      name: technician.name,
      completionRate:
        technician.assigned === 0
          ? 0
          : Math.round(
              (technician.completed / technician.assigned) * 100
            ),
    }))
    .sort((a, b) => b.completionRate - a.completionRate);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Technician Performance
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Technician completion rate based on assigned
          and completed work orders.
        </p>
      </div>

      <div className="h-[360px]">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No technician data available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
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
                fill="#2563eb"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
