import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import DispatcherAssignmentToolbar
  from "@/components/dashboard/dispatcher/Assignment/DispatcherAssignmentToolbar";

import DispatcherAssignmentTable
  from "@/components/dashboard/dispatcher/Assignment/DispatcherAssignmentTable";

import DispatcherAssignmentDialog
  from "@/components/dashboard/dispatcher/Assignment/DispatcherAssignmentDialog";

import type {
  DispatcherWorkOrder,
  Technician,
  WorkOrderResponse,
} from "@/types/workOrder";

import { workOrderService }
  from "@/services/workOrderService";

import { getAllTechnicians }
  from "@/services/technicianService";

export default function DispatcherAssignment() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [priority, setPriority] =
    useState("ALL");

  const [workOrders, setWorkOrders] =
    useState<DispatcherWorkOrder[]>([]);

  const [techniciansData, setTechniciansData] =
    useState<Technician[]>([]);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [assignDialogOpen, setAssignDialogOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [assigning, setAssigning] =
    useState(false);

  // ==========================================================
  // MAP BACKEND WORK ORDER
  // ==========================================================

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

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  const loadAssignmentData =
    async () => {

      try {

        setLoading(true);

        console.log(
          "Loading dispatcher work orders..."
        );

        const [
          backendWorkOrders,
          backendTechnicians,
        ] = await Promise.all([

          // GET /api/workorders
          workOrderService.getAllWorkOrders(),

          // GET technicians
          getAllTechnicians(),

        ]);

        console.log(
          "Backend work orders:",
          backendWorkOrders
        );

        console.log(
          "Backend technicians:",
          backendTechnicians
        );

        // ------------------------------------------------------
        // MAP WORK ORDERS
        // ------------------------------------------------------

        const mappedWorkOrders =
          backendWorkOrders.map(
            mapWorkOrder
          );

        setWorkOrders(
          mappedWorkOrders
        );

        // ------------------------------------------------------
        // CALCULATE ACTIVE JOBS
        // ------------------------------------------------------

        const jobCounts:
          Record<number, number> = {};

        backendWorkOrders.forEach(
          (order) => {

            const isFinished =
              order.status === "COMPLETED" ||
              order.status === "CLOSED" ||
              order.status === "CANCELLED";

            if (
              order.technicianId !== null &&
              !isFinished
            ) {

              jobCounts[
                order.technicianId
              ] =
                (
                  jobCounts[
                    order.technicianId
                  ] || 0
                ) + 1;
            }

          }
        );

        // ------------------------------------------------------
        // MAP TECHNICIANS
        // ------------------------------------------------------

        const mappedTechnicians =
          backendTechnicians.map(
            (technician) => ({

              ...technician,

              currentJobs:
                jobCounts[
                  technician.id
                ] ?? 0,

            })
          );

        setTechniciansData(
          mappedTechnicians
        );

      } catch (error) {

        console.error(
          "Failed to load assignment data:",
          error
        );

        toast.error(
          "Failed to load work orders and technicians."
        );

      } finally {

        setLoading(false);

      }
    };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    loadAssignmentData();

  }, []);

  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredWorkOrders =
    useMemo(() => {

      const keyword =
        search
          .toLowerCase()
          .trim();

      return workOrders.filter(
        (order) => {

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

            order.service
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
        }
      );

    }, [
      workOrders,
      search,
      status,
      priority,
    ]);

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const totalOrders =
    workOrders.length;

  const unassignedOrders =
    workOrders.filter(
      (order) =>
        order.technician ===
        "Unassigned"
    ).length;

  const assignedOrders =
    totalOrders -
    unassignedOrders;

  // ==========================================================
  // OPEN ASSIGNMENT DIALOG
  // ==========================================================

  const handleOpenAssignment =
    (
      order: DispatcherWorkOrder
    ) => {

      console.log(
        "Opening assignment:",
        order
      );

      setSelectedWorkOrder(
        order
      );

      setAssignDialogOpen(
        true
      );
    };

  // ==========================================================
  // ASSIGN TECHNICIAN
  // ==========================================================

  const handleAssign =
    async (
      technician: Technician
    ) => {

      if (
        !selectedWorkOrder
      ) {
        return;
      }

      try {

        setAssigning(true);

        const workOrderId =
          Number(
            selectedWorkOrder.id
          );

        const technicianName =
          `${technician.firstName} ${technician.lastName}`;

        console.log(
          "Assigning technician:",
          {
            workOrderId,
            technicianId:
              technician.id,
            technicianName,
          }
        );

        // ----------------------------------------------------
        // REAL BACKEND API
        //
        // PATCH
        // /api/workorders/{id}/assign
        // ----------------------------------------------------

        const updatedOrder =
          await workOrderService.assignTechnician(
            workOrderId,
            {
              technicianId:
                technician.id,

              remarks:
                `Assigned to ${technicianName}`,
            }
          );

        console.log(
          "Assignment response:",
          updatedOrder
        );

        // ----------------------------------------------------
        // UPDATE WORK ORDER
        // ----------------------------------------------------

        const mappedOrder =
          mapWorkOrder(
            updatedOrder
          );

        setWorkOrders(
          (previousOrders) =>
            previousOrders.map(
              (order) =>
                order.id ===
                selectedWorkOrder.id
                  ? mappedOrder
                  : order
            )
        );

        // ----------------------------------------------------
        // UPDATE TECHNICIAN JOB COUNT
        // ----------------------------------------------------

        setTechniciansData(
          (previousTechnicians) =>
            previousTechnicians.map(
              (tech) => {

                if (
                  tech.id ===
                  technician.id
                ) {

                  return {
                    ...tech,

                    currentJobs:
                      (tech.currentJobs ?? 0) +
                      1,
                  };
                }

                return tech;
              }
            )
        );

        // ----------------------------------------------------
        // CLOSE DIALOG
        // ----------------------------------------------------

        setAssignDialogOpen(
          false
        );

        setSelectedWorkOrder(
          null
        );

        toast.success(
          `Work order assigned to ${technicianName}.`
        );

      } catch (error) {

        console.error(
          "Failed to assign technician:",
          error
        );

        toast.error(
          "Failed to assign technician."
        );

      } finally {

        setAssigning(false);

      }
    };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <div className="space-y-6">

        <SectionHeader
          title="Assignment"
          subtitle="Assign and manage technicians for work orders."
        />

        <div className="rounded-lg border bg-card p-8 text-center">

          <p className="text-muted-foreground">
            Loading work orders and technicians...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="space-y-6">

      <SectionHeader
        title="Assignment"
        subtitle="Assign and manage technicians for work orders."
      />

      {/* ======================================================
          STATISTICS
      ====================================================== */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-lg border bg-card p-5">

          <p className="text-sm text-muted-foreground">
            Total Work Orders
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalOrders}
          </p>

        </div>

        <div className="rounded-lg border bg-card p-5">

          <p className="text-sm text-muted-foreground">
            Unassigned
          </p>

          <p className="mt-2 text-3xl font-bold">
            {unassignedOrders}
          </p>

        </div>

        <div className="rounded-lg border bg-card p-5">

          <p className="text-sm text-muted-foreground">
            Assigned
          </p>

          <p className="mt-2 text-3xl font-bold">
            {assignedOrders}
          </p>

        </div>

      </div>

      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <DispatcherAssignmentToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
      />

      {/* ======================================================
          TABLE
      ====================================================== */}

      <DispatcherAssignmentTable
        workOrders={
          filteredWorkOrders
        }
        onAssign={
          handleOpenAssignment
        }
      />

      {/* ======================================================
          DIALOG
      ====================================================== */}

      <DispatcherAssignmentDialog
        open={assignDialogOpen}
        onOpenChange={
          setAssignDialogOpen
        }
        workOrder={
          selectedWorkOrder
        }
        technicians={
          techniciansData
        }
        onAssign={
          handleAssign
        }
        assigning={
          assigning
        }
      />

    </div>
  );
}