import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TechnicianJobTrackToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export default function TechnicianJobTrackToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: TechnicianJobTrackToolbarProps) {

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">

      <Input
        placeholder="Search job, customer or service..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
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
            All Jobs
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

        </SelectContent>

      </Select>

    </div>
  );
}