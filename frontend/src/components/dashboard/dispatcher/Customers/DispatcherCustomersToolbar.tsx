import { Input } from "@/components/ui/input";

interface DispatcherCustomerToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DispatcherCustomerToolbar({
  search,
  onSearchChange,
}: DispatcherCustomerToolbarProps) {
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