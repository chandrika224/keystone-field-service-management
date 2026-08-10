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
  Clock,
} from "lucide-react";

import type { TechnicianJob } from "@/data/technician/jobs";

interface TechnicianJobDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: TechnicianJob | null;

  onStartJob: (job: TechnicianJob) => void;
  onCompleteJob: (job: TechnicianJob) => void;
}

export default function TechnicianJobDetailsDrawer({
  open,
  onOpenChange,
  job,
  onStartJob,
  onCompleteJob,
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

          {/* Work Order */}

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {job.workOrderCode}
              </h2>

              <p className="text-sm text-muted-foreground">
                {job.id}
              </p>
            </div>

          </div>

          {/* Status */}

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Current Status
            </p>

            <Badge>
              {job.status.replace("_", " ")}
            </Badge>
          </div>

          {/* Customer */}

          <div className="flex items-center gap-3">

            <User className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {job.customer}
              </p>
            </div>

          </div>

          {/* Site */}

          <div className="flex items-start gap-3">

            <MapPin className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Service Site
              </p>

              <p className="font-medium">
                {job.site}
              </p>
            </div>

          </div>

          {/* Service */}

          <div className="flex items-center gap-3">

            <Wrench className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Service
              </p>

              <p className="font-medium">
                {job.service}
              </p>
            </div>

          </div>

          {/* Priority */}

          <div className="flex items-center gap-3">

            <ClipboardList className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Priority
              </p>

              <p className="font-medium">
                {job.priority}
              </p>
            </div>

          </div>

          {/* Schedule */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Schedule
            </h3>

            <div className="flex items-center gap-3">

              <Calendar className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Date
                </p>

                <p className="font-medium">
                  {job.scheduledDate}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <Clock className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Time
                </p>

                <p className="font-medium">
                  {job.scheduledTime}
                </p>
              </div>

            </div>

          </div>

          {/* Actions */}

          <div className="space-y-3 pt-4">

            {job.status === "ASSIGNED" && (
              <Button
                className="w-full"
                onClick={() => onStartJob(job)}
              >
                Start Job
              </Button>
            )}

            {job.status === "IN_PROGRESS" && (
              <Button
                className="w-full"
                onClick={() => onCompleteJob(job)}
              >
                Mark as Completed
              </Button>
            )}

            {job.status === "COMPLETED" && (
              <p className="text-center text-sm text-muted-foreground">
                This job has been completed.
              </p>
            )}

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}