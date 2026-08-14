import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import WorkOrdersToolbar from "@/components/dashboard/customer/WorkOrders/WorkOrdersToolbar";
import WorkOrdersTable from "@/components/dashboard/customer/WorkOrders/WorkOrdersTable";
import WorkOrderDetailsDrawer from "@/components/dashboard/customer/WorkOrders/WorkOrderDetailsDrawer";
import NewWorkOrderDialog from "@/components/dashboard/customer/WorkOrders/NewWorkOrderDialog";
import CancelWorkOrderDialog from "@/components/dashboard/customer/WorkOrders/CancelWorkOrderDialog";

import { workOrderService } from "@/services/workOrderService";

import type {
  CustomerWorkOrder,
} from "@/types/workOrder";


// ============================================================
// COMPONENT
// ============================================================

export default function WorkOrders() {

  const location = useLocation();


  // ==========================================================
  // FILTERS
  // ==========================================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");


  // ==========================================================
  // WORK ORDERS
  // ==========================================================

  const [workOrders, setWorkOrders] =
    useState<CustomerWorkOrder[]>([]);

  const [loading, setLoading] =
    useState(true);


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

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [newRequestOpen, setNewRequestOpen] =
    useState(false);

  const [cancelDialogOpen, setCancelDialogOpen] =
    useState(false);


  // ==========================================================
  // LOAD CUSTOMER WORK ORDERS
  // ==========================================================

  useEffect(() => {
    loadWorkOrders();
  }, []);


  async function loadWorkOrders() {

    try {

      setLoading(true);

      const response =
        await workOrderService.getMyWorkOrders();


      // Convert backend response
      // to your existing frontend model

      const orders: CustomerWorkOrder[] =
        response.map((order) => ({

          id: String(order.id),

          title: order.title,

          description:
            order.description,

          priority:
            order.priority,

          status:
            order.status,

          scheduledDate:
            order.scheduledDate,

          service:
            order.title,

          technician:
            order.technicianName ??
            "Unassigned",

          date:
            order.scheduledDate,

        }));


      setWorkOrders(orders);

    } catch (error) {

      console.error(
        "Failed to load customer work orders:",
        error
      );

      toast.error(
        "Failed to load work orders."
      );

    } finally {

      setLoading(false);
    }
  }


  // ==========================================================
  // OPEN NEW REQUEST FROM DASHBOARD
  // ==========================================================

  useEffect(() => {

    if (location.state?.openNewRequest) {

      setEditingWorkOrder(null);

      setNewRequestOpen(true);


      // Clear navigation state

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

  const handleSubmit = (
    workOrder: CustomerWorkOrder
  ) => {

    if (editingWorkOrder) {

      // ------------------------------------------------------
      // Currently update only UI.
      // Backend UPDATE API can be connected next.
      // ------------------------------------------------------

      setWorkOrders((prev) =>
        prev.map((item) =>
          item.id === workOrder.id
            ? workOrder
            : item
        )
      );


      setSelectedWorkOrder(
        workOrder
      );


      toast.success(
        "Work order updated successfully."
      );

    } else {

      // ------------------------------------------------------
      // New order was already created in backend
      // by NewWorkOrderDialog.
      // ------------------------------------------------------

      setWorkOrders((prev) => [
        workOrder,
        ...prev,
      ]);


      toast.success(
        "Work order created successfully."
      );
    }


    setEditingWorkOrder(null);

    setNewRequestOpen(false);
  };


  // ==========================================================
  // CANCEL WORK ORDER
  // ==========================================================

  const handleCancel = () => {

    if (!workOrderToCancel) {
      return;
    }


    const cancelledOrder = {
      ...workOrderToCancel,
      status: "CANCELLED" as const,
    };


    // Currently update UI.
    // Backend cancellation API can be connected next.

    setWorkOrders((prev) =>
      prev.map((order) =>
        order.id === cancelledOrder.id
          ? cancelledOrder
          : order
      )
    );


    setSelectedWorkOrder(
      cancelledOrder
    );


    setDrawerOpen(false);

    setCancelDialogOpen(false);

    setWorkOrderToCancel(null);


    toast.success(
      "Work order cancelled successfully."
    );
  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <div className="space-y-6">

        <SectionHeader
          title="My Work Orders"
          subtitle="View and manage all your service requests."
        />

        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          Loading your work orders...
        </div>

      </div>
    );
  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="space-y-6">

      {/* ====================================================
          HEADER
          ==================================================== */}

      <SectionHeader
        title="My Work Orders"
        subtitle="View and manage all your service requests."
      />


      {/* ====================================================
          TOOLBAR
          ==================================================== */}

      <WorkOrdersToolbar

        search={search}

        onSearchChange={
          setSearch
        }

        status={status}

        onStatusChange={
          setStatus
        }

        onNewRequest={() => {

          setEditingWorkOrder(null);

          setNewRequestOpen(true);
        }}

      />


      {/* ====================================================
          TABLE
          ==================================================== */}

      <WorkOrdersTable

        workOrders={
          workOrders
        }

        search={search}

        status={status}

        onView={(order) => {

          setSelectedWorkOrder(
            order
          );

          setDrawerOpen(true);
        }}

      />


      {/* ====================================================
          DETAILS DRAWER
          ==================================================== */}

      <WorkOrderDetailsDrawer

        open={drawerOpen}

        onOpenChange={
          setDrawerOpen
        }

        workOrder={
          selectedWorkOrder
        }


        onEdit={(order) => {

          setEditingWorkOrder(
            order
          );

          setDrawerOpen(false);

          setNewRequestOpen(true);
        }}


        onCancel={(id) => {

          const order =
            workOrders.find(
              (w) => w.id === id
            );


          if (order) {

            setWorkOrderToCancel(
              order
            );

            setCancelDialogOpen(
              true
            );
          }
        }}

      />


      {/* ====================================================
          NEW WORK ORDER
          ==================================================== */}

      <NewWorkOrderDialog

        open={
          newRequestOpen
        }

        onOpenChange={(open) => {

          setNewRequestOpen(
            open
          );


          if (!open) {

            setEditingWorkOrder(
              null
            );
          }

        }}

        editingWorkOrder={
          editingWorkOrder
        }

        onSubmit={
          handleSubmit
        }

      />


      {/* ====================================================
          CANCEL
          ==================================================== */}

      <CancelWorkOrderDialog

        open={
          cancelDialogOpen
        }

        onOpenChange={
          setCancelDialogOpen
        }

        onConfirm={
          handleCancel
        }

      />

    </div>
  );
}