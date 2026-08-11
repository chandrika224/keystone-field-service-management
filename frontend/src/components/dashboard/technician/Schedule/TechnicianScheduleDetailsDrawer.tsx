import {
  CalendarClock,
  ClipboardList,
  MapPin,
  UserRound,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import type {
  TechnicianScheduleItem,
} from "@/data/technician/schedule";

interface TechnicianScheduleDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  item: TechnicianScheduleItem | null;

  onOpenWorkOrder?: (
    item: TechnicianScheduleItem
  ) => void;

  onStatusChange?: (
    item: TechnicianScheduleItem,
    status: TechnicianScheduleItem["status"]
  ) => void;
}

export default function TechnicianScheduleDetailsDrawer({
  open,
  onOpenChange,
  item,
  onOpenWorkOrder,
  onStatusChange,
}: TechnicianScheduleDetailsDrawerProps) {

  if (!item) {
    return null;
  }

  const getPriorityDetails = () => {
    switch (item.priority) {
      case "High":
        return {
          icon: AlertTriangle,
          className: "bg-red-100 text-red-700",
        };

      case "Medium":
        return {
          icon: AlertTriangle,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "Low":
        return {
          icon: CheckCircle2,
          className: "bg-green-100 text-green-700",
        };

      default:
        return {
          icon: AlertTriangle,
          className: "bg-muted text-muted-foreground",
        };
    }
  };

  const getStatusDetails = () => {
    switch (item.status) {
      case "Scheduled":
        return {
          icon: Clock,
          className: "bg-blue-100 text-blue-700",
        };

      case "In Progress":
        return {
          icon: Clock,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "Completed":
        return {
          icon: CheckCircle2,
          className: "bg-green-100 text-green-700",
        };

      case "Cancelled":
        return {
          icon: XCircle,
          className: "bg-red-100 text-red-700",
        };

      default:
        return {
          icon: Clock,
          className: "bg-muted text-muted-foreground",
        };
    }
  };

  const priorityDetails = getPriorityDetails();
  const statusDetails = getStatusDetails();

  const PriorityIcon = priorityDetails.icon;
  const StatusIcon = statusDetails.icon;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">

        {/* Header */}

        <SheetHeader>
          <SheetTitle>
            Scheduled Job
          </SheetTitle>

          <SheetDescription>
            View the details of your scheduled field activity.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Job heading */}

          <div>
            <p className="text-sm font-medium text-primary">
              Work Order
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {item.title}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {item.workOrderId}
            </p>
          </div>

          {/* Status / Priority */}

          <div className="flex flex-wrap gap-2">

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${statusDetails.className}`}
            >
              <StatusIcon className="h-4 w-4" />
              {item.status}
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${priorityDetails.className}`}
            >
              <PriorityIcon className="h-4 w-4" />
              {item.priority} Priority
            </div>

          </div>

          {/* Schedule */}

          <div className="rounded-lg border p-4">

            <div className="flex items-start gap-3">

              <CalendarClock className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Scheduled Time
                </p>

                <p className="mt-1 font-medium">
                  {item.scheduledDate}
                </p>

                <p className="text-sm text-muted-foreground">
                  {item.startTime} - {item.endTime}
                </p>
              </div>

            </div>

          </div>

          {/* Customer */}

          <div className="flex items-start gap-3">

            <UserRound className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {item.customerName}
              </p>
            </div>

          </div>

          {/* Site */}

          <div className="flex items-start gap-3">

            <Wrench className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Site
              </p>

              <p className="font-medium">
                {item.siteName}
              </p>
            </div>

          </div>

          {/* Location */}

          <div className="flex items-start gap-3">

            <MapPin className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Location
              </p>

              <p className="font-medium">
                {item.location}
              </p>
            </div>

          </div>

          {/* Description */}

          <div className="flex items-start gap-3">

            <ClipboardList className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Job Description
              </p>

              <p className="mt-1 text-sm leading-6">
                {item.description}
              </p>
            </div>

          </div>

          <div className="border-t pt-5">

            <p className="mb-3 text-sm font-medium">
              Update Job Status
            </p>

            <div className="grid grid-cols-2 gap-3">

              {item.status === "Scheduled" && (
                <Button
                  type="button"
                  onClick={() =>
                    onStatusChange?.(
                      item,
                      "In Progress"
                    )
                  }
                >
                  Start Job
                </Button>
              )}

              {item.status === "In Progress" && (
                <Button
                  type="button"
                  onClick={() =>
                    onStatusChange?.(
                      item,
                      "Completed"
                    )
                  }
                >
                  Mark Completed
                </Button>
              )}

              {item.status === "Scheduled" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    onStatusChange?.(
                      item,
                      "Cancelled"
                    )
                  }
                >
                  Cancel Job
                </Button>
              )}

            </div>

          </div>

          {/* Footer */}

          <div className="border-t pt-5">

            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onOpenWorkOrder?.(item);
              }}
            >
              Open Work Order
            </Button>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}