import type { LucideIcon } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({
  actions,
}: QuickActionsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            onClick={action.onClick}
            className="
              flex
              items-start
              gap-4
              rounded-2xl
              border
              bg-card
              p-5
              text-left
              transition-all
              hover:border-primary
              hover:shadow-md
            "
          >
            <div className="rounded-xl bg-primary/10 p-3">
              <Icon className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                {action.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}