import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerWorkOrdersTableProps {
  workOrders: DispatcherWorkOrder[];
  search: string;
  status: string;
  priority: string;

  onView: (workOrder: DispatcherWorkOrder) => void;
}

export default function ManagerWorkOrdersTable({
  workOrders,
  search,
  status,
  priority,
  onView,
}: ManagerWorkOrdersTableProps) {

  const filteredWorkOrders = workOrders.filter((workOrder) => {

    const searchValue = search.toLowerCase();

    const matchesSearch =
      workOrder.id
        .toLowerCase()
        .includes(searchValue) ||

      workOrder.customer
        .toLowerCase()
        .includes(searchValue) ||

      workOrder.service
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      status === "ALL" ||
      workOrder.status === status;

    const matchesPriority =
      priority === "ALL" ||
      workOrder.priority === priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="overflow-hidden rounded-lg border">

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
              Technician
            </th>

            <th className="px-6 py-4 text-left">
              Priority
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredWorkOrders.length === 0 ? (

            <tr>
              <td
                colSpan={7}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No work orders found.
              </td>
            </tr>

          ) : (

            filteredWorkOrders.map((workOrder) => (

              <tr
                key={workOrder.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  <p className="font-medium">
                    {workOrder.id}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {workOrder.customer}
                </td>

                <td className="px-6 py-4">
                  {workOrder.service}
                </td>

                <td className="px-6 py-4">
                  {workOrder.technician || "Unassigned"}
                </td>

                <td className="px-6 py-4">
                  <Badge variant="outline">
                    {workOrder.priority}
                  </Badge>
                </td>

                <td className="px-6 py-4">
                  <Badge>
                    {workOrder.status.replace("_", " ")}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(workOrder)}
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