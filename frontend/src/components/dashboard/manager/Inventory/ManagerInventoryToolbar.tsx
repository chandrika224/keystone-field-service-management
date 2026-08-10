import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManagerInventoryToolbarProps {
  search: string;
  category: string;
  status: string;

  categories: string[];
  statuses: string[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  onClearFilters: () => void;
}

export default function ManagerInventoryToolbar({
  search,
  category,
  status,
  categories,
  statuses,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onClearFilters,
}: ManagerInventoryToolbarProps) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Search */}

        <div className="relative flex-1">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search inventory..."
            className="pl-9"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">
            All Status
          </option>

          {statuses.map((item) => (
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
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </Button>

      </div>
    </div>
  );
}