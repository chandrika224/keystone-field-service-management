import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  ManagerStaff,
  StaffRole,
  BackendStaffRole,
  CreateStaffRequest,
} from "@/data/manager/staff";

import {
  createStaff,
  mapStaffResponse,
} from "@/services/staffService";

import { toast } from "sonner";


interface ManagerAddStaffDrawerProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  onAddStaff: (
    staff: ManagerStaff,
    temporaryPassword: string
  ) => void;
}


export default function ManagerAddStaffDrawer({
  open,
  onOpenChange,
  onAddStaff,
}: ManagerAddStaffDrawerProps) {

  /* --------------------------------------------------
     FORM STATE
  -------------------------------------------------- */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [role, setRole] =
    useState<StaffRole>("Dispatcher");

  const [specialization, setSpecialization] =
    useState("");

  /* --------------------------------------------------
     SUBMITTING STATE
  -------------------------------------------------- */

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  /* --------------------------------------------------
     SUBMIT FORM
  -------------------------------------------------- */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();


    /* ------------------------------------------------
       BASIC VALIDATION
    ------------------------------------------------ */

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !specialization.trim()
    ) {

      toast.error(
        "Please fill in all required fields."
      );

      return;
    }


    try {

      setIsSubmitting(true);


      /* ------------------------------------------------
         SPLIT FULL NAME
      ------------------------------------------------ */

      const nameParts =
        name.trim().split(/\s+/);

      const firstName =
        nameParts[0];

      const lastName =
        nameParts.slice(1).join(" ");


      if (!lastName) {

        toast.error(
          "Please enter both first name and last name."
        );

        return;
      }


      /* ------------------------------------------------
         ROLE CONVERSION

         Frontend:
         Dispatcher
         Technician

         Backend:
         DISPATCHER
         TECHNICIAN
      ------------------------------------------------ */

      const backendRole: BackendStaffRole =
        role === "Dispatcher"
          ? "DISPATCHER"
          : "TECHNICIAN";


      /* ------------------------------------------------
         CREATE BACKEND REQUEST
      ------------------------------------------------ */

      const payload: CreateStaffRequest = {

        firstName,

        lastName,

        email:
          email.trim(),

        phone:
          phone.trim(),

        role:
          backendRole,

        specialization:
          specialization.trim(),
      };


      console.log(
        "Sending request:",
        payload
      );


      /* ------------------------------------------------
         CALL POST /api/staff
      ------------------------------------------------ */

      const response =
        await createStaff(payload);


      console.log(
        "Backend response:",
        response
      );


      /* ------------------------------------------------
         CONVERT BACKEND RESPONSE

         Backend response:

         {
           id: 13,
           firstName: "Rahul",
           lastName: "Sharma",
           email: "...",
           role: "DISPATCHER",
           active: true,
           temporaryPassword: "KS-..."
         }
      ------------------------------------------------ */

      const newStaff =
        mapStaffResponse(response);


      /* ------------------------------------------------
         SEND DATA TO ManagerStaff.tsx

         Send:
         1. Staff
         2. Temporary password
      ------------------------------------------------ */

      const tempPassword = response.temporaryPassword;

        if (!tempPassword) {
          throw new Error("Temporary password was not returned by the API.");
        }

        onAddStaff(newStaff, tempPassword);

      /* ------------------------------------------------
         RESET FORM
      ------------------------------------------------ */

      resetForm();


      /* ------------------------------------------------
         CLOSE DRAWER
      ------------------------------------------------ */

      onOpenChange(false);

    }

    catch (error) {

      console.error(
        "Failed to create staff:",
        error
      );


      toast.error(
        "Failed to add staff",
        {
          description:
            "Unable to create the staff member.",
        }
      );

    }

    finally {

      setIsSubmitting(false);

    }

  };


  /* --------------------------------------------------
     RESET FORM
  -------------------------------------------------- */

  const resetForm = () => {

    setName("");

    setEmail("");

    setPhone("");

    setRole("Dispatcher");

    setSpecialization("");

  };


  /* --------------------------------------------------
     HANDLE DRAWER CLOSE
  -------------------------------------------------- */

  const handleClose = (
    value: boolean
  ) => {

    if (!value) {
      resetForm();
    }

    onOpenChange(value);

  };


  /* --------------------------------------------------
     UI
  -------------------------------------------------- */

  return (

    <Sheet
      open={open}
      onOpenChange={handleClose}
    >

      <SheetContent
        className="w-full overflow-y-auto sm:max-w-lg"
      >

        <SheetHeader>

          <SheetTitle>
            Add Staff
          </SheetTitle>

          <SheetDescription>
            Add a dispatcher or technician to your organization.
          </SheetDescription>

        </SheetHeader>


        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          {/* ----------------------------------------
              NAME
          ---------------------------------------- */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Full Name
            </label>

            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter employee name"
              disabled={isSubmitting}
            />

          </div>


          {/* ----------------------------------------
              EMPLOYEE ID

              Currently frontend-only.

              Backend POST /api/staff does not
              accept employeeId yet.
          ---------------------------------------- */}


          {/* ----------------------------------------
              EMAIL
          ---------------------------------------- */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Company Email
            </label>

            <Input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="employee@company.com"
              disabled={isSubmitting}
            />

          </div>


          {/* ----------------------------------------
              PHONE
          ---------------------------------------- */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Phone
            </label>

            <Input
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="+91 9876543210"
              disabled={isSubmitting}
            />

          </div>


          {/* ----------------------------------------
              ROLE
          ---------------------------------------- */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Role
            </label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(
                  value as StaffRole
                )
              }
              disabled={isSubmitting}
            >

              <SelectTrigger>

                <SelectValue
                  placeholder="Select role"
                />

              </SelectTrigger>


              <SelectContent>

                <SelectItem value="Dispatcher">
                  Dispatcher
                </SelectItem>

                <SelectItem value="Technician">
                  Technician
                </SelectItem>

              </SelectContent>

            </Select>

          </div>


          {/* ----------------------------------------
              SPECIALIZATION
          ---------------------------------------- */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Specialization
            </label>

            <Input
              value={specialization}
              onChange={(event) =>
                setSpecialization(
                  event.target.value
                )
              }
              placeholder="e.g. HVAC, Electrical"
              disabled={isSubmitting}
            />

          </div>


          {/* ----------------------------------------
              ACTIONS
          ---------------------------------------- */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleClose(false)
              }
              disabled={isSubmitting}
            >
              Cancel
            </Button>


            <Button
              type="submit"
              disabled={isSubmitting}
            >

              {isSubmitting
                ? "Creating..."
                : "Add Staff"}

            </Button>

          </div>

        </form>

      </SheetContent>

    </Sheet>

  );
}