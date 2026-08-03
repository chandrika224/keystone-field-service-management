import SidebarToggle from "../NavBar/SidebarToggle";
import SidebarLogo from "./SidebarLogo";


export default function SidebarHeader() {
  return (
    <div className="flex items-center justify-between border-b px-4 py-4">
      <SidebarLogo />
      <SidebarToggle />
    </div>
  );
}