import { Button } from "@/components/ui/button";

import StatusBadge from "@/components/common/StatusBadge";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface DispatcherAssignmentTableProps {
  workOrders: DispatcherWorkOrder[];
  onAssign: (order: DispatcherWorkOrder) => void;
}

export default function DispatcherAssignmentTable({
  workOrders,
  onAssign,
}: DispatcherAssignmentTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">

      <table className="w-full">

        <thead className="bg-muted">

          <tr>

            <th className="px-6 py-4 text-left">
              Work Order
            </th>

            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Service
            </th>

            <th className="px-6 py-4 text-left">
              Priority
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Technician
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {workOrders.length === 0 ? (

            <tr>

              <td
                colSpan={7}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No work orders found.
              </td>

            </tr>

          ) : (

            workOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  <p className="font-medium">
                    {order.id}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {order.date}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {order.customer}
                </td>

                <td className="px-6 py-4">
                  {order.service}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={
                      order.priority === "High"
                        ? "font-semibold text-red-600"
                        : order.priority === "Medium"
                        ? "font-semibold text-yellow-600"
                        : "font-semibold text-green-600"
                    }
                  >
                    {order.priority}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <StatusBadge
                    status={order.status}
                  />

                </td>

                <td className="px-6 py-4">

                  {order.technician === "Unassigned" ? (

                    <span className="text-sm text-muted-foreground">
                      Unassigned
                    </span>

                  ) : (

                    <span className="font-medium">
                      {order.technician}
                    </span>

                  )}

                </td>

                <td className="px-6 py-4 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log(
                        "Assignment clicked:",
                        order
                      );

                      onAssign(order);
                    }}
                  >
                    {order.technician === "Unassigned"
                      ? "Assign"
                      : "Reassign"}
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