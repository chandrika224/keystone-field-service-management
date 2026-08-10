import { useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerWorkOrdersToolbar
  from "@/components/dashboard/manager/WorkOrders/ManagerWorkOrdersToolbar";

import ManagerWorkOrdersTable
  from "@/components/dashboard/manager/WorkOrders/ManagerWorkOrdersTable";

import DispatcherWorkOrderDetailsDrawer
  from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrderDetailsDrawer";

import type { DispatcherWorkOrder } from "@/types/workOrder";

import { dispatcherWorkOrders } from "@/data/dispatcher/workOrders";

export default function ManagerWorkOrders() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Work Orders"
        subtitle="Monitor and review field service work orders."
      />

      <ManagerWorkOrdersToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
      />

      <ManagerWorkOrdersTable
        workOrders={dispatcherWorkOrders}
        search={search}
        status={status}
        priority={priority}
        onView={(workOrder) => {

          console.log(
            "Manager viewed work order:",
            workOrder
          );

          setSelectedWorkOrder(workOrder);
          setDrawerOpen(true);
        }}
      />

      <DispatcherWorkOrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        workOrder={selectedWorkOrder}
      />

    </div>
  );
}