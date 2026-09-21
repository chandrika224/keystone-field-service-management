import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ClipboardList,
  User,
  MapPin,
  Wrench,
  Calendar,
  AlertCircle,
  Clock,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

import type { TechnicianWorkOrder } from "@/types/workOrder";

interface TechnicianJobDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: TechnicianWorkOrder | null;

  onAcceptJob: (job: TechnicianWorkOrder) => void;
  onStartJob: (job: TechnicianWorkOrder) => void;
  onHoldJob: (job: TechnicianWorkOrder) => void;
  onResumeJob: (job: TechnicianWorkOrder) => void;
  onCompleteJob: (job: TechnicianWorkOrder) => void;
  onCancelJob: (job: TechnicianWorkOrder) => void;
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
}

function formatServiceType(serviceType: string | null) {
  if (!serviceType) {
    return "—";
  }

  return serviceType
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function TechnicianJobDetailsDrawer({
  open,
  onOpenChange,
  job,
  onAcceptJob,
  onStartJob,
  onHoldJob,
  onResumeJob,
  onCompleteJob,
  onCancelJob,
}: TechnicianJobDetailsDrawerProps) {
  if (!job) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">

        <SheetHeader>
          <SheetTitle>
            Job Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* =====================================================
              WORK ORDER HEADER
          ===================================================== */}

          <div className="flex items-start gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>

            <div className="min-w-0">

              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              <p className="text-sm text-muted-foreground">
                Work Order #{job.id}
              </p>

            </div>

          </div>


          {/* =====================================================
              STATUS + PRIORITY
          ===================================================== */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Status
              </p>

              <Badge>
                {formatStatus(job.status)}
              </Badge>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Priority
              </p>

              <Badge variant="outline">
                {job.priority}
              </Badge>
            </div>

          </div>


          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <div className="space-y-2">

            <h3 className="font-semibold">
              Description
            </h3>

            <p className="text-sm leading-6 text-muted-foreground">
              {job.description || "No description available."}
            </p>

          </div>


          {/* =====================================================
              CUSTOMER
          ===================================================== */}

          <div className="flex items-start gap-3">

            <User className="mt-1 h-5 w-5 shrink-0 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {job.customerName || "—"}
              </p>

              <p className="text-sm text-muted-foreground">
                Customer ID: {job.customerId}
              </p>

            </div>

          </div>


          {/* =====================================================
              SERVICE SITE
          ===================================================== */}

          <div className="flex items-start gap-3">

            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Service Site
              </p>

              <p className="font-medium">
                {job.siteName || "No site assigned"}
              </p>

              {job.siteId && (
                <p className="text-sm text-muted-foreground">
                  Site ID: {job.siteId}
                </p>
              )}

              {job.address && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.address}
                </p>
              )}

            </div>

          </div>


          {/* =====================================================
              SERVICE
          ===================================================== */}

          <div className="flex items-start gap-3">

            <Wrench className="mt-1 h-5 w-5 shrink-0 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Service Type
              </p>

              <p className="font-medium">
                {formatServiceType(job.serviceType)}
              </p>

            </div>

          </div>


          {/* =====================================================
              SCHEDULE
          ===================================================== */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Schedule
            </h3>

            <div className="flex items-start gap-3">

              <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Scheduled Date
                </p>

                <p className="font-medium">
                  {formatDate(job.scheduledDate)}
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              ASSIGNMENT
          ===================================================== */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Assignment
            </h3>

            <div className="flex items-start gap-3">

              <UserCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Assigned Technician
                </p>

                <p className="font-medium">
                  {job.technicianName || "—"}
                </p>

                {job.technicianId && (
                  <p className="text-sm text-muted-foreground">
                    Technician ID: {job.technicianId}
                  </p>
                )}

              </div>

            </div>


            <div className="flex items-start gap-3">

              <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Assigned At
                </p>

                <p className="font-medium">
                  {formatDateTime(job.assignedAt)}
                </p>

                {job.assignedById && (
                  <p className="text-sm text-muted-foreground">
                    Assigned by User #{job.assignedById}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* =====================================================
              JOB TIMELINE
          ===================================================== */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Job Timeline
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">

                <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Created
                  </p>

                  <p className="font-medium">
                    {formatDateTime(job.createdAt)}
                  </p>

                </div>

              </div>


              <div className="flex items-start gap-3">

                <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Started
                  </p>

                  <p className="font-medium">
                    {formatDateTime(job.startedAt)}
                  </p>

                </div>

              </div>


              <div className="flex items-start gap-3">

                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Completed
                  </p>

                  <p className="font-medium">
                    {job.completedAt
                      ? formatDateTime(job.completedAt)
                      : formatDate(job.completedDate)}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              SLA
          ===================================================== */}

          <div className="space-y-3">

            <h3 className="font-semibold">
              SLA
            </h3>

            <div className="flex items-start gap-3">

              <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  SLA Due
                </p>

                <p className="font-medium">
                  {formatDateTime(job.slaDueDate)}
                </p>

              </div>

            </div>

            <Badge
              variant={
                job.slaBreached
                  ? "destructive"
                  : "secondary"
              }
            >
              {job.slaBreached
                ? "SLA Breached"
                : "Within SLA"}
            </Badge>

          </div>


          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="space-y-3 border-t pt-4">

            {/* ASSIGNED */}
            {job.status === "ASSIGNED" && (
              <>
                <Button
                  className="w-full"
                  onClick={() => onAcceptJob(job)}
                >
                  Accept Job
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => onCancelJob(job)}
                >
                  Cancel Job
                </Button>
              </>
            )}

            {/* ACCEPTED */}
            {job.status === "ACCEPTED" && (
              <Button
                className="w-full"
                onClick={() => onStartJob(job)}
              >
                Start Job
              </Button>
            )}

            {/* IN PROGRESS */}
            {job.status === "IN_PROGRESS" && (
              <>
                <Button
                  className="w-full"
                  onClick={() => onHoldJob(job)}
                >
                  Put On Hold
                </Button>

                <Button
                  className="w-full"
                  onClick={() => onCompleteJob(job)}
                >
                  Mark as Completed
                </Button>
              </>
            )}

            {/* ON HOLD */}
            {job.status === "ON_HOLD" && (
              <Button
                className="w-full"
                onClick={() => onResumeJob(job)}
              >
                Resume Job
              </Button>
            )}

            {/* COMPLETED */}
            {job.status === "COMPLETED" && (
              <p className="text-center text-sm text-muted-foreground">
                This job has been completed.
              </p>
            )}

            {/* CANCELLED */}
            {job.status === "CANCELLED" && (
              <p className="text-center text-sm text-muted-foreground">
                This job has been cancelled.
              </p>
            )}

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}