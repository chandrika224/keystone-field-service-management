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

import type {
  TechnicianWorkReport,
} from "@/data/technician/reports";

interface TechnicianEditReportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  report: TechnicianWorkReport | null;

  onSave: (
    report: TechnicianWorkReport,
    submit: boolean
  ) => void;
}

export default function TechnicianEditReportDrawer({
  open,
  onOpenChange,
  report,
  onSave,
}: TechnicianEditReportDrawerProps) {
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
     LOAD REPORT
  -------------------------------------------------- */

  useEffect(() => {
    if (!report) {
      return;
    }

    setWorkOrderId(report.workOrderId);
    setTitle(report.title);
    setCustomerName(report.customerName);
    setSiteName(report.siteName);
    setReportDate(report.reportDate);
    setHoursWorked(
      String(report.hoursWorked)
    );
    setWorkPerformed(report.workPerformed);
    setObservations(report.observations);
    setMaterialsUsed(
      report.materialsUsed.join(", ")
    );
    setTechnicianNotes(
      report.technicianNotes
    );
  }, [report]);

  /* --------------------------------------------------
     BUILD UPDATED REPORT
  -------------------------------------------------- */

  const buildReport = (
    submit: boolean
  ): TechnicianWorkReport => {
    return {
      ...report!,

      workOrderId:
        workOrderId.trim(),

      title:
        title.trim(),

      customerName:
        customerName.trim(),

      siteName:
        siteName.trim(),

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
     SAVE
  -------------------------------------------------- */

  const handleSave = (
    submit: boolean
  ) => {
    if (!report) {
      return;
    }

    if (
      !workOrderId.trim() ||
      !title.trim() ||
      !customerName.trim() ||
      !siteName.trim() ||
      !reportDate ||
      !hoursWorked ||
      !workPerformed.trim()
    ) {
      return;
    }

    const updatedReport =
      buildReport(submit);

    onSave(
      updatedReport,
      submit
    );

    onOpenChange(false);
  };

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  if (!report) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">

        <SheetHeader>
          <SheetTitle>
            Edit Work Report
          </SheetTitle>

          <SheetDescription>
            Update your work report before submitting it.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5">

          <Field
            label="Work Order ID"
            value={workOrderId}
            onChange={setWorkOrderId}
          />

          <Field
            label="Job Title"
            value={title}
            onChange={setTitle}
          />

          <Field
            label="Customer"
            value={customerName}
            onChange={setCustomerName}
          />

          <Field
            label="Site"
            value={siteName}
            onChange={setSiteName}
          />

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

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Hours Worked
            </label>

            <Input
              type="number"
              min="0"
              step="0.5"
              value={hoursWorked}
              onChange={(event) =>
                setHoursWorked(
                  event.target.value
                )
              }
            />

          </div>

          <TextAreaField
            label="Work Performed"
            value={workPerformed}
            onChange={setWorkPerformed}
          />

          <TextAreaField
            label="Observations"
            value={observations}
            onChange={setObservations}
          />

          <Field
            label="Materials Used"
            value={materialsUsed}
            onChange={setMaterialsUsed}
            placeholder="Filter, Cable, Fuse"
          />

          <TextAreaField
            label="Technician Notes"
            value={technicianNotes}
            onChange={setTechnicianNotes}
          />

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

/* --------------------------------------------------
   FIELD
-------------------------------------------------- */

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: FieldProps) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        {label}
      </label>

      <Input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
      />

    </div>
  );
}

/* --------------------------------------------------
   TEXT AREA
-------------------------------------------------- */

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function TextAreaField({
  label,
  value,
  onChange,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={4}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

    </div>
  );
}