import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  if (!workOrder) {
    return null;
  }

  // Only active technicians can be assigned
  const availableTechnicians = technicians.filter(
    (technician) => technician.active
  );

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Assign Technician
          </DialogTitle>

          <DialogDescription>
            Select an available technician for this work order.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4 py-4">

          {/* Work Order */}

          <div className="rounded-lg border p-4">

            <p className="text-sm text-muted-foreground">
              Work Order
            </p>

            <p className="font-medium">
              {workOrder.id}
            </p>

            <p className="text-sm mt-1">
              {workOrder.title}
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


          {/* Technician */}

          <div>

            <p className="mb-2 text-sm font-medium">
              Technician
            </p>

            {availableTechnicians.length === 0 ? (

              <p className="rounded-md border p-3 text-sm text-muted-foreground">
                No active technicians available.
              </p>

            ) : (

              <Select
                onValueChange={(technicianId) => {

                  const technician =
                    availableTechnicians.find(
                      (tech) =>
                        String(tech.id) === technicianId
                    );

                  if (technician) {
                    onAssign(technician);
                  }
                }}
              >

                <SelectTrigger>

                  <SelectValue placeholder="Select technician" />

                </SelectTrigger>

                <SelectContent>

                  {availableTechnicians.map((technician) => (

                    <SelectItem
                      key={technician.id}
                      value={String(technician.id)}
                    >

                      {technician.firstName}{" "}
                      {technician.lastName}
                      {" — "}
                      {technician.specialization}

                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            )}

          </div>

        </div>


        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}