import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Building2,
  MapPin,
  ClipboardList,
} from "lucide-react";

import type { Site } from "@/services/siteService";

interface ManagerSiteDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: Site | null;
}

export default function ManagerSiteDetailsDrawer({
  open,
  onOpenChange,
  site,
}: ManagerSiteDetailsDrawerProps) {

  if (!site) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent className="w-full sm:max-w-md">

        <SheetHeader>

          <SheetTitle>
            Site Details
          </SheetTitle>

        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Site identity */}

          <div>

            <h2 className="text-2xl font-bold">
              {site.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              Site ID: {site.id}
            </p>

          </div>

          {/* Customer */}

          <div className="flex items-start gap-3">

            <Building2 className="mt-1 h-5 w-5 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {site.customerName}
              </p>

              <p className="text-sm text-muted-foreground">
                Customer ID: {site.customerId}
              </p>

            </div>

          </div>

          {/* Address */}

          <div className="flex items-start gap-3">

            <MapPin className="mt-1 h-5 w-5 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Address
              </p>

              <p className="font-medium">
                {site.address}
              </p>

            </div>

          </div>

          {/* Active work orders */}

          <div className="flex items-start gap-3">

            <ClipboardList className="mt-1 h-5 w-5 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Active Work Orders
              </p>

              <p className="text-2xl font-bold">
                {site.activeWorkOrders}
              </p>

            </div>

          </div>

          {/* Site summary */}

          <div className="rounded-lg border bg-muted/40 p-4">

            <p className="font-medium">
              Site Overview
            </p>

            <p className="mt-2 text-sm text-muted-foreground">

              This site belongs to{" "}
              <span className="font-medium">
                {site.customerName}
              </span>{" "}
              and currently has{" "}
              <span className="font-medium">
                {site.activeWorkOrders}
              </span>{" "}
              active work order
              {site.activeWorkOrders === 1
                ? ""
                : "s"}.

            </p>

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}