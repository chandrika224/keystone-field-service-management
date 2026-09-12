import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import type { CustomerWorkOrder } from "@/types/workOrder";

// ============================================================
// PROPS
// ============================================================

interface WorkOrdersTableProps {
  workOrders: CustomerWorkOrder[];
  search: string;
  status: string;
  onView: (order: CustomerWorkOrder) => void;
}

// ============================================================
// COMPONENT
// ============================================================

export default function WorkOrdersTable({
  workOrders,
  search,
  status,
  onView,
}: WorkOrdersTableProps) {

  // ==========================================================
  // FILTER WORK ORDERS
  // ==========================================================

  const filteredOrders = workOrders.filter((order) => {
    const keyword = search.trim().toLowerCase();

    // --------------------------------------------------------
    // Search
    // --------------------------------------------------------

    const matchesSearch =
      order.id
        .toString()
        .toLowerCase()
        .includes(keyword) ||

      order.service
        .toLowerCase()
        .includes(keyword) ||

      (order.siteName ?? "")
        .toLowerCase()
        .includes(keyword) ||

      order.technician
        .toLowerCase()
        .includes(keyword);

    // --------------------------------------------------------
    // Status
    // --------------------------------------------------------

    const matchesStatus =
      status === "ALL" ||
      order.status === status;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">

      <table className="w-full">

        {/* ==================================================
            HEADER
            ================================================== */}

        <thead className="border-b bg-muted/40">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Work Order
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Service
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Service Location
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

        {/* ==================================================
            BODY
            ================================================== */}

        <tbody>

          {filteredOrders.length === 0 ? (

            <tr>

              <td
                colSpan={7}
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

                {/* WORK ORDER ID */}

                <td className="px-6 py-4">
                  {order.id}
                </td>

                {/* SERVICE */}

                <td className="px-6 py-4">
                  {order.service}
                </td>

                {/* SERVICE LOCATION */}

                <td className="px-6 py-4">
                  <div className="font-medium">
                    {order.siteName ??
                      `Site #${order.siteId}`}
                  </div>
                </td>

                {/* TECHNICIAN */}

                <td className="px-6 py-4">
                  {order.technician}
                </td>

                {/* STATUS */}

                <td className="px-6 py-4">
                  <StatusBadge
                    status={order.status}
                  />
                </td>

                {/* DATE */}

                <td className="px-6 py-4">
                  {order.date}
                </td>

                {/* ACTION */}

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