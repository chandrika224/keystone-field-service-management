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
} from "@/data/manager/staff";

interface ManagerAddStaffDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStaff: (staff: ManagerStaff) => void;
}

export default function ManagerAddStaffDrawer({
  open,
  onOpenChange,
  onAddStaff,
}: ManagerAddStaffDrawerProps) {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [role, setRole] =
    useState<StaffRole>("Dispatcher");

  const [specialization, setSpecialization] =
    useState("");

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !employeeId.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !specialization.trim()
    ) {
      return;
    }

    const newStaff: ManagerStaff = {
      id: `STAFF-${Date.now()}`,
      employeeId: employeeId.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      specialization: specialization.trim(),
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    onAddStaff(newStaff);

    resetForm();

    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setEmployeeId("");
    setEmail("");
    setPhone("");
    setRole("Dispatcher");
    setSpecialization("");
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      resetForm();
    }

    onOpenChange(value);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={handleClose}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">

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

          {/* Name */}

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
            />
          </div>

          {/* Employee ID */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Employee ID
            </label>

            <Input
              value={employeeId}
              onChange={(event) =>
                setEmployeeId(event.target.value)
              }
              placeholder="EMP-001"
            />
          </div>

          {/* Email */}

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
            />
          </div>

          {/* Phone */}

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
            />
          </div>

          {/* Role */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Role
            </label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(value as StaffRole)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
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

          {/* Specialization */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Specialization
            </label>

            <Input
              value={specialization}
              onChange={(event) =>
                setSpecialization(event.target.value)
              }
              placeholder="e.g. HVAC, Electrical"
            />
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleClose(false)
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              Add Staff
            </Button>

          </div>

        </form>

      </SheetContent>
    </Sheet>
  );
}