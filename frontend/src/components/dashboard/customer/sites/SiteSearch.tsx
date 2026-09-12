import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SiteSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SiteSearch({
  value,
  onChange,
}: SiteSearchProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search sites by name or address..."
        className="pl-10 pr-10"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}