import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";

import type {
  DispatcherWorkOrder,
} from "@/types/workOrder";

interface DispatcherAssignmentTableProps {
  workOrders: DispatcherWorkOrder[];

  onAssign: (
    order: DispatcherWorkOrder
  ) => void;
}

export default function DispatcherAssignmentTable({
  workOrders,
  onAssign,
}: DispatcherAssignmentTableProps) {

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">

      <table className="w-full">

        <thead className="border-b bg-muted/40">

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

            <th className="px-6 py-4 text-left">
              Scheduled Date
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
                colSpan={8}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No work orders found.
              </td>

            </tr>

          ) : (

            workOrders.map(
              (order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-muted/30"
                >

                  {/* WORK ORDER */}

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium">
                        {order.id}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {order.title}
                      </p>

                    </div>

                  </td>

                  {/* CUSTOMER */}

                  <td className="px-6 py-4">
                    {order.customer}
                  </td>

                  {/* SERVICE */}

                  <td className="px-6 py-4">
                    {order.service}
                  </td>

                  {/* PRIORITY */}

                  <td className="px-6 py-4">

                    {order.priority}

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={
                        order.status
                      }
                    />

                  </td>

                  {/* TECHNICIAN */}

                  <td className="px-6 py-4">

                    {order.technician}

                  </td>

                  {/* SCHEDULED DATE */}

                  <td className="px-6 py-4">

                    {order.scheduledDate}

                  </td>

                  {/* ACTION */}

                  <td className="px-6 py-4 text-right">

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onAssign(order)
                      }
                    >
                      {order.technician ===
                      "Unassigned"
                        ? "Assign"
                        : "Reassign"}
                    </Button>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>
  );
}