import { useEffect, useMemo, useState } from "react";
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
} from "@/types/workOrder";

import { workOrderService } from "@/services/workOrderService";

export default function DispatcherAssignment() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [workOrders, setWorkOrders] =
    useState<DispatcherWorkOrder[]>([]);

  const [techniciansData, setTechniciansData] =
    useState<Technician[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [assignDialogOpen, setAssignDialogOpen] =
    useState(false);


  // ============================================================
  // FETCH WORK ORDERS
  // ============================================================

  useEffect(() => {

    const fetchWorkOrders = async () => {

      try {

        setLoading(true);

        console.log(
          "Fetching work orders for assignment page..."
        );

        const data =
          await workOrderService.getAllWorkOrders();

        console.log(
          "Assignment work orders:",
          data
        );

        setWorkOrders(data);

      } catch (error) {

        console.error(
          "Failed to fetch assignment work orders:",
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
  // FILTER WORK ORDERS
  // ============================================================

  const filteredWorkOrders = useMemo(() => {

    return workOrders.filter((order) => {

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        String(order.id)
          .toLowerCase()
          .includes(searchValue) ||

        (order.customerName ?? "")
          .toLowerCase()
          .includes(searchValue) ||

        order.title
          .toLowerCase()
          .includes(searchValue) ||

        (order.technicianName ?? "")
          .toLowerCase()
          .includes(searchValue);

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
        !order.technicianName ||
        order.technicianName === "Unassigned"
    ).length;

  const assignedOrders =
    totalOrders - unassignedOrders;


  // ============================================================
  // OPEN ASSIGNMENT DIALOG
  // ============================================================

  const handleOpenAssignment = (
    order: DispatcherWorkOrder
  ) => {

    console.log(
      "Opening assignment for:",
      order
    );

    setSelectedWorkOrder(order);

    setAssignDialogOpen(true);

  };


  // ============================================================
  // ASSIGN TECHNICIAN
  // ============================================================

  const handleAssign = async (
    technician: Technician
  ) => {

    if (!selectedWorkOrder) {
      return;
    }

    try {

      console.log(
        "Assigning technician:",
        technician
      );

      console.log(
        "Work order ID:",
        selectedWorkOrder.id
      );


      /*
       * IMPORTANT:
       *
       * Call your existing backend assignment API here.
       *
       * Example:
       *
       * await workOrderService.assignTechnician(
       *   selectedWorkOrder.id,
       *   Number(technician.id)
       * );
       */


      // --------------------------------------------------------
      // TEMPORARY UI UPDATE
      // --------------------------------------------------------

      const updatedOrder: DispatcherWorkOrder = {

        ...selectedWorkOrder,

        technicianName:
          technician.name,

        status: "ASSIGNED",

      };


      setWorkOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id
            ? updatedOrder
            : order
        )
      );


      setAssignDialogOpen(false);

      setSelectedWorkOrder(null);


      toast.success(
        `Work order assigned to ${technician.name}.`
      );

    } catch (error) {

      console.error(
        "Failed to assign technician:",
        error
      );

      toast.error(
        "Failed to assign technician."
      );

    }

  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <div className="space-y-6">

        <SectionHeader
          title="Assignment"
          subtitle="Assign and manage technicians for work orders."
        />

        <div className="flex justify-center py-12">

          <p className="text-muted-foreground">
            Loading work orders...
          </p>

        </div>

      </div>
    );

  }


  // ============================================================
  // UI
  // ============================================================

  return (

    <div className="space-y-6">

      <SectionHeader
        title="Assignment"
        subtitle="Assign and manage technicians for work orders."
      />


      {/* ========================================================
          STATISTICS
      ======================================================== */}

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


      {/* ========================================================
          TOOLBAR
      ======================================================== */}

      <DispatcherAssignmentToolbar

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

      <DispatcherAssignmentTable

        workOrders={filteredWorkOrders}

        onAssign={handleOpenAssignment}

      />


      {/* ========================================================
          ASSIGNMENT DIALOG
      ======================================================== */}

      <DispatcherAssignmentDialog

        open={assignDialogOpen}

        onOpenChange={setAssignDialogOpen}

        workOrder={selectedWorkOrder}

        technicians={techniciansData}

        onAssign={handleAssign}

      />

    </div>

  );

}