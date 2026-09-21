import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianAssignedJobsToolbar
  from "@/components/dashboard/technician/AssignedJobs/TechnicianAssignedJobsToolbar";

import TechnicianAssignedJobsTable
  from "@/components/dashboard/technician/AssignedJobs/TechnicianAssignedJobsTable";

import TechnicianJobDetailsDrawer
  from "@/components/dashboard/technician/AssignedJobs/TechnicianJobDetailsDrawer";

import { workOrderService } from "@/services/workOrderService";

import type { TechnicianWorkOrder } from "@/types/workOrder";

export default function AssignedJobs() {
  const { user, loading: authLoading } = useAuth();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [jobs, setJobs] =
    useState<TechnicianWorkOrder[]>([]);

  const [selectedJob, setSelectedJob] =
    useState<TechnicianWorkOrder | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchAssignedJobs = async () => {
      /*
       * Wait for AuthContext to finish
       * initializing the current session.
       */
      if (authLoading) {
        return;
      }

      /*
       * No logged-in user.
       */
      if (!user) {
        setError("User session not found.");
        setLoading(false);
        return;
      }

      /*
       * This page is only for technicians.
       */
      if (user.role !== "TECHNICIAN") {
        setError("Invalid technician session.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        /*
         * Get the email directly from
         * the authenticated user.
         *
         * Example:
         * Technician_alex@gmail.com
         */
        const email = user.email;

        console.log(
          "Loading assigned jobs for:",
          email
        );

        const data =
          await workOrderService.getAssignedWorkOrders(
            email
          );

        console.log(
          "Assigned jobs:",
          data
        );

        setJobs(data);
      } catch (error) {
        console.error(
          "Failed to load assigned jobs:",
          error
        );

        setError(
          "Failed to load assigned jobs."
        );

        toast.error(
          "Failed to load assigned jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedJobs();
  }, [user, authLoading]);

  /*
   * Temporary local status update.
   *
   * We will replace this with the actual
   * backend lifecycle API when we integrate it.
   */
const handleStartJob = async (
  job: TechnicianWorkOrder
) => {
  if (!user) {
    toast.error("User session not found.");
    return;
  }

  try {
    const updatedJob =
      await workOrderService.startWorkOrder(
        job.id,
        user.email
      );

    console.log("Started work order:", updatedJob);

    setJobs((prevJobs) =>
      prevJobs.map((existingJob) =>
        existingJob.id === updatedJob.id
          ? updatedJob
          : existingJob
      )
    );

    setSelectedJob(updatedJob);

    toast.success(
      `Work order #${updatedJob.id} started successfully.`
    );
  } catch (error) {
    console.error(
      "Failed to start work order:",
      error
    );

    toast.error(
      "Failed to start work order."
    );
  }
};

const handleHoldJob = async (
  job: TechnicianWorkOrder
) => {
  if (!user) {
    toast.error("User session not found.");
    return;
  }

  try {
    const updatedJob =
      await workOrderService.holdWorkOrder(
        job.id,
        user.email
      );

    console.log("Held work order:", updatedJob);

    setJobs((prevJobs) =>
      prevJobs.map((existingJob) =>
        existingJob.id === updatedJob.id
          ? updatedJob
          : existingJob
      )
    );

    setSelectedJob(updatedJob);

    toast.success(
      `Work order #${updatedJob.id} put on hold.`
    );
  } catch (error) {
    console.error(
      "Failed to hold work order:",
      error
    );

    toast.error(
      "Failed to put work order on hold."
    );
  }
};

const handleResumeJob = async (
  job: TechnicianWorkOrder
) => {
  if (!user) {
    toast.error("User session not found.");
    return;
  }

  try {
    const updatedJob =
      await workOrderService.resumeWorkOrder(
        job.id,
        user.email
      );

    console.log("Resumed work order:", updatedJob);

    setJobs((prevJobs) =>
      prevJobs.map((existingJob) =>
        existingJob.id === updatedJob.id
          ? updatedJob
          : existingJob
      )
    );

    setSelectedJob(updatedJob);

    toast.success(
      `Work order #${updatedJob.id} resumed.`
    );
  } catch (error) {
    console.error(
      "Failed to resume work order:",
      error
    );

    toast.error(
      "Failed to resume work order."
    );
  }
};

const handleCompleteJob = async (
  job: TechnicianWorkOrder
) => {
  if (!user) {
    toast.error("User session not found.");
    return;
  }

  try {
    const updatedJob =
      await workOrderService.completeWorkOrder(
        job.id,
        user.email
      );

    console.log(
      "Completed work order:",
      updatedJob
    );

    setJobs((prevJobs) =>
      prevJobs.map((existingJob) =>
        existingJob.id === updatedJob.id
          ? updatedJob
          : existingJob
      )
    );

    setSelectedJob(updatedJob);

    toast.success(
      `Work order #${updatedJob.id} completed successfully.`
    );
  } catch (error) {
    console.error(
      "Failed to complete work order:",
      error
    );

    toast.error(
      "Failed to complete work order."
    );
  }
};

const handleCancelJob = async (
  job: TechnicianWorkOrder
) => {
  if (!user) {
    toast.error("User session not found.");
    return;
  }

  try {
    const updatedJob =
      await workOrderService.cancelWorkOrder(
        job.id,
        user.email
      );

    console.log(
      "Cancelled work order:",
      updatedJob
    );

    setJobs((prevJobs) =>
      prevJobs.map((existingJob) =>
        existingJob.id === updatedJob.id
          ? updatedJob
          : existingJob
      )
    );

    setSelectedJob(updatedJob);

    toast.success(
      `Work order #${updatedJob.id} cancelled successfully.`
    );
  } catch (error) {
    console.error(
      "Failed to cancel work order:",
      error
    );

    toast.error(
      "Failed to cancel work order."
    );
  }
};

 const handleAcceptJob = async (
  job: TechnicianWorkOrder
) => {
  if (!user) {
    toast.error("User session not found.");
    return;
  }

  console.log("WORK ORDER SERVICE:", workOrderService);
  console.log(
    "ACCEPT METHOD:",
    workOrderService.acceptWorkOrder
  );

  try {
    const updatedJob =
      await workOrderService.acceptWorkOrder(
        job.id,
        user.email
      );

    console.log(
      "Accepted work order:",
      updatedJob
    );

    setJobs((prevJobs) =>
      prevJobs.map((existingJob) =>
        existingJob.id === updatedJob.id
          ? updatedJob
          : existingJob
      )
    );

    setSelectedJob(updatedJob);

    toast.success(
      `Work order #${updatedJob.id} accepted successfully.`
    );
  } catch (error) {
    console.error(
      "Failed to accept work order:",
      error
    );

    toast.error(
      "Failed to accept work order."
    );
  }
};



  return (
    <div className="space-y-6">

      <SectionHeader
        title="Assigned Jobs"
        subtitle="View and manage your assigned service jobs."
      />

      <TechnicianAssignedJobsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {authLoading ? (
        <div className="py-10 text-center text-muted-foreground">
          Loading user session...
        </div>
      ) : loading ? (
        <div className="py-10 text-center text-muted-foreground">
          Loading assigned jobs...
        </div>
      ) : error ? (
        <div className="py-10 text-center text-destructive">
          {error}
        </div>
      ) : (
        <TechnicianAssignedJobsTable
          jobs={jobs}
          search={search}
          status={status}
          onView={(job) => {
            console.log(
              "Parent received job:",
              job
            );

            setSelectedJob(job);
            setDrawerOpen(true);
          }}
        />
      )}

      <TechnicianJobDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        job={selectedJob}
        onAcceptJob={handleAcceptJob}
        onStartJob={handleStartJob}
        onHoldJob={handleHoldJob}
        onResumeJob={handleResumeJob}
        onCompleteJob={handleCompleteJob}
        onCancelJob={handleCancelJob}
      />

    </div>
  );
}