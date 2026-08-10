import { Input } from "@/components/ui/input";

interface DispatcherSitesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DispatcherSitesToolbar({
  search,
  onSearchChange,
}: DispatcherSitesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <Input
        placeholder="Search site..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:w-80"
      />
    </div>
  );
}