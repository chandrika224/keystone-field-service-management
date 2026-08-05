import { customerWorkOrders } from "@/data/customer/workOrders";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { test } from "@/data/customer/workOrders";

console.log(test);

export default function WorkOrdersTable() {
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

          {customerWorkOrders.map((order) => (

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
                <StatusBadge
                  status={order.status}
                />
              </td>

              <td className="px-6 py-4">
                {order.date}
              </td>

              <td className="px-6 py-4 text-right">

                <Button
                  size="sm"
                  variant="outline"
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