import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DispatcherTechniciansToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string | null) => void;
}

export default function DispatcherTechniciansToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: DispatcherTechniciansToolbarProps) {
 return (
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <Input
      placeholder="Search technician..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="md:w-80"
    />

    <Select
      value={status}
      onValueChange={(value) => onStatusChange(value)}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">All</SelectItem>
        <SelectItem value="Available">Available</SelectItem>
        <SelectItem value="Busy">Busy</SelectItem>
      </SelectContent>
    </Select>

  </div>
);
}