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
  Navigation,
} from "lucide-react";

import type { ManagerSite } from "@/data/manager/sites";

interface ManagerSiteDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: ManagerSite | null;
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

            <p className="text-muted-foreground">
              {site.id}
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
                {site.customer}
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

              <p className="text-sm text-muted-foreground">
                {site.city}, {site.state}
              </p>

              <p className="text-sm text-muted-foreground">
                {site.postalCode}
              </p>

            </div>

          </div>

          {/* Coordinates */}

          <div className="flex items-start gap-3">

            <Navigation className="mt-1 h-5 w-5 text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Coordinates
              </p>

              <p className="font-medium">
                {site.latitude.toFixed(4)},{" "}
                {site.longitude.toFixed(4)}
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
              This site belongs to {site.customer} and
              currently has {site.activeWorkOrders} active
              work order
              {site.activeWorkOrders === 1 ? "" : "s"}.
            </p>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}