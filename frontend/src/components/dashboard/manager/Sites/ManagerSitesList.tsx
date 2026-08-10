import { Button } from "@/components/ui/button";
import { MapPin, ClipboardList } from "lucide-react";

import type { ManagerSite } from "@/data/manager/sites";

interface ManagerSitesListProps {
  sites: ManagerSite[];
  onView: (site: ManagerSite) => void;
}

export default function ManagerSitesList({
  sites,
  onView,
}: ManagerSitesListProps) {
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

              <div>
                <h3 className="font-semibold">
                  {site.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {site.customer}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">

                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {site.city}, {site.state}
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
              onClick={() => {
                console.log(
                  "View button clicked:",
                  site
                );

                onView(site);
              }}
            >
              View
            </Button>

          </div>
        </div>
      ))}
    </div>
  );
}