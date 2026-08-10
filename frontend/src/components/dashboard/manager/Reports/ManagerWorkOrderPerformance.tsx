import type { WorkOrderPerformance } from "@/data/manager/reports";

interface ManagerWorkOrderPerformanceProps {
  data: WorkOrderPerformance[];
}

export default function ManagerWorkOrderPerformance({
  data,
}: ManagerWorkOrderPerformanceProps) {
  const maxValue = Math.max(
    ...data.flatMap((item) => [
      item.completed,
      item.pending,
      item.cancelled,
    ]),
    1
  );

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Work Order Performance
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Completed, pending and cancelled work orders
          across the reporting period.
        </p>
      </div>

      {/* Legend */}

      <div className="mb-6 flex flex-wrap gap-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span>Completed</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span>Pending</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span>Cancelled</span>
        </div>
      </div>

      {/* Chart */}

      <div className="space-y-6">
        {data.map((item) => {
          const completedWidth =
            (item.completed / maxValue) * 100;

          const pendingWidth =
            (item.pending / maxValue) * 100;

          const cancelledWidth =
            (item.cancelled / maxValue) * 100;

          return (
            <div key={item.period}>

              {/* Period */}

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {item.period}
                </span>

                <span className="text-xs text-muted-foreground">
                  {item.completed +
                    item.pending +
                    item.cancelled}{" "}
                  total
                </span>
              </div>

              {/* Completed */}

              <div className="mb-2 flex items-center gap-3">
                <span className="w-20 text-xs text-muted-foreground">
                  Completed
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${completedWidth}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-right text-xs font-medium">
                  {item.completed}
                </span>
              </div>

              {/* Pending */}

              <div className="mb-2 flex items-center gap-3">
                <span className="w-20 text-xs text-muted-foreground">
                  Pending
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-yellow-500 transition-all"
                    style={{
                      width: `${pendingWidth}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-right text-xs font-medium">
                  {item.pending}
                </span>
              </div>

              {/* Cancelled */}

              <div className="flex items-center gap-3">
                <span className="w-20 text-xs text-muted-foreground">
                  Cancelled
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{
                      width: `${cancelledWidth}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-right text-xs font-medium">
                  {item.cancelled}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Empty state */}

      {data.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No work order data available for this period.
          </p>
        </div>
      )}
    </div>
  );
}