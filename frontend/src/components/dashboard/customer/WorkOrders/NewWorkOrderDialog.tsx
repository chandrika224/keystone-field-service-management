import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { CustomerWorkOrder } from "@/types/workOrder";
import { useEffect, useState } from "react";

interface NewWorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onSubmit: (order: CustomerWorkOrder) => void;

  editingWorkOrder?: CustomerWorkOrder | null;
}
export default function NewWorkOrderDialog({
  open,
  onOpenChange,
  onSubmit,
  editingWorkOrder,
}: NewWorkOrderDialogProps) {

  const [service, setService] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
  if (editingWorkOrder) {
    setService(editingWorkOrder.service);

    // These fields don't exist in CustomerWorkOrder yet,
    // so leave defaults for now.
    setPriority("Medium");
    setDate(editingWorkOrder.date);
    setTime("");
    setAddress("");
    setDescription("");
  } else {
    setService("");
    setPriority("Medium");
    setDate("");
    setTime("");
    setAddress("");
    setDescription("");
  }
}, [editingWorkOrder, open]);

  const handleSubmit = () => {

      if (!service) {
        toast.error("Please select a service.");
        return;
      }

      if (!date) {
        toast.error("Please select a preferred date.");
        return;
      }

      if (!time) {
        toast.error("Please select a preferred time.");
        return;
      }

      if (!address.trim()) {
        toast.error("Please enter your address.");
        return;
      }

      if (description.trim().length < 10) {
        toast.error("Description should be at least 10 characters.");
        return;
      }

      const newWorkOrder: CustomerWorkOrder = {
        id: editingWorkOrder
          ? editingWorkOrder.id
          : `WO-${1000 + Date.now()}`,

        service,

        technician: editingWorkOrder
          ? editingWorkOrder.technician
          : "Unassigned",

        status: editingWorkOrder
          ? editingWorkOrder.status
          : "NEW",

        date: editingWorkOrder
          ? editingWorkOrder.date
          : new Date().toLocaleDateString(),
      };
      console.log("Submitting:", newWorkOrder);

      onSubmit(newWorkOrder);

      toast.success(
        editingWorkOrder
          ? "Work Order Updated Successfully!"
          : "Service Request Submitted Successfully!"
      );
    };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Create Service Request
          </DialogTitle>

        </DialogHeader>

          <DialogDescription>
            Fill in the details below to create a new work order.
          </DialogDescription>
              <div className="space-y-2">
                <Label>Service Type</Label>

                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="">Select Service</option>
                  <option>AC Repair</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Painting</option>
                  <option>Cleaning</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label>Preferred Date</Label>

                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Time</Label>

                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

              </div>

              <div className="space-y-2">
                <Label>Address</Label>

                <Textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>

                <Textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
      <div className="mt-8 flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button onClick={handleSubmit}>
          Submit Request
        </Button>
        

      </div>
      </DialogContent>
    </Dialog>
  );
}