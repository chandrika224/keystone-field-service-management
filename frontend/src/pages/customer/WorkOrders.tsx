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

import { useAuth } from "@/contexts/AuthContext";


// ============================================================
// COMPONENT
// ============================================================

export default function WorkOrders() {

  const location = useLocation();

  const { user } = useAuth();


  // ==========================================================
  // FILTERS
  // ==========================================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");


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

  const loadWorkOrders = async () => {

    try {

      setLoading(true);


      if (!user?.email) {

        console.error(
          "Customer email is not available"
        );

        return;
      }


      const data =
        await workOrderService.getMyWorkOrders(
          user.email
        );


      // --------------------------------------------------------
      // Add UI compatibility fields
      // --------------------------------------------------------

      const mappedWorkOrders =
        data.map((order) => ({
          ...order,

          service: order.serviceType,

          date: order.scheduledDate,

          technician:
            order.technicianName ??
            "Not assigned",
        }));


      setWorkOrders(
        mappedWorkOrders
      );

    } catch (error) {

      console.error(
        "Failed to load customer work orders:",
        error
      );

      toast.error(
        "Failed to load your work orders."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==========================================================
  // LOAD WHEN USER IS AVAILABLE
  // ==========================================================

  useEffect(() => {

    if (user?.email) {

      loadWorkOrders();
    }

  }, [user?.email]);


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
      // Currently update UI.
      // Backend UPDATE API will be connected separately.
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
      // New order was created in backend
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
    // Backend cancellation will be connected separately.

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