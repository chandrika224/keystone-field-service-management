import {
  CalendarClock,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  TechnicianScheduleItem,
} from "@/data/technician/schedule";

interface TechnicianScheduleCardProps {
  item: TechnicianScheduleItem;
  onView: (item: TechnicianScheduleItem) => void;
}

export default function TechnicianScheduleCard({
  item,
  onView,
}: TechnicianScheduleCardProps) {

  const getPriorityClass = () => {
    switch (item.priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusClass = () => {
    switch (item.status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm">

      {/* Top section */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="min-w-0">

          {/* Time */}

          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <CalendarClock className="h-4 w-4" />

            <span>
              {item.startTime} - {item.endTime}
            </span>
          </div>

          {/* Title */}

          <h3 className="mt-2 text-lg font-semibold">
            {item.title}
          </h3>

          {/* Work order */}

          <p className="mt-1 text-sm text-muted-foreground">
            {item.workOrderId}
          </p>

        </div>

        {/* Badges */}

        <div className="flex flex-wrap gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityClass()}`}
          >
            {item.priority} Priority
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass()}`}
          >
            {item.status}
          </span>

        </div>

      </div>

      {/* Job information */}

      <div className="mt-5 grid gap-4 border-t pt-4 sm:grid-cols-2">

        {/* Customer */}

        <div className="flex items-start gap-3">

          <UserRound className="mt-0.5 h-4 w-4 text-muted-foreground" />

          <div>
            <p className="text-xs text-muted-foreground">
              Customer
            </p>

            <p className="mt-1 text-sm font-medium">
              {item.customerName}
            </p>
          </div>

        </div>

        {/* Site */}

        <div className="flex items-start gap-3">

          <Wrench className="mt-0.5 h-4 w-4 text-muted-foreground" />

          <div>
            <p className="text-xs text-muted-foreground">
              Site
            </p>

            <p className="mt-1 text-sm font-medium">
              {item.siteName}
            </p>
          </div>

        </div>

        {/* Location */}

        <div className="flex items-start gap-3 sm:col-span-2">

          <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />

          <div>
            <p className="text-xs text-muted-foreground">
              Location
            </p>

            <p className="mt-1 text-sm font-medium">
              {item.location}
            </p>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-5 flex justify-end border-t pt-4">

        <Button
          type="button"
          variant="outline"
          onClick={() => onView(item)}
        >
          View Job
        </Button>

      </div>

    </div>
  );
}