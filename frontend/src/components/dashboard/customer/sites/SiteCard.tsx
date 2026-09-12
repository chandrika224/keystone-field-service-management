import {
  Building2,
  ClipboardList,
  MapPin,
  MoreVertical,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Site } from "@/types/site";

interface SiteCardProps {
  site: Site;
  onView: (site: Site) => void;
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
  onViewWorkOrders: (site: Site) => void;
}

export default function SiteCard({
  site,
  onView,
  onEdit,
  onDelete,
  onViewWorkOrders,
}: SiteCardProps) {
  const openWorkOrders = site.activeWorkOrders ?? 0;

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>

          <CardTitle className="truncate text-lg">
            {site.name}
          </CardTitle>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label={`Actions for ${site.name}`}
          >
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(site)}>
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onViewWorkOrders(site)}
            >
              View Work Orders
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit(site)}>
              Edit Site
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => onDelete(site)}
              className="text-destructive focus:text-destructive"
            >
              Delete Site
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

          <p className="text-sm leading-6 text-muted-foreground">
            {site.address}
          </p>
        </div>

        {/* Work order information */}
        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">
              Open Work Orders
            </span>
          </div>

          <span className="font-semibold">
            {openWorkOrders}
          </span>
        </div>

        {/* Site status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-sm font-medium">
              Active
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewWorkOrders(site)}
          >
            View Work Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}