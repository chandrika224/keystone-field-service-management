import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { workOrderService } from "@/services/workOrderService";

import type {
  CustomerWorkOrder,
  CustomerWorkOrderRequest,
  WorkOrderPriority,
  ServiceType,
} from "@/types/workOrder";

interface NewWorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (order: CustomerWorkOrder) => void;
  editingWorkOrder?: CustomerWorkOrder | null;
}

/* ---------------------------------------
   UI label → Backend enum mapping
--------------------------------------- */

const SERVICE_OPTIONS: {
  label: string;
  value: ServiceType;
}[] = [
  { label: "Electrical", value: "ELECTRICAL" },
  { label: "Plumbing", value: "PLUMBING" },
  { label: "AC Repair", value: "HVAC" },
  { label: "Appliance Repair", value: "APPLIANCE_REPAIR" },
  { label: "General Maintenance", value: "GENERAL_MAINTENANCE" },
];

export default function NewWorkOrderDialog({
  open,
  onOpenChange,
  onSubmit,
  editingWorkOrder,
}: NewWorkOrderDialogProps) {
  const [serviceType, setServiceType] =
    useState<ServiceType>("PLUMBING");

  const [priority, setPriority] =
    useState<WorkOrderPriority>("MEDIUM");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingWorkOrder) {
      setServiceType(
        (editingWorkOrder.serviceType as ServiceType) ??
          "PLUMBING"
      );

      setPriority(editingWorkOrder.priority);

      setDate(editingWorkOrder.scheduledDate);

      setTime("");

      setAddress(editingWorkOrder.address ?? "");

      setDescription(editingWorkOrder.description);
    } else {
      setServiceType("PLUMBING");
      setPriority("MEDIUM");
      setDate("");
      setTime("");
      setAddress("");
      setDescription("");
    }
  }, [editingWorkOrder, open]);

  const handleSubmit = async () => {
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
      toast.error("Description must be at least 10 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const request: CustomerWorkOrderRequest = {
        title:
          SERVICE_OPTIONS.find(
            (s) => s.value === serviceType
          )?.label ?? "Service Request",

        serviceType,

        address: address.trim(),

        description: description.trim(),

        priority,

        scheduledDate: date,
      };

      let backendOrder;

      if (editingWorkOrder) {
        backendOrder =
          await workOrderService.updateMyWorkOrder(
            Number(editingWorkOrder.id),
            request
          );
      } else {
        backendOrder =
          await workOrderService.createMyWorkOrder(
            request
          );
      }

      const frontendOrder: CustomerWorkOrder = {
        id: String(backendOrder.id),

        title: backendOrder.title,

        serviceType: backendOrder.serviceType,

        address: backendOrder.address,

        description: backendOrder.description,

        priority: backendOrder.priority,

        status: backendOrder.status,

        scheduledDate: backendOrder.scheduledDate,

        service: backendOrder.title,

        technician:
          backendOrder.technicianName ??
          "Unassigned",

        date: backendOrder.scheduledDate,
      };

      onSubmit(frontendOrder);

      toast.success(
        editingWorkOrder
          ? "Work order updated successfully."
          : "Work order created successfully."
      );

      onOpenChange(false);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ??
          "Failed to save work order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingWorkOrder
              ? "Edit Work Order"
              : "Create Service Request"}
          </DialogTitle>

          <DialogDescription>
            {editingWorkOrder
              ? "Update your service request."
              : "Create a new service request."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Service Type</Label>

            <select
              value={serviceType}
              onChange={(e) =>
                setServiceType(
                  e.target.value as ServiceType
                )
              }
              className="w-full rounded-md border px-3 py-2"
              disabled={submitting}
            >
              {SERVICE_OPTIONS.map((service) => (
                <option
                  key={service.value}
                  value={service.value}
                >
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as WorkOrderPriority
                )
              }
              className="w-full rounded-md border px-3 py-2"
              disabled={submitting}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">
                Medium
              </option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preferred Date</Label>

              <Input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Time</Label>

              <Input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                disabled={submitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>

            <Textarea
              rows={3}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              disabled={submitting}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting
              ? editingWorkOrder
                ? "Updating..."
                : "Submitting..."
              : editingWorkOrder
                ? "Update Request"
                : "Submit Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}