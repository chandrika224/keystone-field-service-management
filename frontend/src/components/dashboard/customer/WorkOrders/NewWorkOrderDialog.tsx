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
import { siteService, type Site } from "@/services/siteService";

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

  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [service, setService] = useState("");

  const [priority, setPriority] =
    useState<WorkOrderPriority>("MEDIUM");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [description, setDescription] =
    useState("");

  // ==========================================================
  // SITE STATE
  // ==========================================================

  const [sites, setSites] =
    useState<Site[]>([]);

  const [siteId, setSiteId] =
    useState<number | null>(null);

  const [address, setAddress] =
    useState("");

  const [loadingSites, setLoadingSites] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);


  // ==========================================================
  // LOAD CUSTOMER SITES
  // ==========================================================

  useEffect(() => {

    const loadSites = async () => {

      try {

        setLoadingSites(true);

        /*
         * Get logged-in customer ID.
         *
         * Make sure your application stores the customer ID
         * in localStorage using the key "customerId".
         */
        const storedCustomerId =
          localStorage.getItem("customerId");

        if (!storedCustomerId) {

          console.error(
            "Customer ID not found in localStorage."
          );

          toast.error(
            "Unable to identify the customer."
          );

          return;
        }

        const customerId =
          Number(storedCustomerId);

        if (Number.isNaN(customerId)) {

          console.error(
            "Invalid customer ID:",
            storedCustomerId
          );

          toast.error(
            "Invalid customer information."
          );

          return;
        }

        const customerSites =
          await siteService.getSitesByCustomerId(
            customerId
          );

        console.log(
          "Customer Sites:",
          customerSites
        );

        setSites(customerSites);

        /*
         * If editing an existing work order and
         * the work order has a siteId, select it.
         *
         * Otherwise automatically select the
         * first available site.
         */
        if (
          editingWorkOrder &&
          (editingWorkOrder as any).siteId
        ) {

          const existingSiteId =
            Number(
              (editingWorkOrder as any).siteId
            );

          const existingSite =
            customerSites.find(
              (site) =>
                site.id === existingSiteId
            );

          if (existingSite) {

            setSiteId(existingSite.id);

            setAddress(
              existingSite.address
            );

            return;
          }
        }

        if (customerSites.length > 0) {

          const firstSite =
            customerSites[0];

          setSiteId(firstSite.id);

          setAddress(firstSite.address);

        } else {

          setSiteId(null);

          setAddress("");

        }

      } catch (error) {

        console.error(
          "Failed to load customer sites:",
          error
        );

        toast.error(
          "Failed to load service locations."
        );

        setSites([]);

      } finally {

        setLoadingSites(false);

      }
    };


    if (open) {

      loadSites();

    }

  }, [open, editingWorkOrder]);


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

      setDescription(
        editingWorkOrder.description ?? ""
      );

    } else {

      setService("");

      setPriority("MEDIUM");

      setDate("");

      setTime("");

      setDescription("");

    }

  }, [editingWorkOrder, open]);


  // ==========================================================
  // SITE SELECTION
  // ==========================================================

  const handleSiteChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const selectedId =
      Number(event.target.value);

    if (!selectedId) {

      setSiteId(null);

      setAddress("");

      return;
    }

    setSiteId(selectedId);

    const selectedSite =
      sites.find(
        (site) =>
          site.id === selectedId
      );

    if (selectedSite) {

      setAddress(
        selectedSite.address
      );
    }

  };


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


    if (!siteId) {

      toast.error(
        "Please select a service location."
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


      /*
       * CREATE REQUEST
       *
       * siteId is now sent to the backend.
       */
      const createRequest = {

        title: service,

        description:
          description.trim(),

        priority,

        scheduledDate: date,

        siteId: siteId,
      };


      /*
       * UPDATE REQUEST
       *
       * Keep the existing update request unchanged
       * so we don't accidentally break the existing
       * update-work-order functionality.
       */
      const updateRequest = {

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

            updateRequest
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

        console.log(
          "CREATE WORK ORDER PAYLOAD:",
          createRequest
        );

        backendOrder =
          await workOrderService.createMyWorkOrder(
            createRequest
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
              SERVICE LOCATION
              ================================================== */}

          <div className="space-y-2">

            <Label>
              Service Location
            </Label>


            <select
              value={siteId ?? ""}
              onChange={handleSiteChange}
              disabled={
                loadingSites ||
                sites.length === 0
              }
              className="w-full rounded-md border px-3 py-2"
            >

              <option value="">

                {loadingSites
                  ? "Loading locations..."
                  : sites.length === 0
                    ? "No service locations available"
                    : "Select Service Location"}

              </option>


              {sites.map((site) => (

                <option
                  key={site.id}
                  value={site.id}
                >
                  {site.name}
                </option>

              ))}

            </select>


            {/* Selected site's address */}

            {address && (

              <div className="rounded-md bg-muted p-3">

                <p className="text-sm font-medium">
                  Address
                </p>

                <p className="text-sm text-muted-foreground">
                  {address}
                </p>

              </div>

            )}

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
            disabled={
              submitting ||
              loadingSites
            }
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