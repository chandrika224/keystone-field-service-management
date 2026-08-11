import type {
  TechnicianScheduleItem,
} from "@/data/technician/schedule";

import TechnicianScheduleCard
  from "@/components/dashboard/technician/Schedule/TechnicianScheduleCard";

interface TechnicianScheduleListProps {
  items: TechnicianScheduleItem[];
  onView: (item: TechnicianScheduleItem) => void;
}

export default function TechnicianScheduleList({
  items,
  onView,
}: TechnicianScheduleListProps) {

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center">

        <p className="text-sm font-medium">
          No scheduled jobs
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no jobs assigned to you for this date.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {items.map((item) => (
        <TechnicianScheduleCard
          key={item.id}
          item={item}
          onView={onView}
        />
      ))}

    </div>
  );
}