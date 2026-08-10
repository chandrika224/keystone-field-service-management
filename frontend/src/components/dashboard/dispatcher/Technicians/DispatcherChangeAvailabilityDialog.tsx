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

import type { Technician } from "@/types/workOrder";

interface DispatcherChangeAvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technician: Technician | null;
  onConfirm: (status: "Available" | "Busy") => void;
}

export default function DispatcherChangeAvailabilityDialog({
  open,
  onOpenChange,
  technician,
  onConfirm,
}: DispatcherChangeAvailabilityDialogProps) {
  if (!technician) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Change Technician Availability
          </DialogTitle>

          <DialogDescription>
            Update the availability status of{" "}
            <strong>{technician.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="mb-2 text-sm font-medium">
              Current Status
            </p>

            <p className="text-sm text-muted-foreground">
              {technician.status}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">
              New Status
            </p>

            <Select
              defaultValue={technician.status}
              onValueChange={(value) =>
                onConfirm(value as "Available" | "Busy")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Available">
                  Available
                </SelectItem>

                <SelectItem value="Busy">
                  Busy
                </SelectItem>
              </SelectContent>
            </Select>
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