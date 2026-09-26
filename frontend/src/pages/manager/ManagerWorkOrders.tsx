import { useEffect, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerWorkOrdersToolbar
  from "@/components/dashboard/manager/WorkOrders/ManagerWorkOrdersToolbar";

import ManagerWorkOrdersTable
  from "@/components/dashboard/manager/WorkOrders/ManagerWorkOrdersTable";

import DispatcherWorkOrderDetailsDrawer
  from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrderDetailsDrawer";

import { workOrderService } from "@/services/workOrderService";
import type { DispatcherWorkOrder } from "@/types/workOrder";

export default function ManagerWorkOrders() {
  const [workOrders, setWorkOrders] = useState<DispatcherWorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const fetchWorkOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await workOrderService.getAllWorkOrders();

        if (isCurrent) {
          setWorkOrders(data);
        }
      } catch (err) {
        console.error("Failed to fetch work orders:", err);

        if (isCurrent) {
          setError("Unable to load work orders. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    void fetchWorkOrders();

    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

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

      {loading ? (
        <div className="rounded-lg border px-6 py-10 text-center text-muted-foreground">
          Loading work orders...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-lg border px-6 py-10 text-center"
        >
          <p className="text-destructive">{error}</p>

          <button
            type="button"
            className="mt-3 text-sm underline"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Retry
          </button>
        </div>
      ) : (
        <ManagerWorkOrdersTable
          workOrders={workOrders}
          search={search}
          status={status}
          priority={priority}
          onView={(workOrder) => {
            setSelectedWorkOrder(workOrder);
            setDrawerOpen(true);
          }}
        />
      )}

      <DispatcherWorkOrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        workOrder={selectedWorkOrder}
      />
    </div>
  );
}