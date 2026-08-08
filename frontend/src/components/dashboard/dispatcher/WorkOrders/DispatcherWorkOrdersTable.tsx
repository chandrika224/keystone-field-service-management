import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import { dispatcherWorkOrders } from "@/data/dispatcher/workOrders";
import type { DispatcherWorkOrder, WorkOrderStatus } from "@/types/workOrder";

interface DispatcherWorkOrdersTableProps {
  workOrders: DispatcherWorkOrder[];
  search: string;
  status: string;
  priority: string;
  onView: (order: DispatcherWorkOrder) => void;
}

export default function DispatcherWorkOrdersTable({
  workOrders,
  search,
  status,
  priority,
  onView,
}: DispatcherWorkOrdersTableProps) {

  const filteredOrders = workOrders.filter((order) => {

    const keyword = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(keyword) ||
      order.customer.toLowerCase().includes(keyword) ||
      order.service.toLowerCase().includes(keyword) ||
      order.technician.toLowerCase().includes(keyword);

    const matchesStatus =
      status === "ALL" ||
      order.status === status;

    const matchesPriority =
      priority === "ALL" ||
      order.priority === priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });


  return (
    <div className="overflow-hidden rounded-2xl border bg-card">

      <table className="w-full">

        <thead className="border-b bg-muted/40">

          <tr>

            <th className="px-6 py-4 text-left">Work Order</th>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Service</th>
            <th className="px-6 py-4 text-left">Priority</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Technician</th>
            <th className="px-6 py-4 text-right">Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredOrders.map((order) => (

            <tr
              key={order.id}
              className="border-b hover:bg-muted/30"
            >

              <td className="px-6 py-4">
                {order.id}
              </td>

              <td className="px-6 py-4">
                {order.customer}
              </td>

              <td className="px-6 py-4">
                {order.service}
              </td>

              <td className="px-6 py-4">
                {order.priority}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>

              <td className="px-6 py-4">
                {order.technician}
              </td>

              <td className="px-6 py-4 text-right">

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(order)}
                >
                  View
                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}