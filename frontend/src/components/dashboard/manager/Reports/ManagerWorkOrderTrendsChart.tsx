
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

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerWorkOrderTrendsChartProps {
  data: DispatcherWorkOrder[];
}

const COMPLETED_STATUSES = ["COMPLETED", "CLOSED"];

const PENDING_STATUSES = [
  "NEW",
  "ASSIGNED",
  "ACCEPTED",
  "IN_PROGRESS",
  "ON_HOLD",
];

export default function ManagerWorkOrderTrendsChart({
  data,
}: ManagerWorkOrderTrendsChartProps) {
  const monthlyData = (() => {
    const now = new Date();
    const months: {
      period: string;
      completed: number;
      pending: number;
      cancelled: number;
    }[] = [];

    for (let offset = 5; offset >= 0; offset--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - offset,
        1
      );

      months.push({
        period: date.toLocaleString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        completed: 0,
        pending: 0,
        cancelled: 0,
      });
    }

    const monthIndexes = new Map<string, number>();

    months.forEach((month, index) => {
      const date = new Date();
      const offset = 5 - index;
      date.setDate(1);
      date.setMonth(date.getMonth() - offset);

      monthIndexes.set(
        `${date.getFullYear()}-${date.getMonth()}`,
        index
      );
    });

    data.forEach((order) => {
      const dateValue = COMPLETED_STATUSES.includes(order.status)
        ? order.completedAt ?? order.completedDate ?? order.createdAt
        : order.createdAt;

      if (!dateValue) return;

      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return;

      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const index = monthIndexes.get(key);

      if (index === undefined) return;

      if (COMPLETED_STATUSES.includes(order.status)) {
        months[index].completed++;
      } else if (order.status === "CANCELLED") {
        months[index].cancelled++;
      } else if (PENDING_STATUSES.includes(order.status)) {
        months[index].pending++;
      }
    });

    return months;
  })();

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Work Order Trends
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Monthly comparison of completed, pending and cancelled work orders.
        </p>
      </div>

      <div className="h-[350px] w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No work order data available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                name="Pending"
                stroke="#eab308"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="cancelled"
                name="Cancelled"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
