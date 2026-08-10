import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ManagerWorkOrdersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  priority: string;
  onPriorityChange: (value: string) => void;
}

export default function ManagerWorkOrdersToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}: ManagerWorkOrdersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">

      <Input
        placeholder="Search work order, customer or service..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:w-80"
      />

      <Select
        value={status}
        onValueChange={(value) => {
          if (value !== null) {
            onStatusChange(value);
          }
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All Statuses
          </SelectItem>

          <SelectItem value="NEW">
            New
          </SelectItem>

          <SelectItem value="ASSIGNED">
            Assigned
          </SelectItem>

          <SelectItem value="IN_PROGRESS">
            In Progress
          </SelectItem>

          <SelectItem value="ON_HOLD">
            On Hold
          </SelectItem>

          <SelectItem value="COMPLETED">
            Completed
          </SelectItem>

          <SelectItem value="CLOSED">
            Closed
          </SelectItem>

          <SelectItem value="CANCELLED">
            Cancelled
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={priority}
        onValueChange={(value) => {
          if (value !== null) {
            onPriorityChange(value);
          }
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All Priorities
          </SelectItem>

          <SelectItem value="High">
            High
          </SelectItem>

          <SelectItem value="Medium">
            Medium
          </SelectItem>

          <SelectItem value="Low">
            Low
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}