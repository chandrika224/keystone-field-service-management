import {
  Building2,
  ClipboardList,
  MapPin,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";


import { Button } from "@/components/ui/button";

import type { Site } from "@/types/site";

interface SiteDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: Site | null;
  onEdit: (site: Site) => void;
  onViewWorkOrders: (site: Site) => void;
}

export default function SiteDetailsDrawer({
  open,
  onOpenChange,
  site,
  onEdit,
  onViewWorkOrders,
}: SiteDetailsDrawerProps) {
  if (!site) {
    return null;
  }

  const openWorkOrders = site.activeWorkOrders ?? 0;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>

            <span>{site.name}</span>
          </SheetTitle>

          <SheetDescription>
            Details and service information for this site.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />

              <p className="text-sm font-medium">
                Service Address
              </p>
            </div>

            <p className="rounded-lg border bg-muted/30 p-4 text-sm leading-6">
              {site.address}
            </p>
          </div>

          {/* Work Orders */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />

              <p className="text-sm font-medium">
                Open Work Orders
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
              <span className="text-sm text-muted-foreground">
                Currently open
              </span>

              <span className="text-xl font-semibold">
                {openWorkOrders}
              </span>
            </div>
          </div>

          {/* Site ID */}
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Site ID
            </p>

            <p className="text-sm text-muted-foreground">
              #{site.id}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onEdit(site)}
            >
              Edit Site
            </Button>

            <Button
              className="flex-1"
              onClick={() => onViewWorkOrders(site)}
            >
              View Work Orders
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}