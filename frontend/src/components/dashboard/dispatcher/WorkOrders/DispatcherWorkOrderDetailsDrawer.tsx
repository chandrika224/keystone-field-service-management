import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  User,
  ClipboardList,
  CalendarDays,
  Wrench,
  AlertTriangle,
  Clock,
} from "lucide-react";

import { useEffect, useState } from "react";

import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import {
  workOrderService,
  type CustomerWorkOrderResponse,
} from "@/services/workOrderService";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface DispatcherWorkOrderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: DispatcherWorkOrder | null;
  onAssign?: (workOrder: DispatcherWorkOrder) => void;
}

export default function DispatcherWorkOrderDetailsDrawer({
  open,
  onOpenChange,
  workOrder,
  onAssign,
}: DispatcherWorkOrderDetailsDrawerProps) {

  const [details, setDetails] =
    useState<CustomerWorkOrderResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);


  // ============================================================
  // FETCH WORK ORDER DETAILS
  // ============================================================

  useEffect(() => {

    if (!open || !workOrder) {
      return;
    }

    const fetchWorkOrderDetails = async () => {

      try {

        setLoading(true);
        setError(null);
        setDetails(null);

        console.log(
          "Fetching work order details:",
          workOrder.id,
          "Type:",
          typeof workOrder.id
        );

        // IMPORTANT:
        // workOrder.id is already a number.
        // Do NOT use Number(workOrder.id).

        if (
          typeof workOrder.id !== "number" ||
          !Number.isFinite(workOrder.id)
        ) {

          console.error(
            "Invalid work order ID:",
            workOrder.id
          );

          setError(
            "Invalid work order ID."
          );

          return;
        }

        const data =
          await workOrderService.getWorkOrderById(
            workOrder.id
          );

        console.log(
          "Work order details received:",
          data
        );

        setDetails(data);

      } catch (err) {

        console.error(
          "Failed to fetch work order details:",
          err
        );

        setError(
          "Failed to load work order details."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchWorkOrderDetails();

  }, [open, workOrder]);


  // ============================================================
  // NO WORK ORDER
  // ============================================================

  if (!workOrder) {
    return null;
  }


  // ============================================================
  // DISPLAY DATA
  // ============================================================

  const displayWorkOrder =
    details ?? workOrder;


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <Sheet
        open={open}
        onOpenChange={onOpenChange}
      >

        <SheetContent className="sm:max-w-xl">

          <SheetHeader>

            <SheetTitle>
              Loading Work Order...
            </SheetTitle>

            <SheetDescription>
              Work Order #{workOrder.id}
            </SheetDescription>

          </SheetHeader>

          <div className="flex items-center justify-center py-12">

            <p className="text-muted-foreground">
              Loading work order details...
            </p>

          </div>

        </SheetContent>

      </Sheet>
    );
  }


  // ============================================================
  // ERROR
  // ============================================================

  if (error) {

    return (
      <Sheet
        open={open}
        onOpenChange={onOpenChange}
      >

        <SheetContent className="sm:max-w-xl">

          <SheetHeader>

            <SheetTitle>
              Work Order Details
            </SheetTitle>

            <SheetDescription>
              Work Order #{workOrder.id}
            </SheetDescription>

          </SheetHeader>

          <div className="py-8 text-center">

            <p className="text-destructive">
              {error}
            </p>

          </div>

        </SheetContent>

      </Sheet>
    );
  }


  // ============================================================
  // DRAWER
  // ============================================================

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent className="sm:max-w-xl overflow-y-auto">

        <SheetHeader>

          <SheetTitle>
            {displayWorkOrder.title}
          </SheetTitle>

          <SheetDescription>
            Work Order #{displayWorkOrder.id}
          </SheetDescription>

          <div className="pt-2">

            <StatusBadge
              status={displayWorkOrder.status}
            />

          </div>

        </SheetHeader>


        <div className="mt-8 space-y-6">

          <Card>

            <CardContent className="space-y-5 p-6">

              {/* CUSTOMER */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center">

                  <User className="h-4 w-4" />

                  <span>
                    Customer
                  </span>

                </div>

                <span className="font-medium text-right">

                  {"customerName" in displayWorkOrder
                    ? displayWorkOrder.customerName ||
                      "Unknown"
                    : "Unknown"}

                </span>

              </div>


              {/* SERVICE */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center">

                  <ClipboardList className="h-4 w-4" />

                  <span>
                    Service
                  </span>

                </div>

                <span className="font-medium text-right">

                  {displayWorkOrder.title}

                </span>

              </div>


              {/* DESCRIPTION */}

              <div className="space-y-2">

                <div className="flex gap-2 items-center">

                  <ClipboardList className="h-4 w-4" />

                  <span>
                    Description
                  </span>

                </div>

                <p className="text-sm text-muted-foreground">

                  {displayWorkOrder.description}

                </p>

              </div>


              {/* TECHNICIAN */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center">

                  <Wrench className="h-4 w-4" />

                  <span>
                    Technician
                  </span>

                </div>

                <span className="font-medium text-right">

                  {"technicianName" in displayWorkOrder
                    ? displayWorkOrder.technicianName ||
                      "Unassigned"
                    : "Unassigned"}

                </span>

              </div>


              {/* SCHEDULED DATE */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center">

                  <CalendarDays className="h-4 w-4" />

                  <span>
                    Scheduled Date
                  </span>

                </div>

                <span className="font-medium text-right">

                  {displayWorkOrder.scheduledDate ||
                    "Not scheduled"}

                </span>

              </div>


              {/* PRIORITY */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-2 items-center">

                  <AlertTriangle className="h-4 w-4" />

                  <span>
                    Priority
                  </span>

                </div>

                <span className="font-medium">

                  {displayWorkOrder.priority}

                </span>

              </div>


              {/* SLA DUE DATE */}

              {"slaDueDate" in displayWorkOrder && (

                <div className="flex justify-between gap-4">

                  <div className="flex gap-2 items-center">

                    <Clock className="h-4 w-4" />

                    <span>
                      SLA Due
                    </span>

                  </div>

                  <span className="font-medium text-right">

                    {displayWorkOrder.slaDueDate
                      ? new Date(
                          displayWorkOrder.slaDueDate
                        ).toLocaleString()
                      : "Not available"}

                  </span>

                </div>

              )}


              {/* SLA STATUS */}

              {"slaBreached" in displayWorkOrder && (

                <div className="flex justify-between gap-4">

                  <div className="flex gap-2 items-center">

                    <AlertTriangle className="h-4 w-4" />

                    <span>
                      SLA Status
                    </span>

                  </div>

                  <span
                    className={
                      displayWorkOrder.slaBreached
                        ? "font-medium text-destructive"
                        : "font-medium"
                    }
                  >

                    {displayWorkOrder.slaBreached
                      ? "Breached"
                      : "Within SLA"}

                  </span>

                </div>

              )}

            </CardContent>

          </Card>


          {/* ASSIGN BUTTON */}

          <div className="flex justify-end">

            {onAssign &&
              ("technicianName" in displayWorkOrder
                ? displayWorkOrder.technicianName ===
                  "Unassigned"
                : false) && (

                <Button
                  onClick={() =>
                    onAssign(workOrder)
                  }
                >
                  Assign Technician
                </Button>

              )}

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}