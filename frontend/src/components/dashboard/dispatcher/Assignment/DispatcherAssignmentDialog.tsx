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
}

export default function DispatcherAssignmentDialog({
  open,
  onOpenChange,
  workOrder,
  technicians,
  onAssign,
}: DispatcherAssignmentDialogProps) {

  const [selectedTechnicianId, setSelectedTechnicianId] =
    useState("");

  useEffect(() => {
    setSelectedTechnicianId("");
  }, [workOrder]);

  if (!workOrder) {
    return null;
  }

  /*
   * Only technicians who have marked themselves
   * Available can be selected.
   *
   * Dispatcher does NOT change availability.
   */
  const availableTechnicians = technicians.filter(
    (technician) =>
      technician.status === "Available"
  );

  const selectedTechnician =
    technicians.find(
      (technician) =>
        technician.id === selectedTechnicianId
    ) ?? null;

  const isReassignment =
    workOrder.technician !== "Unassigned";

  const handleSubmit = () => {
    if (!selectedTechnician) {
      return;
    }

    onAssign(selectedTechnician);
  };

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
            Select an available technician for this work order.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          {/* Work Order */}

          <div className="rounded-lg border bg-muted/40 p-4">

            <p className="text-sm text-muted-foreground">
              Work Order
            </p>

            <p className="mt-1 font-semibold">
              {workOrder.id}
            </p>

            <p className="text-sm">
              {workOrder.service}
            </p>

          </div>

          {/* Customer */}

          <div>

            <p className="text-sm text-muted-foreground">
              Customer
            </p>

            <p className="font-medium">
              {workOrder.customer}
            </p>

          </div>

          {/* Current Technician */}

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

          {/* Technician */}

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
                    No available technicians
                  </SelectItem>

                ) : (

                  availableTechnicians.map(
                    (technician) => (

                      <SelectItem
                        key={technician.id}
                        value={technician.id}
                      >
                        {technician.name} —{" "}
                        {technician.specialization}
                      </SelectItem>

                    )
                  )

                )}

              </SelectContent>

            </Select>

          </div>

          {/* Selected Technician Information */}

          {selectedTechnician && (

            <div className="rounded-lg border p-4">

              <p className="font-semibold">
                {selectedTechnician.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {selectedTechnician.specialization}
              </p>

              <p className="mt-2 text-sm">
                Active Jobs:{" "}
                <span className="font-medium">
                  {selectedTechnician.currentJobs}
                </span>
              </p>

              <p className="text-sm">
                Availability:{" "}
                <span className="font-medium">
                  {selectedTechnician.status}
                </span>
              </p>

            </div>

          )}

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={!selectedTechnician}
            onClick={handleSubmit}
          >
            {isReassignment
              ? "Reassign"
              : "Assign"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}