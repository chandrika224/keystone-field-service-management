import { ClipboardList, UserCheck, Users, Clock3 } from "lucide-react";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function DispatcherDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeader
        title="Dispatcher Dashboard"
        subtitle="Monitor work orders, technician assignments, and today's field operations."
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Open Work Orders */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Open Work Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  24
                </h2>

                <p className="mt-1 text-sm text-green-600">
                  +12% this week
                </p>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unassigned Jobs */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Unassigned Jobs
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  6
                </h2>

                <p className="mt-1 text-sm text-orange-600">
                  Needs attention
                </p>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Clock3 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Jobs */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Assigned Jobs
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  18
                </h2>

                <p className="mt-1 text-sm text-blue-600">
                  12 technicians assigned
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Technicians */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Available Technicians
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  12
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  4 currently on jobs
                </p>
              </div>

              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Dashboard Area */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Today's Schedule
                </h2>

                <p className="text-sm text-muted-foreground">
                  Overview of today's assigned jobs
                </p>
              </div>

              <Link
                to="/dispatcher/work-orders"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">

              <ScheduleItem
                time="10:00 AM"
                title="Equipment Maintenance"
                location="Bengaluru"
                technician="Rahul Sharma"
                status="Active"
              />

              <ScheduleItem
                time="11:30 AM"
                title="HVAC Inspection"
                location="Whitefield"
                technician="Priya Patil"
                status="Scheduled"
              />

              <ScheduleItem
                time="1:00 PM"
                title="Generator Service"
                location="Electronic City"
                technician="Amit Kumar"
                status="Pending"
              />

              <ScheduleItem
                time="3:30 PM"
                title="Electrical Inspection"
                location="Koramangala"
                technician="Sneha Rao"
                status="Scheduled"
              />

            </div>
          </CardContent>
        </Card>

        {/* Technician Status */}
        <Card>
          <CardContent className="p-6">

            <div>
              <h2 className="text-lg font-semibold">
                Technician Status
              </h2>

              <p className="text-sm text-muted-foreground">
                Current availability
              </p>
            </div>

            <div className="mt-6 space-y-5">

              <StatusItem
                label="Available"
                count={8}
                indicator="bg-green-500"
              />

              <StatusItem
                label="On Job"
                count={4}
                indicator="bg-blue-500"
              />

              <StatusItem
                label="Offline"
                count={2}
                indicator="bg-gray-400"
              />

            </div>

            <div className="mt-6 border-t pt-4">
              <button className="text-sm font-medium text-blue-600 hover:underline">
                <Link
                  to="/dispatcher/technicians"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View technicians
                </Link>
              </button>
            </div>

          </CardContent>
        </Card>

      </div>

      {/* Work Order Overview */}
      <Card>
        <CardContent className="p-6">

          <div>
            <h2 className="text-lg font-semibold">
              Work Order Overview
            </h2>

            <p className="text-sm text-muted-foreground">
              Current status of all work orders
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <WorkOrderStatus
              label="Pending"
              count={8}
            />

            <WorkOrderStatus
              label="Assigned"
              count={12}
            />

            <WorkOrderStatus
              label="In Progress"
              count={6}
            />

            <WorkOrderStatus
              label="Completed"
              count={21}
            />

          </div>

        </CardContent>
      </Card>

      {/* Quick Actions */}
      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">

          <div>
            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>

            <p className="text-sm text-muted-foreground">
              Common dispatcher actions
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">

            <Link
              to="/dispatcher/work-orders"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              + Create Work Order
            </Link>

            <Link
              to="/dispatcher/assignments"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Assign Technician
            </Link>

            <Link
              to="/dispatcher/work-orders"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              View Work Orders
            </Link>

            <Link
              to="/dispatcher/customers"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              View Customers
            </Link>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}


/* ---------------- Schedule Item ---------------- */

function ScheduleItem({
  time,
  title,
  location,
  technician,
  status,
}: {
  time: string;
  title: string;
  location: string;
  technician: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border p-4">

      <div className="min-w-[75px] text-sm font-medium">
        {time}
      </div>

      <div className="h-10 w-10 rounded-lg bg-blue-100" />

      <div className="flex-1">
        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-muted-foreground">
          {location} • {technician}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          status === "Active"
            ? "bg-green-100 text-green-700"
            : status === "Pending"
              ? "bg-orange-100 text-orange-700"
              : "bg-blue-100 text-blue-700"
        }`}
      >
        {status}
      </span>

    </div>
  );
}


/* ---------------- Technician Status ---------------- */

function StatusItem({
  label,
  count,
  indicator,
}: {
  label: string;
  count: number;
  indicator: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${indicator}`}
        />

        <span className="text-sm">
          {label}
        </span>
      </div>

      <span className="font-semibold">
        {count}
      </span>

    </div>
  );
}


/* ---------------- Work Order Status ---------------- */

function WorkOrderStatus({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="rounded-xl border bg-muted/30 p-5">

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {count}
      </p>

    </div>
  );
}