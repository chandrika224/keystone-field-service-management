import { useMemo, useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import DispatcherAssignmentToolbar from "@/components/dashboard/dispatcher/Assignment/DispatcherAssignmentToolbar";
import DispatcherAssignmentTable from "@/components/dashboard/dispatcher/Assignment/DispatcherAssignmentTable";
import DispatcherAssignmentDialog from "@/components/dashboard/dispatcher/Assignment/DispatcherAssignmentDialog";

import type {
  DispatcherWorkOrder,
  Technician,
} from "@/types/workOrder";

import { dispatcherWorkOrders } from "@/data/dispatcher/workOrders";
import { technicians } from "@/data/dispatcher/technicians";

export default function DispatcherAssignment() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [workOrders, setWorkOrders] =
    useState<DispatcherWorkOrder[]>(dispatcherWorkOrders);

  const [techniciansData, setTechniciansData] =
    useState<Technician[]>(technicians);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [assignDialogOpen, setAssignDialogOpen] =
    useState(false);

  const filteredWorkOrders = useMemo(() => {
    return workOrders.filter((order) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.service.toLowerCase().includes(searchValue) ||
        order.technician.toLowerCase().includes(searchValue);

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
  }, [workOrders, search, status, priority]);

  const totalOrders = workOrders.length;

  const unassignedOrders = workOrders.filter(
    (order) => order.technician === "Unassigned"
  ).length;

  const assignedOrders = workOrders.filter(
    (order) => order.technician !== "Unassigned"
  ).length;

  const handleOpenAssignment = (
    order: DispatcherWorkOrder
  ) => {
    setSelectedWorkOrder(order);
    setAssignDialogOpen(true);
  };

  const handleAssign = (technician: Technician) => {
    if (!selectedWorkOrder) return;

    const previousTechnicianName =
      selectedWorkOrder.technician;

    const updatedOrder: DispatcherWorkOrder = {
      ...selectedWorkOrder,
      technician: technician.name,
      status: "ASSIGNED",
    };

    setWorkOrders((prev) =>
      prev.map((order) =>
        order.id === updatedOrder.id
          ? updatedOrder
          : order
      )
    );

    /*
     * Update mock technician active-job counts.
     *
     * We are NOT changing technician availability here.
     * Availability belongs to the technician.
     */
    setTechniciansData((prev) =>
      prev.map((tech) => {
        // New technician gets one additional job
        if (tech.id === technician.id) {
          return {
            ...tech,
            currentJobs: tech.currentJobs + 1,
          };
        }

        // If this was a reassignment,
        // remove the job from the old technician.
        if (
          previousTechnicianName !== "Unassigned" &&
          tech.name === previousTechnicianName
        ) {
          return {
            ...tech,
            currentJobs: Math.max(
              0,
              tech.currentJobs - 1
            ),
          };
        }

        return tech;
      })
    );

    setAssignDialogOpen(false);
    setSelectedWorkOrder(null);

    if (previousTechnicianName === "Unassigned") {
      toast.success(
        `Work order assigned to ${technician.name}.`
      );
    } else {
      toast.success(
        `Work order reassigned to ${technician.name}.`
      );
    }
  };

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Assignment"
        subtitle="Assign and manage technicians for work orders."
      />

      {/* Statistics */}

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

      {/* Toolbar */}

      <DispatcherAssignmentToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
      />

      {/* Table */}

      <DispatcherAssignmentTable
        workOrders={filteredWorkOrders}
        onAssign={handleOpenAssignment}
      />

      {/* Assignment Dialog */}

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