import type { ReactNode } from "react";

interface StatsGridProps {
  children: ReactNode;
}

export default function StatsGrid({
  children,
}: StatsGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6

        sm:grid-cols-2

        xl:grid-cols-4
      "
    >
      {children}
    </div>
  );
}