import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerRecentWorkOrdersProps {
  workOrders: DispatcherWorkOrder[];
  onView?: (workOrder: DispatcherWorkOrder) => void;
}

export default function ManagerRecentWorkOrders({
  workOrders,
  onView,
}: ManagerRecentWorkOrdersProps) {

  const recentWorkOrders = workOrders.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Work Orders</CardTitle>
      </CardHeader>

      <CardContent>

        {recentWorkOrders.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No recent work orders.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b text-sm text-muted-foreground">

                  <th className="px-4 py-3 text-left">
                    Work Order
                  </th>

                  <th className="px-4 py-3 text-left">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-left">
                    Service
                  </th>

                  <th className="px-4 py-3 text-left">
                    Priority
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {recentWorkOrders.map((workOrder) => (

                  <tr
                    key={workOrder.id}
                    className="border-b last:border-0"
                  >

                    <td className="px-4 py-4">

                      <p className="font-medium">
                        {workOrder.id}
                      </p>

                    </td>

                    <td className="px-4 py-4">
                      {workOrder.customer}
                    </td>

                    <td className="px-4 py-4">
                      {workOrder.service}
                    </td>

                    <td className="px-4 py-4">

                      <Badge variant="outline">
                        {workOrder.priority}
                      </Badge>

                    </td>

                    <td className="px-4 py-4">

                      <Badge>
                        {workOrder.status.replace("_", " ")}
                      </Badge>

                    </td>

                    <td className="px-4 py-4 text-right">

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView?.(workOrder)}
                      >
                        View
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </CardContent>
    </Card>
  );
}