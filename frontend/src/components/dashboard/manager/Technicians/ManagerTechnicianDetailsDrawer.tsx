import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";

import type { Technician } from "@/types/technician";

interface ManagerTechnicianDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technician: Technician | null;
  loading: boolean;
  error: string | null;
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function ManagerTechnicianDetailsDrawer({
  open,
  onOpenChange,
  technician,
  loading,
  error,
}: ManagerTechnicianDetailsDrawerProps) {
  const fullName = technician
    ? `${technician.firstName} ${technician.lastName}`
    : "";

  const availability = technician
    ? technician.available
      ? "Available"
      : "Unavailable"
    : "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Technician Profile</SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading technician details...
            </p>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
          >
            <p className="font-medium text-destructive">
              Could not load technician details
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : technician ? (
          <div className="space-y-6 py-5">
            {/* Profile header */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {getInitials(technician.firstName, technician.lastName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">{fullName}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Technician ID: #{technician.id}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline">Technician</Badge>
                  <Badge
                    variant={technician.active ? "default" : "destructive"}
                  >
                    {technician.active ? "Active account" : "Inactive account"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Availability summary */}
            <section className="rounded-xl border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current availability
                    </p>
                    <p className="font-semibold">{availability}</p>
                  </div>
                </div>

                <Badge
                  variant={
                    technician.active && technician.available
                      ? "default"
                      : "secondary"
                  }
                >
                  {technician.active && technician.available
                    ? "Ready for assignment"
                    : technician.active
                      ? "Not available"
                      : "Account inactive"}
                </Badge>
              </div>
            </section>

            {/* Technician information */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold">Technician information</h3>

              <div className="divide-y rounded-xl border">
                <div className="flex items-start gap-3 p-4">
                  <Wrench className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Specialization
                    </p>
                    <p className="mt-1 font-medium">
                      {technician.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <UserRound className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full name</p>
                    <p className="mt-1 font-medium">{fullName}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact information */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold">Contact information</h3>

              <div className="divide-y rounded-xl border">
                <div className="flex items-start gap-3 p-4">
                  <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="mt-1 break-all font-medium">
                      {technician.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="mt-1 font-medium">{technician.phone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Account summary */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold">Account summary</h3>

              <div className="flex items-start gap-3 rounded-xl border p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {technician.active ? "Account active" : "Account inactive"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {technician.active
                      ? "This technician account is active."
                      : "This technician account is currently inactive."}
                  </p>
                </div>
              </div>
            </section>

            <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <BriefcaseBusiness className="h-4 w-4" />
                Workload
              </div>
              <p className="mt-1">
                Active job count is not provided by this technician details
                endpoint.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Select a technician to view their profile.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}