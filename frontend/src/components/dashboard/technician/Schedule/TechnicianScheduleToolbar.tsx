import { CalendarDays, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TechnicianScheduleToolbarProps {
  selectedDate: string;
  onDateChange: (value: string) => void;
  onToday: () => void;
  onClear: () => void;
}

export default function TechnicianScheduleToolbar({
  selectedDate,
  onDateChange,
  onToday,
  onClear,
}: TechnicianScheduleToolbarProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* Date */}

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />

          <input
            type="date"
            value={selectedDate}
            onChange={(event) =>
              onDateChange(event.target.value)
            }
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Today */}

        <Button
          type="button"
          variant="outline"
          onClick={onToday}
        >
          Today
        </Button>

        {/* Clear */}

        <Button
          type="button"
          variant="outline"
          onClick={onClear}
          className="gap-2 sm:ml-auto"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </Button>

      </div>
    </div>
  );
}