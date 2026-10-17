
import { useEffect, useState } from "react";

import ManagerDashboardStats
  from "@/components/dashboard/manager/ManagerDashboardStats";
import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";
import ManagerRecentWorkOrders
  from "@/components/dashboard/manager/ManagerRecentWorkOrders";
import ManagerTechnicianOverview
  from "@/components/dashboard/manager/ManagerTechnicianOverview";

import { workOrderService } from "@/services/workOrderService";
import { technicianService } from "@/services/technicianService";

import type { DispatcherWorkOrder } from "@/types/workOrder";
import type { Technician as ApiTechnician } from "@/types/technician";

interface ManagerStats {
  totalWorkOrders: number;
  activeJobs: number;
  completedJobs: number;
  availableTechnicians: number;
}

interface ManagerTechnician {
  id: number;
  name: string;
  specialization: string;
  status: "Available" | "Busy";
  currentJobs: number;
}

const initialStats: ManagerStats = {
  totalWorkOrders: 0,
  activeJobs: 0,
  completedJobs: 0,
  availableTechnicians: 0,
};

export default function ManagerDashboard() {
  const [stats, setStats] = useState<ManagerStats>(initialStats);
  const [workOrders, setWorkOrders] = useState<DispatcherWorkOrder[]>([]);
  const [technicians, setTechnicians] = useState<ApiTechnician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadManagerDashboard() {
      try {
        setLoading(true);
        setError("");

        const [fetchedWorkOrders, fetchedTechnicians] =
          await Promise.all([
            workOrderService.getAllWorkOrders(),
            technicianService.getAllTechnicians(),
          ]);

        if (!isMounted) return;

        setWorkOrders(fetchedWorkOrders);
        setTechnicians(fetchedTechnicians);

        const activeJobs = fetchedWorkOrders.filter(
          (workOrder) =>
            workOrder.status === "IN_PROGRESS" ||
            workOrder.status === "ON_HOLD"
        ).length;

        const completedJobs = fetchedWorkOrders.filter(
          (workOrder) =>
            workOrder.status === "COMPLETED" ||
            workOrder.status === "CLOSED"
        ).length;

        const availableTechnicians = fetchedTechnicians.filter(
          (technician) =>
            technician.active && technician.available
        ).length;

        setStats({
          totalWorkOrders: fetchedWorkOrders.length,
          activeJobs,
          completedJobs,
          availableTechnicians,
        });
      } catch (err) {
        console.error(
          "Failed to load manager dashboard:",
          err
        );

        if (isMounted) {
          setError(
            "Could not load dashboard data. Check the API connection and try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadManagerDashboard();

    return () => {
      isMounted = false;
    };
  }, [retryKey]);

  const managerTechnicians: ManagerTechnician[] = technicians
    .filter((technician) => technician.active)
    .map((technician) => {
      const currentJobs = workOrders.filter(
        (workOrder) =>
          workOrder.technicianId === technician.id &&
          (
            workOrder.status === "IN_PROGRESS" ||
            workOrder.status === "ON_HOLD"
          )
      ).length;

      return {
        id: technician.id,
        name: `${technician.firstName} ${technician.lastName}`,
        specialization: technician.specialization,
        status: technician.available ? "Available" : "Busy",
        currentJobs,
      };
    });

  const recentWorkOrderSummaries = workOrders.map((workOrder) => ({
    id: workOrder.id,
    customer: workOrder.customerName,
    service: workOrder.serviceType ?? "—",
    priority: workOrder.priority,
    status: workOrder.status,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Manager Dashboard"
        subtitle="Monitor field service operations and team performance."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading dashboard statistics...
        </p>
      ) : error ? (
        <div className="rounded-md border border-destructive/30 p-4">
          <p className="text-sm text-destructive">
            {error}
          </p>

          <button
            type="button"
            className="mt-2 text-sm font-medium underline"
            onClick={() => setRetryKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      ) : (
        <ManagerDashboardStats
          totalWorkOrders={stats.totalWorkOrders}
          activeJobs={stats.activeJobs}
          completedJobs={stats.completedJobs}
          availableTechnicians={stats.availableTechnicians}
        />
      )}

      <ManagerRecentWorkOrders
        workOrders={recentWorkOrderSummaries}
      />

      <ManagerTechnicianOverview
        technicians={managerTechnicians}
      />
    </div>
  );
}
