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

  onSave: (staff: ManagerStaff) => void;
}

export default function ManagerEditStaffDrawer({
  open,
  onOpenChange,
  staff,
  onSave,
}: ManagerEditStaffDrawerProps) {

  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [role, setRole] =
    useState<StaffRole>("Dispatcher");

  const [specialization, setSpecialization] =
    useState("");

  useEffect(() => {
    if (!staff) {
      return;
    }

    setName(staff.name);
    setEmployeeId(staff.employeeId);
    setEmail(staff.email);
    setPhone(staff.phone);
    setRole(staff.role);
    setSpecialization(staff.specialization);
  }, [staff]);

  if (!staff) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const updatedStaff: ManagerStaff = {
      ...staff,
      name: name.trim(),
      employeeId: employeeId.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      specialization: specialization.trim(),
    };

    onSave(updatedStaff);

    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">

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

          {/* Specialization */}

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
            />
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Changes
            </Button>

          </div>

        </form>

      </SheetContent>
    </Sheet>
  );
}