import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ManagerTechniciansToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export default function ManagerTechniciansToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: ManagerTechniciansToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">

      <Input
        placeholder="Search technician or specialization..."
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
            All Technicians
          </SelectItem>

          <SelectItem value="Available">
            Available
          </SelectItem>

          <SelectItem value="Busy">
            Busy
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}