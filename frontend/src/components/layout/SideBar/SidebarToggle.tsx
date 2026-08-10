import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function SidebarToggle() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="rounded-md p-2 transition hover:bg-muted"
    >
      {collapsed ? (
        <PanelLeftOpen size={20} />
      ) : (
        <PanelLeftClose size={20} />
      )}
    </button>
  );
}