import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface DispatcherWorkOrdersTableProps {
  workOrders: DispatcherWorkOrder[];
  onView: (order: DispatcherWorkOrder) => void;
}

export default function DispatcherWorkOrdersTable({
  workOrders,
  onView,
}: DispatcherWorkOrdersTableProps) {

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">

      <table className="w-full">

        {/* ======================================================
            HEADER
        ====================================================== */}

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


        {/* ======================================================
            BODY
        ====================================================== */}

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

            workOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-muted/30"
              >

                {/* Work Order */}

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


                {/* Customer */}

                <td className="px-6 py-4">

                  {order.customer}

                </td>


                {/* Service */}

                <td className="px-6 py-4">

                  {order.service ?? "Not specified"}

                </td>


                {/* Priority */}

                <td className="px-6 py-4">

                  {order.priority}

                </td>


                {/* Status */}

                <td className="px-6 py-4">

                  <StatusBadge
                    status={order.status}
                  />

                </td>


                {/* Technician */}

                <td className="px-6 py-4">

                  {order.technician || "Unassigned"}

                </td>


                {/* Scheduled Date */}

                <td className="px-6 py-4">

                  {order.scheduledDate
                    ? new Date(
                        `${order.scheduledDate}T00:00:00`
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Not scheduled"}

                </td>


                {/* Action */}

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

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}