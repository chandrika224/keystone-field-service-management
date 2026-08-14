import { useEffect, useState } from "react";

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
} from "@/data/manager/staff";

interface ManagerEditStaffDrawerProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  staff: ManagerStaff | null;

  onSave: (staff: ManagerStaff) => Promise<void>;
}

export default function ManagerEditStaffDrawer({
  open,
  onOpenChange,
  staff,
  onSave,
}: ManagerEditStaffDrawerProps) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [role, setRole] =
    useState<StaffRole>("Dispatcher");

  const [specialization, setSpecialization] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  /* -----------------------------------------------
     LOAD STAFF
  ------------------------------------------------ */

  useEffect(() => {

    if (!staff) {
      return;
    }

    console.log(
      "Loading staff into edit drawer:",
      staff
    );

    setName(staff.name);
    setEmail(staff.email);
    setPhone(staff.phone);
    setRole(staff.role);
    setSpecialization(staff.specialization);

  }, [staff]);


  if (!staff) {
    return null;
  }


  /* -----------------------------------------------
     SUBMIT
  ------------------------------------------------ */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    console.log(
      "EDIT FORM SUBMITTED"
    );

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !specialization.trim()
    ) {

      console.log(
        "Validation failed"
      );

      return;
    }


    try {

      setIsSubmitting(true);


      const updatedStaff: ManagerStaff = {

        ...staff,

        name: name.trim(),

        email: email.trim(),

        phone: phone.trim(),

        role,

        specialization:
          specialization.trim(),

      };


      console.log(
        "Sending updated staff to parent:",
        updatedStaff
      );


      await onSave(updatedStaff);


      console.log(
        "Parent update completed successfully"
      );


      onOpenChange(false);

    } catch (error) {

      console.error(
        "Failed to update staff:",
        error
      );

    } finally {

      setIsSubmitting(false);

    }
  };


  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        className="w-full overflow-y-auto sm:max-w-lg"
      >

        <SheetHeader>

          <SheetTitle>
            Edit Staff
          </SheetTitle>

          <SheetDescription>
            Update employee information and role.
          </SheetDescription>

        </SheetHeader>


        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          {/* NAME */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Full Name
            </label>

            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              disabled={isSubmitting}
            />

          </div>


          {/* EMPLOYEE ID */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Employee ID
            </label>

            <Input
              value={staff.employeeId}
              disabled
              className="bg-muted"
            />

            <p className="text-xs text-muted-foreground">
              Employee ID is generated automatically
              and cannot be changed.
            </p>

          </div>


          {/* EMAIL */}

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
              disabled={isSubmitting}
            />

          </div>


          {/* PHONE */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Phone
            </label>

            <Input
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              disabled={isSubmitting}
            />

          </div>


          {/* ROLE */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Role
            </label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(value as StaffRole)
              }
              disabled={isSubmitting}
            >

              <SelectTrigger>
                <SelectValue />
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


          {/* SPECIALIZATION */}

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
              disabled={isSubmitting}
            />

          </div>


          {/* ACTIONS */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >

              {isSubmitting
                ? "Saving..."
                : "Save Changes"}

            </Button>

          </div>

        </form>

      </SheetContent>

    </Sheet>
  );
}