import { Button } from "@/components/ui/button";

import {
  MapPin,
  ClipboardList,
} from "lucide-react";

import type { Site } from "@/services/siteService";

interface ManagerSitesListProps {
  sites: Site[];
  onView: (site: Site) => void;
}

export default function ManagerSitesList({
  sites,
  onView,
}: ManagerSitesListProps) {

  console.log(
    "ManagerSitesList received sites:",
    sites
  );

  if (sites.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No sites found.
      </div>
    );
  }

  return (
    <div className="divide-y">

      {sites.map((site) => (

        <div
          key={site.id}
          className="p-5 transition-colors hover:bg-muted/40"
        >

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Site information */}

            <div className="space-y-2">

              {/* Site name */}

              <div>

                <h3 className="text-base font-semibold">
                  {site.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {site.customerName}
                </p>

              </div>

              {/* Address and active work orders */}

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">

                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />

                  {site.address}
                </span>

                <span className="flex items-center gap-1">
                  <ClipboardList className="h-4 w-4" />

                  {site.activeWorkOrders} active work orders
                </span>

              </div>

            </div>

            {/* View button */}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onView(site)}
            >
              View
            </Button>

          </div>

        </div>

      ))}

    </div>
  );
}