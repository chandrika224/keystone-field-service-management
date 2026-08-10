import { Input } from "@/components/ui/input";

interface ManagerCustomersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ManagerCustomersToolbar({
  search,
  onSearchChange,
}: ManagerCustomersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <Input
        placeholder="Search customer..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:w-80"
      />
    </div>
  );
}