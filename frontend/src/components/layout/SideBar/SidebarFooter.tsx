import { LogOut, UserCircle2 } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function SidebarFooter() {
  const { collapsed } = useSidebar();

  return (
    <div className="border-t p-4">
      <button className="flex w-full items-center rounded-lg p-2 hover:bg-muted">
        <UserCircle2 size={22} />

        {!collapsed && (
          <div className="ml-3 text-left">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Manager</p>
          </div>
        )}
      </button>

      <button className="mt-3 flex w-full items-center rounded-lg p-2 text-red-600 hover:bg-red-50">
        <LogOut size={20} />

        {!collapsed && (
          <span className="ml-3">Logout</span>
        )}
      </button>
    </div>
  );
}