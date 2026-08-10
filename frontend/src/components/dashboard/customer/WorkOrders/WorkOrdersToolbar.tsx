import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WorkOrdersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  onNewRequest: () => void;
}

export default function WorkOrdersToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onNewRequest,
}: WorkOrdersToolbarProps){
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left Side */}
      <div className="flex flex-1 gap-4">

        <div className="relative w-full md:max-w-sm">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search work orders..."
            className="pl-9"
          />

        </div>

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="
            rounded-md
            border
            bg-background
            px-3
            py-2
            text-sm
          "
        >
          <option value="ALL">All Status</option>
          <option value="NEW">NEW</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

      </div>

      {/* Right Side */}

      <Button onClick={onNewRequest}>
        + New Request
      </Button>

    </div>
  );
}