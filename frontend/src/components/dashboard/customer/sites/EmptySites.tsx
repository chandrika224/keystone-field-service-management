import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface EmptySitesProps {
  onAddSite: () => void;
}

export default function EmptySites({
  onAddSite,
}: EmptySitesProps) {
  return (
    <Card>
      <CardContent className="flex min-h-[360px] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-xl font-semibold">
          No Sites Yet
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          You haven't added any service locations yet.
          Create your first site to start requesting
          services from Keystone.
        </p>

        <Button
          className="mt-6"
          onClick={onAddSite}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Site
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          You need at least one site before creating a
          work order.
        </p>
      </CardContent>
    </Card>
  );
}