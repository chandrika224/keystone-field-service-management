import { NavLink } from "react-router-dom";
import type { SidebarItemType } from "./types";

interface SidebarItemProps {
  item: SidebarItemType;
}

export default function SidebarItem({
  item,
}: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-all
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`
      }
    >
      <Icon size={20} />

      <span>{item.title}</span>
    </NavLink>
  );
}