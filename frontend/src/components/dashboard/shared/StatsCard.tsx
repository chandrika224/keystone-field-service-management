import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: "up" | "down";
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendType = "up",
}: StatsCardProps) {
  return (
    <Card
      className="
        rounded-2xl
        border
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <CardContent className="space-y-5 p-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              {value}
            </h2>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-primary/10
            "
          >
            <Icon className="h-6 w-6 text-primary" />
          </div>

        </div>

        {/* Trend */}
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trendType === "up"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {trendType === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}

            <span>{trend}</span>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

      </CardContent>
    </Card>
  );
}