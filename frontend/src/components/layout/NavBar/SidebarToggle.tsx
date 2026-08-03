import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="rounded-lg p-2 transition hover:bg-slate-100"
    >
      <PanelLeft className="h-5 w-5" />
    </button>
  );
}