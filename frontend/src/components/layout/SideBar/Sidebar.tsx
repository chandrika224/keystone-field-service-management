import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarLogo from "./SidebarLogo";
import SidebarNavigation from "./SidebarNavigation";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Sidebar() {
  const { collapsed } = useSidebar();

  return (
    <aside>
    <SidebarHeader />

    <SidebarNavigation />

    <SidebarFooter />
</aside>
  );
}