import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import {
  Mail,
  Phone,
  Briefcase,
  User,
} from "lucide-react";

import type { Technician } from "@/types/technician";

interface DispatcherTechnicianDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technician: Technician | null;
  onChangeStatus: (technician: Technician) => void;
}

export default function DispatcherTechnicianDetailsDrawer({
  open,
  onOpenChange,
  technician,
  onChangeStatus,
}: DispatcherTechnicianDetailsDrawerProps) {
  if (!technician) {
    return null;
  }

  const technicianName =
    `${technician.firstName} ${technician.lastName}`.trim();

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">

        <SheetHeader>
          <SheetTitle>
            Technician Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Technician Name */}

          <div>
            <h2 className="text-2xl font-bold">
              {technicianName}
            </h2>

            <p className="text-muted-foreground">
              Technician ID: {technician.id}
            </p>
          </div>

          {/* Details */}

          <div className="space-y-4">

            {/* Specialization */}

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Specialization
                </p>

                <p className="font-medium">
                  {technician.specialization}
                </p>
              </div>
            </div>

            {/* Phone */}

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Phone
                </p>

                <p className="font-medium">
                  {technician.phone}
                </p>
              </div>
            </div>

            {/* Email */}

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {technician.email}
                </p>
              </div>
            </div>

            {/* Active Jobs */}

            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Jobs
                </p>

                <p className="font-medium">
                  Not available
                </p>
              </div>
            </div>

          </div>

          {/* Account Status */}

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Account Status
            </p>

            <Badge
              variant={
                technician.active
                  ? "default"
                  : "destructive"
              }
            >
              {technician.active
                ? "Active"
                : "Inactive"}
            </Badge>
          </div>

          {/* Availability */}

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Availability
            </p>

            <Badge
              variant={
                technician.available
                  ? "default"
                  : "destructive"
              }
            >
              {technician.available
                ? "Available"
                : "Unavailable"}
            </Badge>
          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}