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
  onConfirm: (active: boolean) => void;
}


export default function DispatcherChangeAvailabilityDialog({
  open,
  onOpenChange,
  technician,
  onConfirm,
}: DispatcherChangeAvailabilityDialogProps) {

  if (!technician) {
    return null;
  }


  // ============================================================
  // DERIVED VALUES
  // ============================================================

  const currentStatus =
    technician.active
      ? "Available"
      : "Inactive";


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

            <strong>
              {technician.firstName} {technician.lastName}
            </strong>

          </DialogDescription>

        </DialogHeader>


        <div className="space-y-4 py-4">


          {/* =====================================================
              CURRENT STATUS
          ===================================================== */}

          <div>

            <p className="mb-2 text-sm font-medium">
              Current Status
            </p>

            <p className="text-sm text-muted-foreground">
              {currentStatus}
            </p>

          </div>


          {/* =====================================================
              NEW STATUS
          ===================================================== */}

          <div>

            <p className="mb-2 text-sm font-medium">
              New Status
            </p>


            <Select
              defaultValue={
                technician.active
                  ? "true"
                  : "false"
              }
              onValueChange={(value) => {

                const active =
                  value === "true";

                onConfirm(active);

                onOpenChange(false);
              }}
            >

              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>


              <SelectContent>

                <SelectItem value="true">
                  Available
                </SelectItem>

                <SelectItem value="false">
                  Inactive
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

        </div>


        {/* =======================================================
            FOOTER
        ======================================================= */}

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}