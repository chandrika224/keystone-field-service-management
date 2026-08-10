import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Mail,
  Phone,
  Briefcase,
  User,
} from "lucide-react";

import type { Technician } from "@/types/workOrder";

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
  if (!technician) return null;

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
          <div>
            <h2 className="text-2xl font-bold">
              {technician.name}
            </h2>

            <p className="text-muted-foreground">
              {technician.id}
            </p>
          </div>

          <div className="space-y-4">
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

            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Jobs
                </p>

                <p className="font-medium">
                  {technician.currentJobs}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Current Status
            </p>

            <Badge
              variant={
                technician.status === "Available"
                  ? "default"
                  : "destructive"
              }
            >
              {technician.status}
            </Badge>
          </div>

          <Button
            className="w-full"
            onClick={() => onChangeStatus(technician)}
          >
            Change Availability
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}