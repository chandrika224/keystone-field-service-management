import StatusBadge from "@/components/common/StatusBadge";
import PriorityBadge from "@/components/common/PriorityBadge"; // Optional: if you have a badge for priority
import { Button } from "@/components/ui/button";
import type { CustomerWorkOrder } from "@/types/workOrder";

interface WorkOrdersTableProps {
  workOrders: CustomerWorkOrder[];
  search: string;
  status: string;
  onView: (order: CustomerWorkOrder) => void;
}

export default function WorkOrdersTable({
  workOrders,
  search,
  status,
  onView,
}: WorkOrdersTableProps) {
  // ============================================================
  // FILTER WORK ORDERS
  // ============================================================

  const filteredWorkOrders = workOrders.filter((order) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm) ||
      order.title.toLowerCase().includes(searchTerm) ||
      order.description.toLowerCase().includes(searchTerm) ||
      (order.technician ?? "").toLowerCase().includes(searchTerm);

    const matchesStatus =
      status === "ALL" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Work Order
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Service
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Description
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Priority
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Technician
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Date
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredWorkOrders.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-10 text-center text-muted-foreground"
              >
                No work orders found.
              </td>
            </tr>
          ) : (
            filteredWorkOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-muted/30"
              >
                {/* Work Order ID */}
                <td className="px-6 py-4 font-mono">
                  #{order.id}
                </td>

                {/* Service / Title */}
                <td className="px-6 py-4 font-medium">
                  {order.title}
                </td>

                {/* Description */}
                <td className="max-w-xs truncate px-6 py-4 text-sm text-muted-foreground">
                  {order.description}
                </td>

                {/* Priority */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      order.priority === "HIGH"
                        ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        : order.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                    }`}
                  >
                    {order.priority}
                  </span>
                </td>

                {/* Technician */}
                <td className="px-6 py-4">
                  {order.technician}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-muted-foreground">
                  {order.date}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(order)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}