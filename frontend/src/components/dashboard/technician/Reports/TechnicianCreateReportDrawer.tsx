import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import type {
  TechnicianWorkReport,
} from "@/data/technician/reports";

interface TechnicianCreateReportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onSave: (
    report: TechnicianWorkReport,
    submit: boolean
  ) => void;
}

export default function TechnicianCreateReportDrawer({
  open,
  onOpenChange,
  onSave,
}: TechnicianCreateReportDrawerProps) {

  /* --------------------------------------------------
     FORM STATE
  -------------------------------------------------- */

  const [workOrderId, setWorkOrderId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [customerName, setCustomerName] =
    useState("");

  const [siteName, setSiteName] =
    useState("");

  const [reportDate, setReportDate] =
    useState("");

  const [hoursWorked, setHoursWorked] =
    useState("");

  const [workPerformed, setWorkPerformed] =
    useState("");

  const [observations, setObservations] =
    useState("");

  const [materialsUsed, setMaterialsUsed] =
    useState("");

  const [technicianNotes, setTechnicianNotes] =
    useState("");


  /* --------------------------------------------------
     RESET FORM
  -------------------------------------------------- */

  const resetForm = () => {
    setWorkOrderId("");
    setTitle("");
    setCustomerName("");
    setSiteName("");
    setReportDate("");
    setHoursWorked("");
    setWorkPerformed("");
    setObservations("");
    setMaterialsUsed("");
    setTechnicianNotes("");
  };


  /* --------------------------------------------------
     RESET WHEN DRAWER CLOSES
  -------------------------------------------------- */

  useEffect(() => {

    if (!open) {
      resetForm();
    }

  }, [open]);


  /* --------------------------------------------------
     VALIDATION
  -------------------------------------------------- */

  const validateForm = (): boolean => {

    if (!workOrderId.trim()) {
      toast.error("Work Order ID is required");
      return false;
    }

    if (!title.trim()) {
      toast.error("Job title is required");
      return false;
    }

    if (!customerName.trim()) {
      toast.error("Customer name is required");
      return false;
    }

    if (!siteName.trim()) {
      toast.error("Site name is required");
      return false;
    }

    if (!reportDate) {
      toast.error("Report date is required");
      return false;
    }

    if (!hoursWorked) {
      toast.error("Hours worked is required");
      return false;
    }

    if (Number(hoursWorked) <= 0) {
      toast.error("Hours worked must be greater than 0");
      return false;
    }

    if (!workPerformed.trim()) {
      toast.error("Work performed details are required");
      return false;
    }

    return true;
  };


  /* --------------------------------------------------
     BUILD REPORT
  -------------------------------------------------- */

  const buildReport = (
    submit: boolean
  ): TechnicianWorkReport => {

    return {
      id: `REPORT-${Date.now()}`,

      workOrderId:
        workOrderId.trim(),

      title:
        title.trim(),

      customerName:
        customerName.trim(),

      siteName:
        siteName.trim(),

      technicianName:
        "Current Technician",

      reportDate,

      hoursWorked:
        Number(hoursWorked),

      workPerformed:
        workPerformed.trim(),

      observations:
        observations.trim(),

      materialsUsed:
        materialsUsed
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      technicianNotes:
        technicianNotes.trim(),

      status: submit
        ? "Submitted"
        : "Draft",
    };
  };


  /* --------------------------------------------------
     SAVE / SUBMIT
  -------------------------------------------------- */

  const handleSave = (
    submit: boolean
  ) => {

    console.log(
      "Create report button clicked:",
      submit ? "SUBMIT" : "SAVE DRAFT"
    );

    if (!validateForm()) {
      return;
    }

    const report =
      buildReport(submit);

    console.log(
      "Report being sent to parent:",
      report
    );

    onSave(
      report,
      submit
    );

    onOpenChange(false);

  };


  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        className="w-full overflow-y-auto sm:max-w-xl"
      >

        <SheetHeader>

          <SheetTitle>
            Create Work Report
          </SheetTitle>

          <SheetDescription>
            Record the work completed during your field visit.
          </SheetDescription>

        </SheetHeader>


        <div className="mt-6 space-y-5">


          {/* WORK ORDER ID */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Work Order ID
            </label>

            <Input
              value={workOrderId}
              onChange={(event) =>
                setWorkOrderId(
                  event.target.value
                )
              }
              placeholder="WO-001"
            />

          </div>


          {/* JOB TITLE */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Job Title
            </label>

            <Input
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="HVAC Maintenance"
            />

          </div>


          {/* CUSTOMER */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Customer
            </label>

            <Input
              value={customerName}
              onChange={(event) =>
                setCustomerName(
                  event.target.value
                )
              }
              placeholder="Customer name"
            />

          </div>


          {/* SITE */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Site
            </label>

            <Input
              value={siteName}
              onChange={(event) =>
                setSiteName(
                  event.target.value
                )
              }
              placeholder="Site location"
            />

          </div>


          {/* REPORT DATE */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Report Date
            </label>

            <Input
              type="date"
              value={reportDate}
              onChange={(event) =>
                setReportDate(
                  event.target.value
                )
              }
            />

          </div>


          {/* HOURS */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Hours Worked
            </label>

            <Input
              type="number"
              min="0.5"
              step="0.5"
              value={hoursWorked}
              onChange={(event) =>
                setHoursWorked(
                  event.target.value
                )
              }
              placeholder="4"
            />

          </div>


          {/* WORK PERFORMED */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Work Performed
            </label>

            <textarea
              value={workPerformed}
              onChange={(event) =>
                setWorkPerformed(
                  event.target.value
                )
              }
              placeholder="Describe the work completed..."
              rows={4}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

          </div>


          {/* OBSERVATIONS */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Observations
            </label>

            <textarea
              value={observations}
              onChange={(event) =>
                setObservations(
                  event.target.value
                )
              }
              placeholder="Describe any issues or observations..."
              rows={4}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

          </div>


          {/* MATERIALS */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Materials Used
            </label>

            <Input
              value={materialsUsed}
              onChange={(event) =>
                setMaterialsUsed(
                  event.target.value
                )
              }
              placeholder="Filter, Cable, Fuse"
            />

            <p className="text-xs text-muted-foreground">
              Separate multiple materials with commas.
            </p>

          </div>


          {/* NOTES */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Technician Notes
            </label>

            <textarea
              value={technicianNotes}
              onChange={(event) =>
                setTechnicianNotes(
                  event.target.value
                )
              }
              placeholder="Additional notes..."
              rows={4}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

          </div>


          {/* ACTIONS */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>


            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleSave(false)
              }
            >
              Save Draft
            </Button>


            <Button
              type="button"
              onClick={() =>
                handleSave(true)
              }
            >
              Submit Report
            </Button>

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}