import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MySitesHeaderProps {
  onAddSite: () => void;
}

export default function MySitesHeader({
  onAddSite,
}: MySitesHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">
          My Sites
        </h1>

        <p className="text-muted-foreground">
          Manage your registered service locations and
          their associated work orders.
        </p>
      </div>

      <Button onClick={onAddSite}>
        <Plus className="mr-2 h-4 w-4" />
        Add New Site
      </Button>
    </div>
  );
}