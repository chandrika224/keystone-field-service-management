import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import WorkOrdersToolbar from "@/components/dashboard/customer/WorkOrders/WorkOrdersToolbar";
import WorkOrdersTable from "@/components/dashboard/customer/WorkOrders/WorkOrdersTable";
import WorkOrderDetailsDrawer from "@/components/dashboard/customer/WorkOrders/WorkOrderDetailsDrawer";
import NewWorkOrderDialog from "@/components/dashboard/customer/WorkOrders/NewWorkOrderDialog";
import CancelWorkOrderDialog from "@/components/dashboard/customer/WorkOrders/CancelWorkOrderDialog";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { workOrderService } from "@/services/workOrderService";
import type { CustomerWorkOrder, WorkOrderResponse } from "@/types/workOrder";

export default function WorkOrders() {
  const location = useLocation();

  // ==========================================================
  // FILTERS
  // ==========================================================
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  // ==========================================================
  // WORK ORDERS & LOADING STATES
  // ==========================================================
  const [workOrders, setWorkOrders] = useState<CustomerWorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ==========================================================
  // SELECTED / EDITING
  // ==========================================================
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<CustomerWorkOrder | null>(null);
  const [editingWorkOrder, setEditingWorkOrder] =
    useState<CustomerWorkOrder | null>(null);
  const [workOrderToCancel, setWorkOrderToCancel] =
    useState<CustomerWorkOrder | null>(null);

  // ==========================================================
  // DIALOG STATES
  // ==========================================================
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // ==========================================================
  // CONVERT BACKEND RESPONSE TO FRONTEND MODEL
  // ==========================================================
  const mapToCustomerWorkOrder = (
    order: WorkOrderResponse
  ): CustomerWorkOrder => {
    return {
      id: String(order.id),
      title: order.title,
      serviceType: order.serviceType,
      address: order.address,
      description: order.description,
      priority: order.priority,
      status: order.status,
      scheduledDate: order.scheduledDate,
      service: order.serviceType ?? order.title,
      technician: order.technicianName ?? "Unassigned",
      date: order.scheduledDate,
    };
  };

  // ==========================================================
  // LOAD CUSTOMER WORK ORDERS
  // ==========================================================
  const loadWorkOrders = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setIsRefreshing(true);

      const response = await workOrderService.getMyWorkOrders();
      const orders: CustomerWorkOrder[] = response.map(mapToCustomerWorkOrder);
      setWorkOrders(orders);
    } catch (error) {
      console.error("Failed to load customer work orders:", error);
      toast.error("Failed to load work orders.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWorkOrders();
  }, [loadWorkOrders]);

  // ==========================================================
  // OPEN NEW REQUEST FROM DASHBOARD NAVIGATION
  // ==========================================================
  useEffect(() => {
    if (location.state?.openNewRequest) {
      setEditingWorkOrder(null);
      setNewRequestOpen(true);

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, [location.state]);

  // ==========================================================
  // CREATE / UPDATE CALLBACK
  // ==========================================================
  const handleSubmit = async (workOrder: CustomerWorkOrder) => {
    if (editingWorkOrder) {
      toast.success("Work order updated successfully.");
    } else {
      toast.success("Work order created successfully.");
    }

    setEditingWorkOrder(null);
    setNewRequestOpen(false);
    await loadWorkOrders(true); // Re-fetch for full backend sync
  };

  // ==========================================================
  // CANCEL WORK ORDER
  // ==========================================================
  const handleCancel = async () => {
    if (!workOrderToCancel) return;

    try {
      const cancelled = await workOrderService.cancelMyWorkOrder(
        Number(workOrderToCancel.id)
      );

      const cancelledOrder = mapToCustomerWorkOrder(cancelled);

      setWorkOrders((prev) =>
        prev.map((order) =>
          order.id === cancelledOrder.id ? cancelledOrder : order
        )
      );

      if (selectedWorkOrder?.id === cancelledOrder.id) {
        setSelectedWorkOrder(cancelledOrder);
      }

      setCancelDialogOpen(false);
      setDrawerOpen(false);
      setWorkOrderToCancel(null);

      toast.success("Work order cancelled successfully.");
    } catch (error) {
      console.error("Failed to cancel work order:", error);
      toast.error("Failed to cancel work order.");
    }
  };

  // ==========================================================
  // SKELETON LOADING STATE
  // ==========================================================
  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="My Work Orders"
          subtitle="View and manage all your service requests."
        />
        <div className="space-y-4 rounded-xl border p-6 bg-card">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-3 pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER MAIN UI
  // ==========================================================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="My Work Orders"
          subtitle="View and manage all your service requests."
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => loadWorkOrders(true)}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <WorkOrdersToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onNewRequest={() => {
          setEditingWorkOrder(null);
          setNewRequestOpen(true);
        }}
      />

      <WorkOrdersTable
        workOrders={workOrders}
        search={search}
        status={status}
        onView={(order) => {
          setSelectedWorkOrder(order);
          setDrawerOpen(true);
        }}
      />

      <WorkOrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        workOrder={selectedWorkOrder}
        onEdit={(order) => {
          setEditingWorkOrder(order);
          setDrawerOpen(false);
          setNewRequestOpen(true);
        }}
        onCancel={(id) => {
          const targetId = String(id);
          const order = workOrders.find(
            (workOrder) => workOrder.id === targetId
          );

          if (!order) return;

          setWorkOrderToCancel(order);
          setCancelDialogOpen(true);
        }}
      />

      <NewWorkOrderDialog
        open={newRequestOpen}
        onOpenChange={(open) => {
          setNewRequestOpen(open);
          if (!open) setEditingWorkOrder(null);
        }}
        editingWorkOrder={editingWorkOrder}
        onSubmit={handleSubmit}
      />

      <CancelWorkOrderDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleCancel}
      />
    </div>
  );
}