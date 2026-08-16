import { useEffect, useState } from "react";

import StatusBadge from "@/components/common/StatusBadge";

import type {
  WorkOrderResponse,
  WorkOrderStatus,
} from "@/types/workOrder";

import { workOrderService } from "@/services/workOrderService";

interface RecentWorkOrdersProps {
  refreshTrigger: number;
  onSelect: (workOrder: WorkOrderResponse) => void;
}

export default function RecentWorkOrders({
  refreshTrigger,
  onSelect,
}: RecentWorkOrdersProps) {
  const [workOrders, setWorkOrders] = useState<WorkOrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWorkOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await workOrderService.getMyWorkOrders();

      setWorkOrders(data);
    } catch (error) {
      console.error("Failed to load work orders:", error);

      setError("Unable to load your work orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkOrders();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="p-6 text-center text-sm text-muted-foreground">
          Loading your work orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="p-6 text-center text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (workOrders.length === 0) {
    return (
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="p-8 text-center">
          <p className="font-medium">
            No work orders yet
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a service request to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="divide-y">

        {workOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => onSelect(order)}
            className="flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-muted/50"
          >
            <div>
              <h3 className="font-semibold">
                {order.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                WO-{order.id}
              </p>
            </div>

            <div className="text-right">
              <StatusBadge
                status={order.status as WorkOrderStatus}
              />

              <p className="mt-1 text-sm text-muted-foreground">
                {order.scheduledDate}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}