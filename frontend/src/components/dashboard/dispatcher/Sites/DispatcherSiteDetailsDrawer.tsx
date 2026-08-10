import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  Building2,
  ClipboardList,
  Hash,
} from "lucide-react";

import type { DispatcherSite } from "@/data/dispatcher/sites";

interface DispatcherSiteDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: DispatcherSite | null;
}

export default function DispatcherSiteDetailsDrawer({
  open,
  onOpenChange,
  site,
}: DispatcherSiteDetailsDrawerProps) {
  if (!site) {
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
            Site Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Site Header */}

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {site.name}
              </h2>

              <p className="text-sm text-muted-foreground">
                {site.id}
              </p>
            </div>

          </div>

          {/* Customer */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Customer
            </h3>

            <div className="flex items-center gap-3">

              <Building2 className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Customer
                </p>

                <p className="font-medium">
                  {site.customer}
                </p>
              </div>

            </div>

          </div>

          {/* Address */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Location
            </h3>

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
                  {site.city}, {site.state} - {site.postalCode}
                </p>
              </div>

            </div>

          </div>

          {/* Work Orders */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Service Information
            </h3>

            <div className="flex items-center gap-3">

              <ClipboardList className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Work Orders
                </p>

                <p className="font-medium">
                  {site.activeWorkOrders}
                </p>
              </div>

            </div>

          </div>

          {/* Site Status */}

          <div>

            <p className="mb-2 text-sm text-muted-foreground">
              Site Status
            </p>

            <Badge variant="default">
              Active
            </Badge>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}