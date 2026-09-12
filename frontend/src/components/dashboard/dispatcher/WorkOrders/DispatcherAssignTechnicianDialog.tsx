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

import type { DispatcherWorkOrder } from "@/types/workOrder";
import type { Technician } from "@/types/technician";

interface DispatcherAssignTechnicianDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  workOrder: DispatcherWorkOrder | null;

  technicians: Technician[];

  onAssign: (technicianId: number) => void;
}

export default function DispatcherAssignTechnicianDialog({
  open,
  onOpenChange,
  workOrder,
  technicians,
  onAssign,
}: DispatcherAssignTechnicianDialogProps) {
  const [selectedTechnicianId, setSelectedTechnicianId] =
    useState("");

  useEffect(() => {
    if (open) {
      setSelectedTechnicianId("");
    }
  }, [open, workOrder]);

  if (!workOrder) {
    return null;
  }

  // Only active + available technicians can be assigned.
  const availableTechnicians = technicians.filter(
    (technician) =>
      technician.active && technician.available
  );

  const selectedTechnician =
    availableTechnicians.find(
      (technician) =>
        String(technician.id) === selectedTechnicianId
    ) ?? null;

  const isReassignment =
    workOrder.technicianId !== null;

  const handleSubmit = () => {
    if (!selectedTechnician) {
      return;
    }

    onAssign(selectedTechnician.id);
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
              #{workOrder.id}
            </p>

            <p className="text-sm">
              {workOrder.title}
            </p>
          </div>


          {/* Customer */}

          <div>
            <p className="text-sm text-muted-foreground">
              Customer
            </p>

            <p className="font-medium">
              {workOrder.customerName}
            </p>
          </div>


          {/* Current Technician */}

          {isReassignment && (
            <div>
              <p className="text-sm text-muted-foreground">
                Current Technician
              </p>

              <p className="font-medium">
                {workOrder.technicianName ?? "Not assigned"}
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
              onValueChange={(value) =>
                setSelectedTechnicianId(value ?? "")
              }
            >

              <SelectTrigger>
                <SelectValue
                  placeholder="Select technician"
                />
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
                        value={String(technician.id)}
                      >
                        {technician.firstName}{" "}
                        {technician.lastName}
                        {" — "}
                        {technician.specialization}
                      </SelectItem>

                    )
                  )

                )}

              </SelectContent>

            </Select>

          </div>


          {/* Selected Technician */}

          {selectedTechnician && (
            <div className="rounded-lg border p-4">

              <p className="font-semibold">
                {selectedTechnician.firstName}{" "}
                {selectedTechnician.lastName}
              </p>

              <p className="text-sm text-muted-foreground">
                {selectedTechnician.specialization}
              </p>

              <p className="mt-2 text-sm">
                Email:{" "}
                <span className="font-medium">
                  {selectedTechnician.email}
                </span>
              </p>

              <p className="text-sm">
                Phone:{" "}
                <span className="font-medium">
                  {selectedTechnician.phone}
                </span>
              </p>

              <p className="text-sm">
                Availability:{" "}
                <span className="font-medium">
                  Available
                </span>
              </p>

            </div>
          )}

        </div>


        {/* Footer */}

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