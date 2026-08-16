import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import StatsGrid from "@/components/dashboard/shared/StatsGrid";
import QuickActions from "@/components/dashboard/shared/QuickActions";

import { Button } from "@/components/ui/button";

import { customerQuickActions } from "@/data/dashboard/customerQuickActions";

import ServiceRequestCards from "@/components/dashboard/customer/ServiceRequestCards";
import RecentWorkOrders from "@/components/dashboard/customer/RecentWorkOrders";
import RecentActivity from "@/components/dashboard/customer/RecentActivity";
import SupportCenter from "@/components/dashboard/customer/SupportCenter";

import UpcomingSchedule from "@/components/dashboard/customer/UpcomingSchedule";

import WorkOrderDetailsDrawer from "@/components/dashboard/customer/WorkOrders/WorkOrderDetailsDrawer";

import { workOrderService } from "@/services/workOrderService";

import type {
  WorkOrderResponse,
} from "@/types/workOrder";
import StatsCard from "@/components/dashboard/shared/StatsCard";
import { CheckCircle2, ClipboardList, Clock, Wrench } from "lucide-react";


// ============================================================
// COMPONENT
// ============================================================

export default function CustomerDashboard() {

  const navigate = useNavigate();


  // ==========================================================
  // WORK ORDERS
  // ==========================================================

  const [workOrders, setWorkOrders] =
    useState<WorkOrderResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [workOrderRefresh, setWorkOrderRefresh] =
    useState(0);


  // ==========================================================
  // SELECTED WORK ORDER
  // ==========================================================

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<WorkOrderResponse | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);


  // ==========================================================
  // QUICK ACTIONS
  // ==========================================================

  const quickActions =
    customerQuickActions(navigate);


  // ==========================================================
  // LOAD WORK ORDERS
  // ==========================================================

  const loadWorkOrders = useCallback(async () => {

    try {

      setLoading(true);

      const response =
        await workOrderService.getMyWorkOrders();

      setWorkOrders(response);

    } catch (error) {

      console.error(
        "Failed to load customer work orders:",
        error
      );

      toast.error(
        "Unable to load your work orders."
      );

    } finally {

      setLoading(false);

    }

  }, []);


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    loadWorkOrders();

  }, [loadWorkOrders, workOrderRefresh]);


  // ==========================================================
  // WORK ORDER SELECT
  // ==========================================================

  const handleWorkOrderSelect = (
    workOrder: WorkOrderResponse
  ) => {

    setSelectedWorkOrder(workOrder);

    setDrawerOpen(true);

  };


  // ==========================================================
  // DASHBOARD STATS
  // ==========================================================

  const totalOrders =
    workOrders.length;

  const newOrders =
    workOrders.filter(
      (order) =>
        order.status === "NEW"
    ).length;

  const inProgressOrders =
    workOrders.filter(
      (order) =>
        order.status === "IN_PROGRESS"
    ).length;

  const completedOrders =
    workOrders.filter(
      (order) =>
        order.status === "COMPLETED" ||
        order.status === "CLOSED"
    ).length;


  // ==========================================================
  // UPCOMING WORK ORDERS
  // ==========================================================

  const upcomingOrders =
    workOrders
      .filter(
        (order) =>
          order.status !== "COMPLETED" &&
          order.status !== "CLOSED" &&
          order.status !== "CANCELLED"
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledDate).getTime() -
          new Date(b.scheduledDate).getTime()
      );


  const nextAppointment =
    upcomingOrders[0] ?? null;


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="space-y-8">


      {/* ====================================================
          WELCOME
          ==================================================== */}

      <WelcomeBanner
        title="Welcome Back 👋"
        subtitle="Manage your service requests, appointments, and technicians from one place."
      />


      {/* ====================================================
          SERVICE REQUEST
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="What service do you need?"
          subtitle="Choose a service to create a new work order."
        />

        <ServiceRequestCards
          onWorkOrderCreated={() => {

            setWorkOrderRefresh(
              (prev) => prev + 1
            );

          }}
        />

      </section>


      {/* ====================================================
          DASHBOARD STATS
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Service Overview"
          subtitle="A quick overview of your service requests."
        />

          <StatsGrid>

          <StatsCard
            title="Total Requests"
            value={totalOrders}
            description="All service requests"
            icon={ClipboardList}
          />

          <StatsCard
            title="New Requests"
            value={newOrders}
            description="Waiting for assignment"
            icon={Clock}
          />

          <StatsCard
            title="In Progress"
            value={inProgressOrders}
            description="Currently being handled"
            icon={Wrench}
          />

          <StatsCard
            title="Completed"
            value={completedOrders}
            description="Successfully completed"
            icon={CheckCircle2}
          />

        </StatsGrid>

      </section>


      {/* ====================================================
          NEXT APPOINTMENT
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Next Appointment"
          subtitle="Your upcoming service visit."
          action={
            <Button
              variant="outline"
              onClick={() =>
                navigate(
                  "/customer/work-orders"
                )
              }
            >
              View Schedule
            </Button>
          }
        />


        {loading ? (

          <div className="rounded-2xl border bg-card p-6">

            <p className="text-sm text-muted-foreground">
              Loading your schedule...
            </p>

          </div>

        ) : nextAppointment ? (

          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Upcoming Service
                </p>

                <h3 className="mt-1 text-xl font-semibold">

                  {nextAppointment.serviceType}

                </h3>

                <p className="mt-2 text-sm text-muted-foreground">

                  {nextAppointment.description}

                </p>

              </div>


              <div className="text-left md:text-right">

                <p className="text-sm text-muted-foreground">
                  Scheduled Date
                </p>

                <p className="mt-1 font-semibold">

                  {nextAppointment.scheduledDate}

                </p>

                <Button
                  className="mt-3"
                  size="sm"
                  onClick={() =>
                    handleWorkOrderSelect(
                      nextAppointment
                    )
                  }
                >
                  View Details
                </Button>

              </div>

            </div>

          </div>

        ) : (

          <div className="rounded-2xl border border-dashed bg-card p-8 text-center">

            <h3 className="font-semibold">
              No upcoming appointments
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              You don't have any scheduled services yet.
            </p>

            <Button
              className="mt-4"
              onClick={() =>
                navigate(
                  "/customer/work-orders"
                )
              }
            >
              Create Service Request
            </Button>

          </div>

        )}

      </section>


      {/* ====================================================
          RECENT WORK ORDERS
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Recent Work Orders"
          subtitle="Track your latest service requests."
          action={
            <Button
              variant="outline"
              onClick={() =>
                navigate(
                  "/customer/work-orders"
                )
              }
            >
              View All
            </Button>
          }
        />


        <RecentWorkOrders
          refreshTrigger={workOrderRefresh}
          onSelect={handleWorkOrderSelect}
        />

      </section>


      {/* ====================================================
          WORK ORDER DETAILS DRAWER
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

          setDrawerOpen(false);

          navigate(
            "/customer/work-orders",
            {
              state: {
                editWorkOrderId:
                  order.id,
              },
            }
          );

        }}


        onCancel={(id) => {

          setDrawerOpen(false);

          navigate(
            "/customer/work-orders",
            {
              state: {
                cancelWorkOrderId:
                  id,
              },
            }
          );

        }}

      />


      {/* ====================================================
          QUICK ACTIONS
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Quick Actions"
          subtitle="Frequently used actions."
        />

        <QuickActions
          actions={quickActions}
        />

      </section>


      {/* ====================================================
          UPCOMING SCHEDULE
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Upcoming Schedule"
          subtitle="Keep track of your upcoming services."
        />

        <UpcomingSchedule />

      </section>


      {/* ====================================================
          RECENT ACTIVITY
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Recent Activity"
          subtitle="Latest updates on your account."
        />

        <RecentActivity />

      </section>


      {/* ====================================================
          SUPPORT
          ==================================================== */}

      <section className="space-y-4">

        <SectionHeader
          title="Support Center"
          subtitle="Need help? Reach out to our support team."
        />

        <SupportCenter />

      </section>

    </div>

  );
}