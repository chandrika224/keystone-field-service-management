import { useEffect, useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import DispatcherWorkOrdersToolbar from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrdersToolbar";
import DispatcherWorkOrdersTable from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrdersTable";
import DispatcherWorkOrderDetailsDrawer from "@/components/dashboard/dispatcher/WorkOrders/DispatcherWorkOrderDetailsDrawer";
import DispatcherAssignTechnicianDialog from "@/components/dashboard/dispatcher/WorkOrders/DispatcherAssignTechnicianDialog";

import { workOrderService } from "@/services/workOrderService";

import type { DispatcherWorkOrder } from "@/types/workOrder";

export default function DispatcherWorkOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [workOrders, setWorkOrders] =
    useState<DispatcherWorkOrder[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<DispatcherWorkOrder | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [assignDialogOpen, setAssignDialogOpen] =
    useState(false);

  const [workOrderToAssign, setWorkOrderToAssign] =
    useState<DispatcherWorkOrder | null>(null);


  // ============================================================
  // FETCH ALL WORK ORDERS
  // GET /api/workorders
  // ============================================================

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching all work orders...");

        const data =
          await workOrderService.getAllWorkOrders();

        console.log(
          "Work orders received:",
          data
        );

        // Backend response already matches
        // DispatcherWorkOrder
        setWorkOrders(data);

      } catch (err) {
        console.error(
          "Failed to fetch work orders:",
          err
        );

        setError(
          "Failed to load work orders."
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
  // OPEN WORK ORDER DETAILS
  // ============================================================
const handleViewWorkOrder = (
  order: DispatcherWorkOrder
) => {
  console.log("========== VIEW WORK ORDER ==========");

  console.log("Full order:", order);

  console.log(
    "ID:",
    order.id
  );

  console.log(
    "ID type:",
    typeof order.id
  );

  console.log(
    "Title:",
    order.title
  );

  console.log(
    "Customer:",
    order.customerName
  );

  console.log(
    "Technician:",
    order.technicianName
  );

  console.log("====================================");

  setSelectedWorkOrder(order);
  setDrawerOpen(true);
};

  // ============================================================
  // OPEN ASSIGN TECHNICIAN DIALOG
  // ============================================================

  const handleAssignWorkOrder = (
    order: DispatcherWorkOrder
  ) => {
    console.log(
      "Assign technician clicked:",
      order
    );

    setWorkOrderToAssign(order);
    setAssignDialogOpen(true);
  };


  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="space-y-6">

        <SectionHeader
          title="Dispatcher Work Orders"
          subtitle="Manage and assign incoming service requests."
        />

        <div className="flex items-center justify-center py-12">

          <p className="text-muted-foreground">
            Loading work orders...
          </p>

        </div>

      </div>
    );
  }


  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error) {
    return (
      <div className="space-y-6">

        <SectionHeader
          title="Dispatcher Work Orders"
          subtitle="Manage and assign incoming service requests."
        />

        <div className="rounded-lg border p-6 text-center">

          <p className="text-destructive">
            {error}
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
        title="Dispatcher Work Orders"
        subtitle="Manage and assign incoming service requests."
      />


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
          WORK ORDERS TABLE
      ======================================================== */}

      <DispatcherWorkOrdersTable
        workOrders={workOrders}
        search={search}
        status={status}
        priority={priority}
        onView={handleViewWorkOrder}
      />


      {/* ========================================================
          WORK ORDER DETAILS DRAWER
      ======================================================== */}

      <DispatcherWorkOrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        workOrder={selectedWorkOrder}
        onAssign={handleAssignWorkOrder}
      />


      {/* ========================================================
          ASSIGN TECHNICIAN DIALOG
      ======================================================== */}

      <DispatcherAssignTechnicianDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}

        onAssign={(technician) => {

          if (!workOrderToAssign) {
            return;
          }

          console.log(
            "Technician selected:",
            technician
          );

          /*
           * TEMPORARY FRONTEND UPDATE
           *
           * We are updating the UI only here.
           * The backend assignment API should be
           * connected separately.
           */

          const updatedOrder: DispatcherWorkOrder = {
            ...workOrderToAssign,

            technicianName:
              typeof technician === "string"
                ? technician
                : technician.name,

            status: "ASSIGNED",
          };


          // Update table

          setWorkOrders((prev) =>
            prev.map((order) =>
              order.id === updatedOrder.id
                ? updatedOrder
                : order
            )
          );


          // Update currently selected order

          setSelectedWorkOrder(
            updatedOrder
          );


          // Close dialog

          setWorkOrderToAssign(null);

          setAssignDialogOpen(false);


          toast.success(
            "Technician assigned successfully."
          );

        }}
      />

    </div>
  );
}