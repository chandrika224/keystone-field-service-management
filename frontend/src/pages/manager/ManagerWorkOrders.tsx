import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerWorkOrdersToolbar
  from "@/components/dashboard/manager/WorkOrders/ManagerWorkOrdersToolbar";

import ManagerWorkOrdersTable
  from "@/components/dashboard/manager/WorkOrders/ManagerWorkOrdersTable";

import DispatcherWorkOrderDetailsDrawer
  from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrderDetailsDrawer";

import type { WorkOrderResponse } from "@/types/workOrder";

import { workOrderService } from "@/services/workOrderService";

export default function ManagerWorkOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [workOrders, setWorkOrders] =
    useState<WorkOrderResponse[]>([]);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<WorkOrderResponse | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);


  // ============================================================
  // FETCH ALL WORK ORDERS
  // ============================================================

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        setLoading(true);

        const data =
          await workOrderService.getAllWorkOrders();

        setWorkOrders(data);

      } catch (error) {
        console.error(
          "Failed to fetch work orders:",
          error
        );

        toast.error(
          "Failed to load work orders."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);


  // ============================================================
  // UI
  // ============================================================

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


      {/* Loading */}

      {loading && (

        <div className="flex h-48 items-center justify-center rounded-lg border bg-card text-muted-foreground">

          <Loader2
            className="mr-2 h-6 w-6 animate-spin text-primary"
          />

          <span>
            Loading work orders...
          </span>

        </div>

      )}


      {/* Table */}

      {!loading && (

        <ManagerWorkOrdersTable
          workOrders={workOrders}
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

      )}


      {/* Details Drawer */}

      <DispatcherWorkOrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        workOrder={selectedWorkOrder}
      />

    </div>
  );
}