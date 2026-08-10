import { useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import WorkOrdersToolbar from "@/components/dashboard/customer/WorkOrders/WorkOrdersToolbar";
import WorkOrdersTable from "@/components/dashboard/customer/WorkOrders/WorkOrdersTable";
import WorkOrderDetailsDrawer from "@/components/dashboard/customer/WorkOrders/WorkOrderDetailsDrawer";
import NewWorkOrderDialog from "@/components/dashboard/customer/WorkOrders/NewWorkOrderDialog";
import CancelWorkOrderDialog from "@/components/dashboard/customer/WorkOrders/CancelWorkOrderDialog";

import { customerWorkOrders } from "@/data/customer/workOrders";
import type { CustomerWorkOrder } from "@/types/workOrder";

export default function WorkOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [workOrders, setWorkOrders] = useState(customerWorkOrders);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<CustomerWorkOrder | null>(null);

  const [editingWorkOrder, setEditingWorkOrder] =
    useState<CustomerWorkOrder | null>(null);

  const [workOrderToCancel, setWorkOrderToCancel] =
    useState<CustomerWorkOrder | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Work Orders"
        subtitle="View and manage all your service requests."
      />

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
          const order = workOrders.find((w) => w.id === id);

          if (order) {
            setWorkOrderToCancel(order);
            setCancelDialogOpen(true);
          }
        }}
      />

      <NewWorkOrderDialog
        open={newRequestOpen}
        onOpenChange={(open) => {
          setNewRequestOpen(open);

          if (!open) {
            setEditingWorkOrder(null);
          }
        }}
        editingWorkOrder={editingWorkOrder}
        onSubmit={(workOrder) => {
          if (editingWorkOrder) {
            // UPDATE
            setWorkOrders((prev) =>
              prev.map((item) =>
                item.id === workOrder.id ? workOrder : item
              )
            );

            setSelectedWorkOrder(workOrder);

            toast.success("Work order updated successfully.");
          } else {
            // CREATE
            setWorkOrders((prev) => [
              workOrder,
              ...prev,
            ]);

            toast.success("Work order created successfully.");
          }

          setEditingWorkOrder(null);
          setNewRequestOpen(false);
        }}
      />

      <CancelWorkOrderDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={() => {
          if (!workOrderToCancel) return;

          const cancelledOrder = {
            ...workOrderToCancel,
            status: "CANCELLED" as const,
          };

          setWorkOrders((prev) =>
            prev.map((order) =>
              order.id === cancelledOrder.id
                ? cancelledOrder
                : order
            )
          );

          setSelectedWorkOrder(cancelledOrder);

          setDrawerOpen(false);
          setCancelDialogOpen(false);
          setWorkOrderToCancel(null);

          toast.success("Work order cancelled successfully.");
        }}
      />
    </div>
  );
}