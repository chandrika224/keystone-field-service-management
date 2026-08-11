import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
  FileText,
  MapPin,
  User,
  Clock,
  Package,
  ClipboardList,
} from "lucide-react";

import type {
  TechnicianWorkReport,
} from "@/data/technician/reports";

interface TechnicianReportDetailsDrawerProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  report: TechnicianWorkReport | null;
}

export default function TechnicianReportDetailsDrawer({
  open,
  onOpenChange,
  report,
}: TechnicianReportDetailsDrawerProps) {
  if (!report) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">

        {/* Header */}

        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />

            Work Report
          </SheetTitle>

          <SheetDescription>
            {report.workOrderId} • {report.title}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Status */}

          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">

            <div>
              <p className="text-sm text-muted-foreground">
                Report Status
              </p>

              <p className="mt-1 font-semibold">
                {report.status}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                report.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : report.status === "Submitted"
                  ? "bg-blue-100 text-blue-700"
                  : report.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {report.status}
            </span>

          </div>

          {/* Job Information */}

          <section className="space-y-4">

            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />

              <h3 className="font-semibold">
                Job Information
              </h3>
            </div>

            <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">

              <InfoItem
                label="Work Order"
                value={report.workOrderId}
              />

              <InfoItem
                label="Job"
                value={report.title}
              />

              <InfoItem
                label="Customer"
                value={report.customerName}
              />

              <InfoItem
                label="Site"
                value={report.siteName}
                icon={MapPin}
              />

              <InfoItem
                label="Technician"
                value={report.technicianName}
                icon={User}
              />

              <InfoItem
                label="Report Date"
                value={report.reportDate}
              />

              <InfoItem
                label="Hours Worked"
                value={`${report.hoursWorked} hours`}
                icon={Clock}
              />

            </div>

          </section>

          {/* Work Performed */}

          <section className="space-y-3">

            <h3 className="font-semibold">
              Work Performed
            </h3>

            <div className="rounded-lg border bg-muted/20 p-4">

              <p className="text-sm leading-6">
                {report.workPerformed ||
                  "No work details provided."}
              </p>

            </div>

          </section>

          {/* Observations */}

          <section className="space-y-3">

            <h3 className="font-semibold">
              Observations
            </h3>

            <div className="rounded-lg border bg-muted/20 p-4">

              <p className="text-sm leading-6">
                {report.observations ||
                  "No observations provided."}
              </p>

            </div>

          </section>

          {/* Materials */}

          <section className="space-y-3">

            <div className="flex items-center gap-2">

              <Package className="h-4 w-4 text-primary" />

              <h3 className="font-semibold">
                Materials Used
              </h3>

            </div>

            {report.materialsUsed.length === 0 ? (
              <div className="rounded-lg border bg-muted/20 p-4">

                <p className="text-sm text-muted-foreground">
                  No materials were recorded.
                </p>

              </div>
            ) : (
              <div className="flex flex-wrap gap-2">

                {report.materialsUsed.map(
                  (material) => (
                    <span
                      key={material}
                      className="rounded-md border bg-muted/30 px-3 py-1.5 text-sm"
                    >
                      {material}
                    </span>
                  )
                )}

              </div>
            )}

          </section>

          {/* Technician Notes */}

          <section className="space-y-3">

            <h3 className="font-semibold">
              Technician Notes
            </h3>

            <div className="rounded-lg border bg-muted/20 p-4">

              <p className="text-sm leading-6">
                {report.technicianNotes ||
                  "No additional notes provided."}
              </p>

            </div>

          </section>

          {/* Footer */}

          <div className="flex justify-end border-t pt-5">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Close
            </Button>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}

/* --------------------------------------------------
   INFO ITEM
-------------------------------------------------- */

interface InfoItemProps {
  label: string;

  value: string;

  icon?: React.ElementType;
}

function InfoItem({
  label,
  value,
  icon: Icon,
}: InfoItemProps) {
  return (
    <div>

      <div className="flex items-center gap-1.5">

        {Icon && (
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        )}

        <p className="text-xs text-muted-foreground">
          {label}
        </p>

      </div>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>

    </div>
  );
}