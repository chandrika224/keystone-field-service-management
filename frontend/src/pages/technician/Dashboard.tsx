import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianDashboardStats from "@/components/dashboard/technician/TechnicianDashboardStats";
import TechnicianTodayTasks from "@/components/dashboard/technician/TechnicianTodayTasks";

import { technicianService } from "@/services/technicianService";
import { workOrderService } from "@/services/workOrderService";

import { useAuth } from "@/contexts/AuthContext";

import type { Technician } from "@/types/technician";
import type { TechnicianWorkOrder } from "@/types/workOrder";

export default function TechnicianDashboard() {
  const { user, loading: authLoading } = useAuth();

  const [technician, setTechnician] =
    useState<Technician | null>(null);

  const [jobs, setJobs] =
    useState<TechnicianWorkOrder[]>([]);

  const [loading, setLoading] = useState(true);

  const [availabilityUpdating, setAvailabilityUpdating] =
    useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      /*
       * Wait until AuthContext has finished
       * initializing the authentication state.
       */
      if (authLoading) {
        return;
      }

      /*
       * No logged-in user.
       */
      if (!user) {
        setLoading(false);
        return;
      }

      /*
       * This dashboard is only for technicians.
       */
      if (user.role !== "TECHNICIAN") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        /*
         * Email comes directly from the logged-in
         * user stored in AuthContext.
         *
         * Example:
         * Technician_alex@gmail.com
         */
        const email = user.email;

        console.log(
          "Loading technician dashboard for:",
          email
        );

        const [
          technicianData,
          workOrderData,
        ] = await Promise.all([
          technicianService.getMyTechnician(),

          workOrderService.getAssignedWorkOrders(
            email
          ),
        ]);

        setTechnician(technicianData);

        setJobs(workOrderData);
      } catch (error) {
        console.error(
          "Failed to load technician dashboard:",
          error
        );

        toast.error(
          "Failed to load technician dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user, authLoading]);

  /*
   * Today's date.
   */
  const today =
    new Date().toISOString().split("T")[0];

  /*
   * Jobs scheduled for today.
   */
  const todayJobs = useMemo(() => {
    return jobs.filter(
      (job) => job.scheduledDate === today
    );
  }, [jobs, today]);

  /*
   * Update technician availability.
   */
  const handleAvailabilityChange = async (
    available: boolean
  ) => {
    if (!technician) return;

    try {
      setAvailabilityUpdating(true);

      const updatedTechnician =
        await technicianService.updateMyAvailability(
          available
        );

      setTechnician(updatedTechnician);

      toast.success(
        updatedTechnician.available
          ? "You are now available."
          : "You are now unavailable."
      );
    } catch (error) {
      console.error(
        "Failed to update technician availability:",
        error
      );

      toast.error(
        "Failed to update availability."
      );
    } finally {
      setAvailabilityUpdating(false);
    }
  };

  /*
   * Authentication is still loading.
   */
  if (authLoading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="Technician Dashboard"
          subtitle="Complete your assigned jobs."
        />

        <div className="py-10 text-center text-muted-foreground">
          Loading user session...
        </div>
      </div>
    );
  }

  /*
   * No authenticated user.
   */
  if (!user) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="Technician Dashboard"
          subtitle="Complete your assigned jobs."
        />

        <div className="py-10 text-center text-destructive">
          User session not found.
        </div>
      </div>
    );
  }

  /*
   * Dashboard data is loading.
   */
  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="Technician Dashboard"
          subtitle={`Welcome back, ${user.firstName}.`}
        />

        <div className="py-10 text-center text-muted-foreground">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Technician Dashboard"
        subtitle={
          technician
            ? `Welcome back, ${technician.firstName}.`
            : `Welcome back, ${user.firstName}.`
        }
      />

      {/* =====================================================
          TECHNICIAN AVAILABILITY
          ===================================================== */}

      {technician && (
        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">
                Availability
              </p>

              <p className="text-sm text-muted-foreground">
                {technician.specialization}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={
                    technician.available
                      ? "h-2.5 w-2.5 rounded-full bg-green-500"
                      : "h-2.5 w-2.5 rounded-full bg-muted-foreground"
                  }
                />

                <span className="text-sm font-medium">
                  {technician.available
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              <Button
                variant={
                  technician.available
                    ? "outline"
                    : "default"
                }
                disabled={availabilityUpdating}
                onClick={() =>
                  handleAvailabilityChange(
                    !technician.available
                  )
                }
              >
                {availabilityUpdating
                  ? "Updating..."
                  : technician.available
                    ? "Set Unavailable"
                    : "Set Available"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DASHBOARD STATISTICS
          ===================================================== */}

      <TechnicianDashboardStats
        jobs={jobs}
      />

      {/* =====================================================
          TODAY'S TASKS
          ===================================================== */}

      <TechnicianTodayTasks
        jobs={todayJobs}
        onView={(job) => {
          console.log(
            "Technician job clicked:",
            job
          );
        }}
      />
    </div>
  );
}