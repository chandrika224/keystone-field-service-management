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

import { workOrderService } from "@/services/workOrderService";

import { toast } from "sonner";

import type {
  CustomerWorkOrder,
  WorkOrderPriority,
} from "@/types/workOrder";

import { useEffect, useState } from "react";


// ============================================================
// PROPS
// ============================================================

interface NewWorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onSubmit: (order: CustomerWorkOrder) => void;

  editingWorkOrder?: CustomerWorkOrder | null;
}


// ============================================================
// COMPONENT
// ============================================================

export default function NewWorkOrderDialog({
  open,
  onOpenChange,
  onSubmit,
  editingWorkOrder,
}: NewWorkOrderDialogProps) {

  const [service, setService] = useState("");

  const [priority, setPriority] =
    useState<WorkOrderPriority>("MEDIUM");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [address, setAddress] = useState("");

  const [description, setDescription] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);


  // ==========================================================
  // LOAD EDITING DATA
  // ==========================================================

  useEffect(() => {

    if (editingWorkOrder) {

      setService(
        editingWorkOrder.title
      );

      setPriority(
        editingWorkOrder.priority ?? "MEDIUM"
      );

      setDate(
        editingWorkOrder.scheduledDate ?? ""
      );

      setTime("");

      setAddress("");

      setDescription(
        editingWorkOrder.description ?? ""
      );

    } else {

      setService("");

      setPriority("MEDIUM");

      setDate("");

      setTime("");

      setAddress("");

      setDescription("");
    }

  }, [editingWorkOrder, open]);


  // ==========================================================
  // SUBMIT
  // CREATE OR UPDATE
  // ==========================================================

  const handleSubmit = async () => {

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!service.trim()) {

      toast.error(
        "Please select a service."
      );

      return;
    }


    if (!date) {

      toast.error(
        "Please select a preferred date."
      );

      return;
    }


    if (!time) {

      toast.error(
        "Please select a preferred time."
      );

      return;
    }


    if (!address.trim()) {

      toast.error(
        "Please enter your address."
      );

      return;
    }


    if (description.trim().length < 10) {

      toast.error(
        "Description should be at least 10 characters."
      );

      return;
    }


    // --------------------------------------------------------
    // API REQUEST
    // --------------------------------------------------------

    try {

      setSubmitting(true);


      const request = {

        title: service,

        description:
          description.trim(),

        priority,

        scheduledDate: date,
      };


      let backendOrder;


      // ======================================================
      // UPDATE EXISTING WORK ORDER
      // ======================================================

      if (editingWorkOrder) {

        backendOrder =
          await workOrderService.updateMyWorkOrder(

            Number(
              editingWorkOrder.id
            ),

            request
          );

        console.log(
          "Updated Work Order:",
          backendOrder
        );

      }


      // ======================================================
      // CREATE NEW WORK ORDER
      // ======================================================

      else {

        backendOrder =
          await workOrderService.createMyWorkOrder(
            request
          );

        console.log(
          "Created Work Order:",
          backendOrder
        );
      }


      // ======================================================
      // CONVERT BACKEND RESPONSE
      // TO FRONTEND MODEL
      // ======================================================

      const frontendOrder: CustomerWorkOrder = {

        id: String(
          backendOrder.id
        ),

        title:
          backendOrder.title,

        description:
          backendOrder.description,

        priority:
          backendOrder.priority,

        status:
          backendOrder.status,

        scheduledDate:
          backendOrder.scheduledDate,

        service:
          backendOrder.title,

        technician:
          backendOrder.technicianName ??
          editingWorkOrder?.technician ??
          "Unassigned",

        date:
          backendOrder.scheduledDate,
      };


      // ======================================================
      // SEND TO WORKORDERS PAGE
      // ======================================================

      onSubmit(
        frontendOrder
      );


      // ======================================================
      // SUCCESS MESSAGE
      // ======================================================

      toast.success(

        editingWorkOrder
          ? "Work Order Updated Successfully!"
          : "Service Request Submitted Successfully!"

      );


      onOpenChange(false);


    } catch (error: any) {

      console.error(
        "Failed to save work order:",
        error
      );


      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to save work order.";


      toast.error(

        typeof message === "string"
          ? message
          : "Failed to save work order."

      );


    } finally {

      setSubmitting(false);
    }
  };


  // ==========================================================
  // UI
  // ==========================================================

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
              ? "Update your service request details."
              : "Fill in the details below to create a new work order."}

          </DialogDescription>

        </DialogHeader>


        <div className="space-y-5">


          {/* ==================================================
              SERVICE
              ================================================== */}

          <div className="space-y-2">

            <Label>
              Service Type
            </Label>


            <select
              value={service}
              onChange={(e) =>
                setService(e.target.value)
              }
              className="w-full rounded-md border px-3 py-2"
            >

              <option value="">
                Select Service
              </option>

              <option value="AC Repair">
                AC Repair
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Plumbing">
                Plumbing
              </option>

              <option value="Painting">
                Painting
              </option>

              <option value="Cleaning">
                Cleaning
              </option>

            </select>

          </div>


          {/* ==================================================
              PRIORITY
              ================================================== */}

          <div className="space-y-2">

            <Label>
              Priority
            </Label>


            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as WorkOrderPriority
                )
              }
              className="w-full rounded-md border px-3 py-2"
            >

              <option value="LOW">
                Low
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="HIGH">
                High
              </option>

            </select>

          </div>


          {/* ==================================================
              DATE + TIME
              ================================================== */}

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">

              <Label>
                Preferred Date
              </Label>


              <Input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>


            <div className="space-y-2">

              <Label>
                Preferred Time
              </Label>


              <Input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
              />

            </div>

          </div>


          {/* ==================================================
              ADDRESS
              ================================================== */}

          <div className="space-y-2">

            <Label>
              Address
            </Label>


            <Textarea
              rows={3}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter service address"
            />

          </div>


          {/* ==================================================
              DESCRIPTION
              ================================================== */}

          <div className="space-y-2">

            <Label>
              Description
            </Label>


            <Textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the problem..."
            />

          </div>

        </div>


        {/* ====================================================
            BUTTONS
            ==================================================== */}

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            disabled={submitting}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>


          <Button
            disabled={submitting}
            onClick={handleSubmit}
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