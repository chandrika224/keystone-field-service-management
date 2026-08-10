import { Input } from "@/components/ui/input";

interface ManagerSitesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ManagerSitesToolbar({
  search,
  onSearchChange,
}: ManagerSitesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <Input
        placeholder="Search site or customer..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:w-80"
      />
    </div>
  );
}