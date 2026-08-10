import { NavLink } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";
import type { SidebarNavigationItem } from "./types";

interface SidebarItemProps {
  item: SidebarNavigationItem;
}

export default function SidebarItem({
  item,
}: SidebarItemProps) {
  const { collapsed } = useSidebar();

  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
        flex items-center
        rounded-lg
        px-4
        py-3
        transition-all

        ${
          collapsed
            ? "justify-center"
            : "gap-3"
        }

        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-muted-foreground hover:bg-muted"
        }
        `
      }
    >
      <Icon size={20} />

      {!collapsed && (
        <span>{item.title}</span>
      )}
    </NavLink>
  );
}