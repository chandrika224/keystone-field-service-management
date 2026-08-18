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

import type { Technician } from "@/types/workOrder";

interface ManagerTechnicianDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technician: Technician | null;
}

export default function ManagerTechnicianDetailsDrawer({
  open,
  onOpenChange,
  technician,
}: ManagerTechnicianDetailsDrawerProps) {
  if (!technician) {
    return null;
  }

  const fullName =
    `${technician.firstName} ${technician.lastName}`.trim() ||
    "Unknown Technician";

  const technicianStatus =
    technician.active ? "Available" : "Inactive";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Technician Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-muted-foreground">Technician ID: {technician.id}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Specialization</p>
                <p className="font-medium">{technician.specialization}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{technician.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{technician.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <p className="font-medium">{technician.activeJobs ?? 0}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">Current Status</p>
            <Badge
              variant={technician.active ? "default" : "destructive"}
            >
              {technicianStatus}
            </Badge>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-sm font-medium">Manager View</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Technician availability and job status are managed through the technician workflow.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}