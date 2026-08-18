import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { WorkOrderResponse } from "@/types/workOrder";

interface ManagerWorkOrdersTableProps {
  workOrders: WorkOrderResponse[];
  search: string;
  status: string;
  priority: string;
  onView: (workOrder: WorkOrderResponse) => void;
}

export default function ManagerWorkOrdersTable({
  workOrders = [],
  search,
  status,
  priority,
  onView,
}: ManagerWorkOrdersTableProps) {

  // ============================================================
  // PRIORITY BADGE
  // ============================================================

  const getPriorityBadgeClass = (priorityLevel?: string) => {
    switch (priorityLevel?.toUpperCase()) {
      case "HIGH":
      case "URGENT":
      case "CRITICAL":
        return "border-red-200 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900";

      case "MEDIUM":
        return "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900";

      case "LOW":
        return "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900";

      default:
        return "border-gray-200 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };


  // ============================================================
  // STATUS BADGE
  // ============================================================

  const getStatusBadgeVariant = (orderStatus?: string) => {
    switch (orderStatus?.toUpperCase()) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300";

      case "IN_PROGRESS":
        return "bg-sky-100 text-sky-800 hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-300";

      case "ASSIGNED":
      case "SCHEDULED":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300";

      case "CANCELLED":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300";

      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
    }
  };


  // ============================================================
  // FILTER WORK ORDERS
  // ============================================================

  const filteredWorkOrders = workOrders.filter((workOrder) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      String(workOrder.id)
        .toLowerCase()
        .includes(searchValue) ||

      workOrder.title
        ?.toLowerCase()
        .includes(searchValue) ||

      workOrder.customerName
        ?.toLowerCase()
        .includes(searchValue) ||

      workOrder.serviceType
        ?.toLowerCase()
        .includes(searchValue) ||

      workOrder.technicianName
        ?.toLowerCase()
        .includes(searchValue);


    const matchesStatus =
      status === "ALL" ||
      workOrder.status?.toUpperCase() ===
        status.toUpperCase();


    const matchesPriority =
      priority === "ALL" ||
      workOrder.priority?.toUpperCase() ===
        priority.toUpperCase();


    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });


  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">

      <table className="w-full text-left text-sm text-foreground">

        <thead className="border-b bg-muted/60 text-xs font-semibold uppercase text-muted-foreground">
          <tr>

            <th className="px-6 py-3.5">
              Work Order
            </th>

            <th className="px-6 py-3.5">
              Customer
            </th>

            <th className="px-6 py-3.5">
              Service
            </th>

            <th className="px-6 py-3.5">
              Technician
            </th>

            <th className="px-6 py-3.5">
              Priority
            </th>

            <th className="px-6 py-3.5">
              Status
            </th>

            <th className="px-6 py-3.5 text-right">
              Action
            </th>

          </tr>
        </thead>


        <tbody className="divide-y divide-border">

          {filteredWorkOrders.length === 0 ? (

            <tr>

              <td
                colSpan={7}
                className="px-6 py-12 text-center text-muted-foreground"
              >
                No work orders match the selected filters.
              </td>

            </tr>

          ) : (

            filteredWorkOrders.map((workOrder) => (

              <tr
                key={workOrder.id}
                className="transition-colors hover:bg-muted/40"
              >

                {/* Work Order */}

                <td className="px-6 py-4">

                  <div className="font-medium text-foreground">
                    #{workOrder.id}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {workOrder.title || "Untitled"}
                  </div>

                </td>


                {/* Customer */}

                <td className="px-6 py-4 font-medium text-foreground/90">
                  {workOrder.customerName || "N/A"}
                </td>


                {/* Service */}

                <td className="px-6 py-4 text-muted-foreground">
                  {workOrder.serviceType || "N/A"}
                </td>


                {/* Technician */}

                <td className="px-6 py-4">

                  {workOrder.technicianName &&
                  workOrder.technicianName !== "Unassigned" ? (

                    <span className="font-medium text-foreground">
                      {workOrder.technicianName}
                    </span>

                  ) : (

                    <span className="italic text-muted-foreground">
                      Unassigned
                    </span>

                  )}

                </td>


                {/* Priority */}

                <td className="px-6 py-4">

                  <Badge
                    variant="outline"
                    className={`capitalize ${getPriorityBadgeClass(
                      workOrder.priority
                    )}`}
                  >

                    {workOrder.priority
                      ? workOrder.priority.toLowerCase()
                      : "N/A"}

                  </Badge>

                </td>


                {/* Status */}

                <td className="px-6 py-4">

                  <Badge
                    variant="secondary"
                    className={`capitalize ${getStatusBadgeVariant(
                      workOrder.status
                    )}`}
                  >

                    {workOrder.status
                      ? workOrder.status
                          .replace(/_/g, " ")
                          .toLowerCase()
                      : "N/A"}

                  </Badge>

                </td>


                {/* Action */}

                <td className="px-6 py-4 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(workOrder)}
                    className="h-8 px-3 text-xs"
                  >
                    View Details
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