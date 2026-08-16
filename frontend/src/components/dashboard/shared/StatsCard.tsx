import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendType = "neutral",
}: StatsCardProps) {
  return (
    <div className="w-full min-w-0 rounded-2xl border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {title}
          </p>
        </div>

        {/* Icon */}
        {Icon && (
          <div className="shrink-0 rounded-xl bg-muted p-3">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-5">
        <p className="text-3xl font-bold tracking-tight">
          {value}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {/* Trend */}
      {trend && (
        <p
          className={`mt-4 text-sm font-medium ${
            trendType === "positive"
              ? "text-green-600"
              : trendType === "negative"
                ? "text-red-600"
                : "text-muted-foreground"
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  );
}