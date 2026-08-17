import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import type {
  DispatcherWorkOrder,
  Technician,
} from "@/types/workOrder";

interface DispatcherAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  workOrder: DispatcherWorkOrder | null;

  technicians: Technician[];

  onAssign: (technician: Technician) => void;

  assigning?: boolean;
}

export default function DispatcherAssignmentDialog({
  open,
  onOpenChange,
  workOrder,
  technicians,
  onAssign,
  assigning = false,
}: DispatcherAssignmentDialogProps) {
  const [selectedTechnicianId, setSelectedTechnicianId] =
    useState("");

  // ============================================================
  // RESET SELECTION WHEN WORK ORDER CHANGES
  // ============================================================

  useEffect(() => {
    setSelectedTechnicianId("");
  }, [workOrder]);

  if (!workOrder) {
    return null;
  }

  // ============================================================
  // ONLY ACTIVE TECHNICIANS CAN BE ASSIGNED
  // ============================================================

  const availableTechnicians =
    technicians.filter(
      (technician) => technician.active
    );

  // ============================================================
  // FIND SELECTED TECHNICIAN
  // ============================================================

  const selectedTechnician =
    technicians.find(
      (technician) =>
        String(technician.id) === selectedTechnicianId
    ) ?? null;

  // ============================================================
  // CHECK REASSIGNMENT
  // ============================================================

  const isReassignment =
    workOrder.technician !== "Unassigned";

  // ============================================================
  // TECHNICIAN NAME
  // ============================================================

  const getTechnicianName = (
    technician: Technician
  ) => {
    return `${technician.firstName} ${technician.lastName}`;
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = () => {
    if (!selectedTechnician || assigning) {
      return;
    }

    onAssign(selectedTechnician);
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isReassignment
              ? "Reassign Technician"
              : "Assign Technician"}
          </DialogTitle>

          <DialogDescription>
            Select an active technician for this work order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          {/* ==================================================
              WORK ORDER
          ================================================== */}

          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              Work Order
            </p>

            <p className="mt-1 font-semibold">
              {workOrder.id}
            </p>

            <p className="text-sm">
              {workOrder.title}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {workOrder.service}
            </p>
          </div>

          {/* ==================================================
              CUSTOMER
          ================================================== */}

          <div>
            <p className="text-sm text-muted-foreground">
              Customer
            </p>

            <p className="font-medium">
              {workOrder.customer}
            </p>
          </div>

          {/* ==================================================
              CURRENT TECHNICIAN
          ================================================== */}

          {isReassignment && (
            <div>
              <p className="text-sm text-muted-foreground">
                Current Technician
              </p>

              <p className="font-medium">
                {workOrder.technician}
              </p>
            </div>
          )}

          {/* ==================================================
              TECHNICIAN SELECT
          ================================================== */}

          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isReassignment
                ? "New Technician"
                : "Technician"}
            </p>
            <Select
              value={selectedTechnicianId}
              onValueChange={(value) => {
                if (value !== null) {
                  setSelectedTechnicianId(value);
                }
              }}
              disabled={assigning}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select technician" />
              </SelectTrigger>

              <SelectContent>
                {availableTechnicians.length === 0 ? (
                  <SelectItem
                    value="NO_TECHNICIANS"
                    disabled
                  >
                    No active technicians available
                  </SelectItem>
                ) : (
                  availableTechnicians.map(
                    (technician) => (
                      <SelectItem
                        key={technician.id}
                        value={String(technician.id)}
                      >
                        {getTechnicianName(technician)}
                        {" — "}
                        {technician.specialization}
                      </SelectItem>
                    )
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* ==================================================
              SELECTED TECHNICIAN DETAILS
          ================================================== */}

          {selectedTechnician && (
            <div className="rounded-lg border p-4">
              <p className="font-semibold">
                {getTechnicianName(
                  selectedTechnician
                )}
              </p>

              <p className="text-sm text-muted-foreground">
                {selectedTechnician.email}
              </p>

              <p className="mt-2 text-sm">
                Specialization:{" "}
                <span className="font-medium">
                  {selectedTechnician.specialization}
                </span>
              </p>

              <p className="text-sm">
                Active Jobs:{" "}
                <span className="font-medium">
                  {selectedTechnician.currentJobs ?? 0}
                </span>
              </p>

              <p className="text-sm">
                Availability:{" "}
                <span className="font-medium">
                  {selectedTechnician.active
                    ? "Active"
                    : "Inactive"}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={assigning}
          >
            Cancel
          </Button>

          <Button
            disabled={
              !selectedTechnician ||
              assigning
            }
            onClick={handleSubmit}
          >
            {assigning
              ? "Assigning..."
              : isReassignment
                ? "Reassign"
                : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}