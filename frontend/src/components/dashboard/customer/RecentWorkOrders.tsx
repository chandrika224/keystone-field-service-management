import { recentWorkOrders } from "@/data/dashboard/recentWorkOrders";
import StatusBadge from "@/components/common/StatusBadge";
import type { WorkOrderStatus } from "@/types/status";

export default function RecentWorkOrders() {
  return (
    <div className="rounded-2xl border bg-card shadow-sm">

      <div className="divide-y">

        {recentWorkOrders.map((order) => (

          <div
            key={order.id}
            className="flex items-center justify-between p-5"
          >

            <div>

              <h3 className="font-semibold">
                {order.service}
              </h3>

              <p className="text-sm text-muted-foreground">
                {order.id}
              </p>

            </div>

            <div className="text-right">

              <StatusBadge
                status={order.status as WorkOrderStatus}
              />

              <p className="text-sm text-muted-foreground">
                {order.date}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}