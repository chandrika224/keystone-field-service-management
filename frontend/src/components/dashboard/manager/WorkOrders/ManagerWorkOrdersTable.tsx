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
  const searchValue = search.trim().toLowerCase();

  const filteredWorkOrders = workOrders.filter((workOrder) => {
    const matchesSearch =
      String(workOrder.id).includes(searchValue) ||
      workOrder.title.toLowerCase().includes(searchValue) ||
      workOrder.customerName.toLowerCase().includes(searchValue) ||
      (workOrder.serviceType ?? "").toLowerCase().includes(searchValue) ||
      (workOrder.technicianName ?? "").toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "ALL" || workOrder.status === status;

    const matchesPriority =
      priority === "ALL" || workOrder.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[900px]">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4 text-left">Work Order</th>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Service</th>
            <th className="px-6 py-4 text-left">Technician</th>
            <th className="px-6 py-4 text-left">Priority</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
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
              <tr key={workOrder.id} className="border-t">
                <td className="px-6 py-4">
                  <p className="font-medium">{workOrder.title}</p>
                  <p className="text-sm text-muted-foreground">
                    #{workOrder.id}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {workOrder.customerName}
                </td>

                <td className="px-6 py-4">
                  {workOrder.serviceType || "Not specified"}
                </td>

                <td className="px-6 py-4">
                  {workOrder.technicianName || "Unassigned"}
                </td>

                <td className="px-6 py-4">
                  <Badge variant="outline">
                    {workOrder.priority}
                  </Badge>
                </td>

                <td className="px-6 py-4">
                  <Badge>
                    {workOrder.status.replaceAll("_", " ")}
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