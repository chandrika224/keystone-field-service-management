import type { CustomerWorkOrder } from "@/types/workOrder";

type UpcomingScheduleProps = {
  workOrders: CustomerWorkOrder[];
};

export default function UpcomingSchedule({
  workOrders,
}: UpcomingScheduleProps) {
  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      {workOrders.length === 0 ? (
        <div className="p-5 text-sm text-muted-foreground">
          You have no upcoming service appointments.
        </div>
      ) : (
        <div className="divide-y">
          {workOrders.map((order) => {
            const scheduledDate = order.scheduledDate
              ? new Date(order.scheduledDate)
              : null;

            const formattedDate =
              scheduledDate && !Number.isNaN(scheduledDate.getTime())
                ? scheduledDate.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Date not available";

            const location =
              order.address || order.siteName || "Location not available";

            return (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">
                    {order.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {location}
                  </p>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-lg
                    bg-primary/10
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-primary
                  "
                >
                  {formattedDate}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}