import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import type { SidebarItemType } from "./types";

interface SidebarProps {
  menu: SidebarItemType[];
}

export default function Sidebar({
  menu,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      {/* Logo */}

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          MERIDIAN
        </h1>

        <p className="text-sm text-slate-500">
          Field Service Management
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {menu.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
          />
        ))}

      </nav>

      <SidebarFooter />

    </aside>
  );
}