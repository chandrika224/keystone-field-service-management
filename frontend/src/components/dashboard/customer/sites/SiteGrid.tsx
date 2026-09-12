import type { Site } from "@/types/site";
import SiteCard from "./SiteCard";

interface SiteGridProps {
  sites: Site[];
  onView: (site: Site) => void;
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
  onViewWorkOrders: (site: Site) => void;
}

export default function SiteGrid({
  sites,
  onView,
  onEdit,
  onDelete,
  onViewWorkOrders,
}: SiteGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sites.map((site) => (
        <SiteCard
          key={site.id}
          site={site}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewWorkOrders={onViewWorkOrders}
        />
      ))}
    </div>
  );
}