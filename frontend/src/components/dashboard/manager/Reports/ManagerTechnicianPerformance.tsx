import {
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import type { TechnicianPerformance } from "@/data/manager/reports";
import { getTechnicianCompletionRate } from "@/data/manager/reports";

interface ManagerTechnicianPerformanceProps {
  technicians: TechnicianPerformance[];
}

export default function ManagerTechnicianPerformance({
  technicians,
}: ManagerTechnicianPerformanceProps) {
  if (technicians.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="font-medium">
          No technician data available
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          There is no technician performance data for
          this reporting period.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      {/* Header */}

      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Technician Performance
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Compare technician assignments and completion
          performance.
        </p>
      </div>

      {/* Desktop Table */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr className="text-left text-sm">
              <th className="px-5 py-4 font-medium">
                Technician
              </th>

              <th className="px-5 py-4 font-medium">
                Assigned
              </th>

              <th className="px-5 py-4 font-medium">
                Completed
              </th>

              <th className="px-5 py-4 font-medium">
                Pending
              </th>

              <th className="px-5 py-4 font-medium">
                Completion Rate
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {technicians.map((technician) => {
              const completionRate =
                getTechnicianCompletionRate(
                  technician
                );

              const pending =
                technician.assigned -
                technician.completed;

              return (
                <tr
                  key={technician.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {/* Technician */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                        <UserRound className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {technician.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {technician.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Assigned */}

                  <td className="px-5 py-4">
                    <span className="font-medium">
                      {technician.assigned}
                    </span>
                  </td>

                  {/* Completed */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />

                      <span className="font-medium">
                        {technician.completed}
                      </span>
                    </div>
                  </td>

                  {/* Pending */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-yellow-600" />

                      <span className="font-medium">
                        {pending}
                      </span>
                    </div>
                  </td>

                  {/* Completion Rate */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-green-500 transition-all"
                          style={{
                            width: `${completionRate}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-semibold">
                        {completionRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="divide-y md:hidden">
        {technicians.map((technician) => {
          const completionRate =
            getTechnicianCompletionRate(
              technician
            );

          const pending =
            technician.assigned -
            technician.completed;

          return (
            <div
              key={technician.id}
              className="space-y-4 p-5"
            >
              {/* Technician */}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold">
                    {technician.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {technician.id}
                  </p>
                </div>
              </div>

              {/* Stats */}

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">
                    Assigned
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {technician.assigned}
                  </p>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">
                    Completed
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-600">
                    {technician.completed}
                  </p>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">
                    Pending
                  </p>

                  <p className="mt-1 text-lg font-bold text-yellow-600">
                    {pending}
                  </p>
                </div>
              </div>

              {/* Completion Rate */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Completion Rate
                  </span>

                  <span className="text-sm font-semibold">
                    {completionRate}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${completionRate}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}