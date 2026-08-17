import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ManagerDashboardStats from "@/components/dashboard/manager/ManagerDashboardStats";
import ManagerRecentWorkOrders from "@/components/dashboard/manager/ManagerRecentWorkOrders";
import ManagerTechnicianOverview from "@/components/dashboard/manager/ManagerTechnicianOverview";

import type { Technician, DispatcherWorkOrder, WorkOrderResponse } from "@/types/workOrder";
import { workOrderService } from "@/services/workOrderService";
import { getAllTechnicians } from "@/services/technicianService";

export default function ManagerDashboard() {
  const [workOrders, setWorkOrders] = useState<DispatcherWorkOrder[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper mapper function to transform backend responses into UI-compatible structures
  const mapWorkOrder = useCallback((order: WorkOrderResponse): DispatcherWorkOrder => {
    return {
      id: String(order.id),
      title: order.title,
      customer: order.customerName || "N/A",
      service: order.serviceType,
      priority: order.priority,
      status: order.status,
      technician: order.technicianName || "Unassigned",
    };
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const [ordersRes, techsRes] = await Promise.all([
        workOrderService.getMyWorkOrders(),
        getAllTechnicians(),
      ]);

      // Map work orders for table rendering
      const mappedOrders = ordersRes.map(mapWorkOrder);
      setWorkOrders(mappedOrders);

      // Compute active/ongoing jobs per technician
      const activeJobCounts: Record<number, number> = {};
      ordersRes.forEach((order) => {
        const isActive = order.status !== "COMPLETED" && order.status !== "CANCELLED";
        if (order.technicianId && isActive) {
          activeJobCounts[order.technicianId] = (activeJobCounts[order.technicianId] || 0) + 1;
        }
      });

      // Attach active job count to technician list
      const enrichedTechnicians = techsRes.map((tech) => ({
        ...tech,
        currentJobs: activeJobCounts[tech.id] ?? 0,
      }));

      setTechnicians(enrichedTechnicians);
    } catch (error) {
      console.error("Failed to load manager dashboard data:", error);
      toast.error("Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [mapWorkOrder]);

  useEffect(() => {
    let isMounted = true;

    fetchDashboardData().then(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, [fetchDashboardData]);

  // Derived dashboard metrics calculated dynamically
  const totalWorkOrders = workOrders.length;
  const activeJobs = workOrders.filter(
    (o) => o.status === "ASSIGNED" || o.status === "IN_PROGRESS"
  ).length;
  const completedJobs = workOrders.filter((o) => o.status === "COMPLETED").length;
  const availableTechnicians = technicians.filter(
    (t) => (t.currentJobs ?? 0) === 0
  ).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="Manager Dashboard"
          subtitle="Monitor field service operations and team performance."
        />
        <div className="flex h-64 items-center justify-center rounded-lg border bg-card text-muted-foreground">
          <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
          <span>Loading operations data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Manager Dashboard"
        subtitle="Monitor field service operations and team performance."
      />

      <ManagerDashboardStats
        totalWorkOrders={totalWorkOrders}
        activeJobs={activeJobs}
        completedJobs={completedJobs}
        availableTechnicians={availableTechnicians}
      />

      <ManagerRecentWorkOrders
        workOrders={workOrders}
        onView={(workOrder) => {
          console.log("Manager viewed work order:", workOrder);
        }}
      />

      <ManagerTechnicianOverview technicians={technicians} />
    </div>
  );
}