import { Button } from "@/components/ui/button";

import StatusBadge from "@/components/common/StatusBadge";

import type {
  DispatcherWorkOrder,
} from "@/types/workOrder";

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

        {/* =====================================================
            TABLE HEADER
        ===================================================== */}

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


        {/* =====================================================
            TABLE BODY
        ===================================================== */}

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

            workOrders.map((order) => {

              const isUnassigned =
                !order.technicianName ||
                order.technicianName === "Unassigned";


              return (

                <tr
                  key={order.id}
                  className="border-t"
                >

                  {/* =================================================
                      WORK ORDER
                  ================================================= */}

                  <td className="px-6 py-4">

                    <p className="font-medium">
                      #{order.id}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {order.scheduledDate || "No date"}
                    </p>

                  </td>


                  {/* =================================================
                      CUSTOMER
                  ================================================= */}

                  <td className="px-6 py-4">

                    {order.customerName || "Unknown"}

                  </td>


                  {/* =================================================
                      SERVICE
                  ================================================= */}

                  <td className="px-6 py-4">

                    {order.title}

                  </td>


                  {/* =================================================
                      PRIORITY
                  ================================================= */}

                  <td className="px-6 py-4">

                    <span
                      className={
                        order.priority === "HIGH"
                          ? "font-semibold text-red-600"
                          : order.priority === "MEDIUM"
                          ? "font-semibold text-yellow-600"
                          : "font-semibold text-green-600"
                      }
                    >
                      {order.priority}
                    </span>

                  </td>


                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={order.status}
                    />

                  </td>


                  {/* =================================================
                      TECHNICIAN
                  ================================================= */}

                  <td className="px-6 py-4">

                    {isUnassigned ? (

                      <span className="text-sm text-muted-foreground">
                        Unassigned
                      </span>

                    ) : (

                      <span className="font-medium">
                        {order.technicianName}
                      </span>

                    )}

                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

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

                      {isUnassigned
                        ? "Assign"
                        : "Reassign"}

                    </Button>

                  </td>

                </tr>

              );

            })

          )}

        </tbody>

      </table>

    </div>
  );
}