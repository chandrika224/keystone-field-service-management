import { CalendarDays, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ManagerReportsToolbarProps {
  period: string;
  customer: string;
  customers: string[];

  onPeriodChange: (value: string) => void;
  onCustomerChange: (value: string) => void;

  onClearFilters: () => void;
}

export default function ManagerReportsToolbar({
  period,
  customer,
  customers,
  onPeriodChange,
  onCustomerChange,
  onClearFilters,
}: ManagerReportsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center">

      {/* Reporting Period */}

      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />

        <select
          value={period}
          onChange={(event) =>
            onPeriodChange(event.target.value)
          }
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="Last 6 Months">
            Last 6 Months
          </option>

          <option value="This Month">
            This Month
          </option>

          <option value="Last Month">
            Last Month
          </option>

          <option value="This Quarter">
            This Quarter
          </option>

          <option value="This Year">
            This Year
          </option>
        </select>
      </div>

      {/* Customer */}

      <select
        value={customer}
        onChange={(event) =>
          onCustomerChange(event.target.value)
        }
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="All">
          All Customers
        </option>

        {customers.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      {/* Clear */}

      <Button
        type="button"
        variant="outline"
        onClick={onClearFilters}
        className="gap-2 sm:ml-auto"
      >
        <RotateCcw className="h-4 w-4" />
        Clear
      </Button>

    </div>
  );
}