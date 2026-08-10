import { customerWorkOrders } from "@/data/customer/workOrders";
import StatusBadge from "@/components/common/StatusBadge";
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

  const filteredOrders = workOrders.filter((order) => {

  const keyword = search.toLowerCase();

  const matchesSearch =
    order.id.toLowerCase().includes(keyword) ||
    order.service.toLowerCase().includes(keyword) ||
    order.technician.toLowerCase().includes(keyword);

  const matchesStatus =
    status === "ALL" ||
    order.status === status;

  return matchesSearch && matchesStatus;

});

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

          {filteredOrders.length === 0 ? (

            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-muted-foreground"
              >
                No work orders found.
              </td>
            </tr>

          ) : (

            filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-muted/30"
              >

                <td className="px-6 py-4">
                  {order.id}
                </td>

                <td className="px-6 py-4">
                  {order.service}
                </td>

                <td className="px-6 py-4">
                  {order.technician}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="px-6 py-4">
                  {order.date}
                </td>

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