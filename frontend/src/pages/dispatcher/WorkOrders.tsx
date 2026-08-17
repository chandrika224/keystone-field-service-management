import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import DispatcherWorkOrdersTable from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrdersTable";

import DispatcherWorkOrdersToolbar from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrdersToolbar";

import DispatcherWorkOrderDetailsDrawer from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrderDetailsDrawer";

import type {
  DispatcherWorkOrder,
  WorkOrderResponse,
} from "@/types/workOrder";

import { workOrderService } from "@/services/workOrderService";

export default function DispatcherWorkOrders() {

  // ============================================================
  // STATE
  // ============================================================

  const [workOrders, setWorkOrders] =
    useState<DispatcherWorkOrder[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [priority, setPriority] =
    useState("ALL");


  // ============================================================
  // WORK ORDER DETAILS STATE
  // ============================================================

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<WorkOrderResponse | null>(null);

  const [detailsDrawerOpen, setDetailsDrawerOpen] =
    useState(false);

  const [detailsLoading, setDetailsLoading] =
    useState(false);


  // ============================================================
  // LOAD ALL WORK ORDERS
  // ============================================================

  useEffect(() => {
    loadWorkOrders();
  }, []);


  const loadWorkOrders = async () => {

    try {

      setLoading(true);

      /*
       * Dispatcher uses:
       *
       * GET /api/workorders
       *
       * NOT:
       *
       * GET /api/workorders/my
       *
       * because /my belongs to the current customer.
       */

      const response =
        await workOrderService.getAllWorkOrders();

      console.log(
        "Dispatcher work orders:",
        response
      );

      const mappedOrders =
        response.map(mapWorkOrder);

      setWorkOrders(mappedOrders);

    } catch (error) {

      console.error(
        "Failed to load dispatcher work orders:",
        error
      );

      toast.error(
        "Failed to load work orders."
      );

    } finally {

      setLoading(false);

    }
  };


  // ============================================================
  // MAP BACKEND RESPONSE
  // ============================================================

  const mapWorkOrder = (
    order: WorkOrderResponse
  ): DispatcherWorkOrder => {

    return {

      id: String(order.id),

      title: order.title,

      customer:
        order.customerName ||
        "Unknown Customer",

      service:
        order.serviceType,

      priority:
        order.priority,

      status:
        order.status,

      technician:
        order.technicianName ||
        "Unassigned",

      scheduledDate:
        order.scheduledDate,

    };
  };


  // ============================================================
  // VIEW WORK ORDER DETAILS
  // ============================================================

  const handleViewWorkOrder = async (
    order: DispatcherWorkOrder
  ) => {

    try {

      setDetailsLoading(true);

      const workOrderId =
        Number(order.id);

      console.log(
        "Loading work order details:",
        workOrderId
      );

      /*
       * Backend API:
       *
       * GET /api/workorders/{id}
       *
       * Example:
       *
       * GET /api/workorders/6
       */

      const response =
        await workOrderService.getWorkOrderById(
          workOrderId
        );

      console.log(
        "Work order details:",
        response
      );

      /*
       * Store the complete backend response.
       *
       * This is WorkOrderResponse,
       * not DispatcherWorkOrder.
       */

      setSelectedWorkOrder(response);

      /*
       * Open drawer after the API succeeds.
       */

      setDetailsDrawerOpen(true);

    } catch (error) {

      console.error(
        "Failed to load work order details:",
        error
      );

      toast.error(
        "Failed to load work order details."
      );

    } finally {

      setDetailsLoading(false);

    }
  };


  // ============================================================
  // FILTER WORK ORDERS
  // ============================================================

  const filteredWorkOrders =
    useMemo(() => {

      return workOrders.filter((order) => {

        const keyword =
          search.toLowerCase().trim();

        const matchesSearch =
          order.id
            .toLowerCase()
            .includes(keyword) ||

          order.title
            .toLowerCase()
            .includes(keyword) ||

          order.customer
            .toLowerCase()
            .includes(keyword) ||

          (order.service ?? "")
            .toLowerCase()
            .includes(keyword) ||

          order.technician
            .toLowerCase()
            .includes(keyword);

        const matchesStatus =
          status === "ALL" ||
          order.status === status;

        const matchesPriority =
          priority === "ALL" ||
          order.priority === priority;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority
        );

      });

    }, [
      workOrders,
      search,
      status,
      priority,
    ]);


  // ============================================================
  // STATISTICS
  // ============================================================

  const totalOrders =
    workOrders.length;

  const unassignedOrders =
    workOrders.filter(
      (order) =>
        order.technician === "Unassigned"
    ).length;

  const assignedOrders =
    workOrders.filter(
      (order) =>
        order.technician !== "Unassigned"
    ).length;


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div className="space-y-6">

        <SectionHeader
          title="Work Orders"
          subtitle="View and manage all work orders."
        />

        <div className="rounded-lg border bg-card p-8 text-center">

          <p className="text-muted-foreground">
            Loading work orders...
          </p>

        </div>

      </div>

    );
  }


  // ============================================================
  // PAGE
  // ============================================================

  return (

    <div className="space-y-6">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <SectionHeader
        title="Work Orders"
        subtitle="View and manage all work orders."
      />


      {/* ========================================================
          STATISTICS
      ======================================================== */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-lg border bg-card p-5">

          <p className="text-sm text-muted-foreground">
            Total Work Orders
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalOrders}
          </p>

        </div>


        {/* UNASSIGNED */}

        <div className="rounded-lg border bg-card p-5">

          <p className="text-sm text-muted-foreground">
            Unassigned
          </p>

          <p className="mt-2 text-3xl font-bold">
            {unassignedOrders}
          </p>

        </div>


        {/* ASSIGNED */}

        <div className="rounded-lg border bg-card p-5">

          <p className="text-sm text-muted-foreground">
            Assigned
          </p>

          <p className="mt-2 text-3xl font-bold">
            {assignedOrders}
          </p>

        </div>

      </div>


      {/* ========================================================
          TOOLBAR
      ======================================================== */}

      <DispatcherWorkOrdersToolbar

        search={search}

        onSearchChange={setSearch}

        status={status}

        onStatusChange={setStatus}

        priority={priority}

        onPriorityChange={setPriority}

      />


      {/* ========================================================
          TABLE
      ======================================================== */}

      <DispatcherWorkOrdersTable

        workOrders={filteredWorkOrders}

        /*
         * IMPORTANT:
         *
         * Do NOT pass search/status/priority here.
         *
         * The filtering is already done above.
         */

        search=""
        status="ALL"
        priority="ALL"

        onView={handleViewWorkOrder}

      />


      {/* ========================================================
          WORK ORDER DETAILS DRAWER
      ======================================================== */}

      <DispatcherWorkOrderDetailsDrawer

        open={detailsDrawerOpen}

        onOpenChange={setDetailsDrawerOpen}

        workOrder={selectedWorkOrder}

      />


      {/* ========================================================
          DETAILS LOADING
      ======================================================== */}

      {detailsLoading && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40">

          <div className="rounded-lg border bg-card px-6 py-4 shadow-lg">

            <p className="text-sm text-muted-foreground">
              Loading work order details...
            </p>

          </div>

        </div>

      )}

    </div>

  );
}