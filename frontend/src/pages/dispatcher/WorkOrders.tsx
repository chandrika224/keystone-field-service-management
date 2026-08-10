import { useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import DispatcherWorkOrdersToolbar from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrdersToolbar";
import DispatcherWorkOrdersTable from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrdersTable";
import DispatcherWorkOrderDetailsDrawer from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrderDetailsDrawer";
import DispatcherAssignTechnicianDialog from "@/components/dashboard/dispatcher/WorkOrders/DispatcherAssignTechnicianDialog";

import { dispatcherWorkOrders } from "@/data/dispatcher/workOrders";
import type { DispatcherWorkOrder } from "@/types/workOrder";

export default function DispatcherWorkOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [workOrders, setWorkOrders] =
    useState<DispatcherWorkOrder[]>(dispatcherWorkOrders);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [assignDialogOpen, setAssignDialogOpen] =
    useState(false);

  const [workOrderToAssign, setWorkOrderToAssign] =
    useState<DispatcherWorkOrder | null>(null);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Dispatcher Work Orders"
        subtitle="Manage and assign incoming service requests."
      />

      <DispatcherWorkOrdersToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
      />

      <DispatcherWorkOrdersTable
        workOrders={workOrders}
        search={search}
        status={status}
        priority={priority}
        onView={(order) => {
          console.log("View clicked:", order);

          setSelectedWorkOrder(order);
          setDrawerOpen(true);
        }}
      />

      <DispatcherWorkOrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        workOrder={selectedWorkOrder}
        onAssign={(order) => {
          setWorkOrderToAssign(order);
          setAssignDialogOpen(true);
        }}
      />

      <DispatcherAssignTechnicianDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        onAssign={(technician) => {

          if (!workOrderToAssign) return;

          const updatedOrder: DispatcherWorkOrder = {
            ...workOrderToAssign,
            technician,
            status: "ASSIGNED",
          };

          setWorkOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id
                ? updatedOrder
                : order
            )
          );

          setSelectedWorkOrder(updatedOrder);

          setWorkOrderToAssign(null);
          setAssignDialogOpen(false);

          toast.success("Technician assigned successfully.");
        }}
      />

    </div>
  );
}