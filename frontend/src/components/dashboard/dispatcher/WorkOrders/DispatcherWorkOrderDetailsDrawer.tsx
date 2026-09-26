import { useEffect, useState } from "react";

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

import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import { workOrderService } from "@/services/workOrderService";
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
    useState<DispatcherWorkOrder | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !workOrder) {
      setDetails(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isCurrent = true;

    const fetchWorkOrderDetails = async () => {
      setLoading(true);
      setError(null);
      setDetails(null);

      try {
        const data = await workOrderService.getWorkOrderById(
          workOrder.id
        );

        if (isCurrent) {
          setDetails(data);
        }
      } catch (err) {
        console.error("Failed to fetch work order details:", err);

        if (isCurrent) {
          setError("Failed to load work order details.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    void fetchWorkOrderDetails();

    return () => {
      isCurrent = false;
    };
  }, [open, workOrder?.id]);

  if (!workOrder) {
    return null;
  }

  const displayWorkOrder = details ?? workOrder;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {loading
              ? "Loading Work Order..."
              : displayWorkOrder.title}
          </SheetTitle>

          <SheetDescription>
            Work Order #{workOrder.id}
          </SheetDescription>

          {!loading && !error && (
            <div className="pt-2">
              <StatusBadge status={displayWorkOrder.status} />
            </div>
          )}
        </SheetHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">
              Loading work order details...
            </p>
          </div>
        ) : error ? (
          <div role="alert" className="py-8 text-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <Card>
              <CardContent className="space-y-5 p-6">
                {/* Customer */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Customer</span>
                  </div>

                  <span className="text-right font-medium">
                    {displayWorkOrder.customerName || "Unknown"}
                  </span>
                </div>

                {/* Service */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>Service</span>
                  </div>

                  <span className="text-right font-medium">
                    {displayWorkOrder.serviceType ||
                      displayWorkOrder.title ||
                      "Not specified"}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>Description</span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {displayWorkOrder.description || "No description provided."}
                  </p>
                </div>

                {/* Technician */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    <span>Technician</span>
                  </div>

                  <span className="text-right font-medium">
                    {displayWorkOrder.technicianName || "Unassigned"}
                  </span>
                </div>

                {/* Scheduled date */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Scheduled Date</span>
                  </div>

                  <span className="text-right font-medium">
                    {displayWorkOrder.scheduledDate || "Not scheduled"}
                  </span>
                </div>

                {/* Priority */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Priority</span>
                  </div>

                  <span className="font-medium">
                    {displayWorkOrder.priority}
                  </span>
                </div>

                {/* SLA due date */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>SLA Due</span>
                  </div>

                  <span className="text-right font-medium">
                    {displayWorkOrder.slaDueDate
                      ? new Date(
                          displayWorkOrder.slaDueDate
                        ).toLocaleString()
                      : "Not available"}
                  </span>
                </div>

                {/* SLA status */}
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>SLA Status</span>
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
              </CardContent>
            </Card>

            {/* Assign button */}
            {onAssign && displayWorkOrder.technicianId == null && (
              <div className="flex justify-end">
                <Button onClick={() => onAssign(displayWorkOrder)}>
                  Assign Technician
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}