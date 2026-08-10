import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface SupportCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function SupportCard({
  title,
  subtitle,
  icon: Icon,
  onClick,
}: SupportCardProps) {
  return (
    <Card
      onClick={onClick}
      className="
        cursor-pointer
        rounded-2xl
        border
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <CardContent className="flex items-center justify-between p-5">

        <div className="flex items-center gap-4">

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

          <div>
            <h3 className="font-semibold">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

        </div>

        <ChevronRight className="h-5 w-5 text-muted-foreground" />

      </CardContent>
    </Card>
  );
}