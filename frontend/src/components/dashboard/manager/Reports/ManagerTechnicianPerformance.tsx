
import {
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerTechnicianPerformanceProps {
  workOrders: DispatcherWorkOrder[];
}

export default function ManagerTechnicianPerformance({
  workOrders = [],
}: ManagerTechnicianPerformanceProps) {
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
  ).map((technician) => ({
    ...technician,
    pending: technician.assigned - technician.completed,
    completionRate:
      technician.assigned === 0
        ? 0
        : Math.round(
            (technician.completed / technician.assigned) * 100
          ),
  }));

  if (technicians.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="font-medium">No technician data available</p>
        <p className="mt-1 text-sm text-muted-foreground">
          There is no technician performance data for this reporting period.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Technician Performance
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Compare technician assignments and completion performance.
        </p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr className="text-left text-sm">
              <th className="px-5 py-4 font-medium">Technician</th>
              <th className="px-5 py-4 font-medium">Assigned</th>
              <th className="px-5 py-4 font-medium">Completed</th>
              <th className="px-5 py-4 font-medium">Pending</th>
              <th className="px-5 py-4 font-medium">Completion Rate</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {technicians.map((technician) => (
              <tr
                key={technician.id}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{technician.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {technician.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 font-medium">
                  {technician.assigned}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {technician.completed}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-yellow-600" />
                    {technician.pending}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: `${technician.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {technician.completionRate}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y md:hidden">
        {technicians.map((technician) => (
          <div key={technician.id} className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">{technician.name}</p>
                <p className="text-xs text-muted-foreground">
                  {technician.id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Assigned</p>
                <p className="mt-1 text-lg font-bold">
                  {technician.assigned}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="mt-1 text-lg font-bold text-green-600">
                  {technician.completed}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="mt-1 text-lg font-bold text-yellow-600">
                  {technician.pending}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Completion Rate
                </span>
                <span className="text-sm font-semibold">
                  {technician.completionRate}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${technician.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
