import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  ClipboardList,
  CalendarDays,
  Wrench,
  MapPin,
  Clock,
  AlertTriangle,
} from "lucide-react";

import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import type { WorkOrderResponse } from "@/types/workOrder";

interface DispatcherWorkOrderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: WorkOrderResponse | null;
  onAssign?: (workOrder: WorkOrderResponse) => void;
}

export default function DispatcherWorkOrderDetailsDrawer({
  open,
  onOpenChange,
  workOrder,
  onAssign,
}: DispatcherWorkOrderDetailsDrawerProps) {

  if (!workOrder) {
    return null;
  }

  const technicianName =
    workOrder.technicianName || "Unassigned";

  const scheduledDate =
    workOrder.scheduledDate
      ? new Date(
          `${workOrder.scheduledDate}T00:00:00`
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Not scheduled";

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <SheetHeader>

          <SheetTitle>
            {workOrder.title}
          </SheetTitle>

          <SheetDescription>
            Work Order #{workOrder.id}
          </SheetDescription>

          <div className="pt-2">

            <StatusBadge
              status={workOrder.status}
            />

          </div>

        </SheetHeader>


        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="mt-8 space-y-6">


          {/* ====================================================
              BASIC INFORMATION
          ==================================================== */}

          <Card>

            <CardContent className="space-y-5 p-6">


              {/* Customer */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center text-muted-foreground">

                  <User className="h-4 w-4" />

                  <span>
                    Customer
                  </span>

                </div>

                <span className="font-medium text-right">
                  {workOrder.customerName}
                </span>

              </div>


              {/* Service */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center text-muted-foreground">

                  <ClipboardList className="h-4 w-4" />

                  <span>
                    Service
                  </span>

                </div>

                <span className="font-medium text-right">
                  {workOrder.serviceType}
                </span>

              </div>


              {/* Priority */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center text-muted-foreground">

                  <AlertTriangle className="h-4 w-4" />

                  <span>
                    Priority
                  </span>

                </div>

                <span className="font-medium">
                  {workOrder.priority}
                </span>

              </div>


              {/* Technician */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center text-muted-foreground">

                  <Wrench className="h-4 w-4" />

                  <span>
                    Technician
                  </span>

                </div>

                <span className="font-medium text-right">
                  {technicianName}
                </span>

              </div>


              {/* Scheduled Date */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center text-muted-foreground">

                  <CalendarDays className="h-4 w-4" />

                  <span>
                    Scheduled Date
                  </span>

                </div>

                <span className="font-medium">
                  {scheduledDate}
                </span>

              </div>


              {/* SLA */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center text-muted-foreground">

                  <Clock className="h-4 w-4" />

                  <span>
                    SLA Status
                  </span>

                </div>

                <span
                  className={
                    workOrder.slaBreached
                      ? "font-medium text-destructive"
                      : "font-medium"
                  }
                >
                  {workOrder.slaBreached
                    ? "Breached"
                    : "Within SLA"}
                </span>

              </div>

            </CardContent>

          </Card>


          {/* ====================================================
              DESCRIPTION
          ==================================================== */}

          <Card>

            <CardContent className="p-6">

              <h3 className="font-semibold">
                Description
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {workOrder.description ||
                  "No description provided."}
              </p>

            </CardContent>

          </Card>


          {/* ====================================================
              ADDRESS
          ==================================================== */}

          {workOrder.address && (

            <Card>

              <CardContent className="p-6">

                <div className="flex gap-2 items-center">

                  <MapPin className="h-4 w-4 text-muted-foreground" />

                  <h3 className="font-semibold">
                    Service Address
                  </h3>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {workOrder.address}
                </p>

              </CardContent>

            </Card>

          )}


          {/* ====================================================
              ACTION
          ==================================================== */}

          {onAssign && (

            <div className="flex justify-end">

              <Button
                onClick={() =>
                  onAssign(workOrder)
                }
              >
                {workOrder.technicianId
                  ? "Reassign Technician"
                  : "Assign Technician"}
              </Button>

            </div>

          )}

        </div>

      </SheetContent>

    </Sheet>
  );
}