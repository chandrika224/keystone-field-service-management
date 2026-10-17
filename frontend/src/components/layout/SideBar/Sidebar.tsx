import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";

export default function Sidebar() {
  return (
    <aside>
      <SidebarHeader />
      <SidebarNavigation />
      <SidebarFooter />
    </aside>
  );
}