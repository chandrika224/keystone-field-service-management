import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WorkOrdersToolbar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left Side */}
      <div className="flex flex-1 gap-4">

        <div className="relative w-full md:max-w-sm">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search work orders..."
            className="pl-9"
          />

        </div>

        <select
          className="
            rounded-md
            border
            bg-background
            px-3
            py-2
            text-sm
          "
        >
          <option>All Status</option>
          <option>NEW</option>
          <option>ASSIGNED</option>
          <option>IN_PROGRESS</option>
          <option>COMPLETED</option>
        </select>

      </div>

      {/* Right Side */}

      <Button>
        + New Request
      </Button>

    </div>
  );
}