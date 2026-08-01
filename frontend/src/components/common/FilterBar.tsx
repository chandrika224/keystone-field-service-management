import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RotateCcw } from "lucide-react";

interface FilterBarProps {
  children: ReactNode;
  onReset?: () => void;
}

export default function FilterBar({
  children,
  onReset,
}: FilterBarProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {children}
        </div>

        {/* Right Section */}
        {onReset && (
          <Button
            variant="outline"
            onClick={onReset}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </Button>
        )}

      </div>

      <Separator />

    </div>
  );
}