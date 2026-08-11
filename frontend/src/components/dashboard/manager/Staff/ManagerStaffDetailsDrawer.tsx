import {
  Mail,
  Phone,
  UserRound,
  Briefcase,
  CalendarDays,
  Hash,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import type { ManagerStaff } from "@/data/manager/staff";

interface ManagerStaffDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: ManagerStaff | null;
}

export default function ManagerStaffDetailsDrawer({
  open,
  onOpenChange,
  staff,
}: ManagerStaffDetailsDrawerProps) {
  if (!staff) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">

        <SheetHeader>
          <SheetTitle>
            Staff Details
          </SheetTitle>

          <SheetDescription>
            View employee information and account status.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Profile */}

          <div className="flex items-center gap-4 rounded-lg border bg-muted/20 p-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <UserRound className="h-7 w-7 text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                {staff.name}
              </h2>

              <p className="text-sm text-muted-foreground">
                {staff.employeeId}
              </p>
            </div>

          </div>

          {/* Role */}

          <div className="flex items-start gap-3">
            <Briefcase className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Role
              </p>

              <p className="font-medium">
                {staff.role}
              </p>
            </div>
          </div>

          {/* Email */}

          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="break-all font-medium">
                {staff.email}
              </p>
            </div>
          </div>

          {/* Phone */}

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="font-medium">
                {staff.phone}
              </p>
            </div>
          </div>

          {/* Employee ID */}

          <div className="flex items-start gap-3">
            <Hash className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Employee ID
              </p>

              <p className="font-medium">
                {staff.employeeId}
              </p>
            </div>
          </div>

          {/* Specialization */}

          <div className="flex items-start gap-3">
            <Briefcase className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Specialization
              </p>

              <p className="font-medium">
                {staff.specialization}
              </p>
            </div>
          </div>

          {/* Joined Date */}

          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Joined Date
              </p>

              <p className="font-medium">
                {staff.joinedDate}
              </p>
            </div>
          </div>

          {/* Status */}

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Account Status
            </p>

            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium ${
                staff.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {staff.status}
            </span>
          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}