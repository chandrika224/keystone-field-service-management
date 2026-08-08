import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

import { technicians } from "@/data/dispatcher/technicians";

interface DispatcherAssignTechnicianDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (technician: string) => void;
}

export default function DispatcherAssignTechnicianDialog({
  open,
  onOpenChange,
  onAssign,
}: DispatcherAssignTechnicianDialogProps) {

  const [selectedTechnician, setSelectedTechnician] = useState("");

  const handleAssign = () => {

    if (!selectedTechnician) {
      toast.error("Please select a technician.");
      return;
    }

    onAssign(selectedTechnician);

    toast.success("Technician assigned successfully.");

    setSelectedTechnician("");

    onOpenChange(false);
  };

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
            Select a technician for this work order.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4">

          <Label>Technician</Label>

          <select
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">
              Select Technician
            </option>

            {technicians.map((tech) => (

              <option
                key={tech.id}
                value={tech.name}
              >
                {tech.name} ({tech.specialization})
              </option>

            ))}

          </select>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleAssign}>
              Assign
            </Button>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}