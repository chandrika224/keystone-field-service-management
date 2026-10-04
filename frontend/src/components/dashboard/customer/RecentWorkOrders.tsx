import type { CustomerWorkOrder } from "@/types/workOrder";

type RecentWorkOrdersProps = {
  workOrders: CustomerWorkOrder[];
};

export default function RecentWorkOrders({
  workOrders,
}: RecentWorkOrdersProps) {
  if (workOrders.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-sm text-muted-foreground">
        You don't have any recent work orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {workOrders.map((order) => (
        <div key={order.id} className="rounded-xl border p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-medium">{order.title}</h3>
            <span className="rounded-full bg-muted px-2 py-1 text-xs">
              {order.status.replaceAll("_", " ")}
            </span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {order.serviceType || "Service"}
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            Created:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Date unavailable"}
          </p>
        </div>
      ))}
    </div>
  );
}