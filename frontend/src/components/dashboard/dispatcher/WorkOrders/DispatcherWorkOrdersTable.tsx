import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";

import type { DispatcherWorkOrder } from "@/types/workOrder";

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

  // ============================================================
  // FILTER WORK ORDERS
  // ============================================================

  const filteredOrders = workOrders.filter((order) => {

    const keyword = search.toLowerCase().trim();

    const matchesSearch =
      order.id
        .toString()
        .toLowerCase()
        .includes(keyword) ||

      (order.customerName ?? "")
        .toLowerCase()
        .includes(keyword) ||

      order.title
        .toLowerCase()
        .includes(keyword) ||

      (order.technicianName ?? "")
        .toLowerCase()
        .includes(keyword);


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


  // ============================================================
  // TABLE
  // ============================================================

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

          {filteredOrders.length === 0 ? (

            <tr>

              <td
                colSpan={8}
                className="px-6 py-10 text-center text-muted-foreground"
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

                {/* WORK ORDER ID */}

                <td className="px-6 py-4 font-medium">
                  #{order.id}
                </td>


                {/* CUSTOMER */}

                <td className="px-6 py-4">

                  {order.customerName ||
                    "Unknown"}

                </td>


                {/* SERVICE / TITLE */}

                <td className="px-6 py-4">

                  <div>

                    <p className="font-medium">
                      {order.title}
                    </p>

                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {order.description}
                    </p>

                  </div>

                </td>


                {/* PRIORITY */}

                <td className="px-6 py-4">

                  {order.priority}

                </td>


                {/* STATUS */}

                <td className="px-6 py-4">

                  <StatusBadge
                    status={order.status}
                  />

                </td>


                {/* TECHNICIAN */}

                <td className="px-6 py-4">

                  {order.technicianName ||
                    "Unassigned"}

                </td>


                {/* SCHEDULED DATE */}

                <td className="px-6 py-4">

                  {order.scheduledDate
                    ? new Date(
                        order.scheduledDate
                      ).toLocaleDateString()
                    : "Not scheduled"}

                </td>


                {/* ACTION */}

                <td className="px-6 py-4 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onView(order)
                    }
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