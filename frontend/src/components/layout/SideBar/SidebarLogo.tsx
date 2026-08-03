import logo from "@/assets/logos/keystone_std_logo.svg";
import { useSidebar } from "@/contexts/SidebarContext";

export default function SidebarLogo() {
  const { collapsed } = useSidebar();

  return (
    <img
      src={logo}
      alt="Keystone"
      className={`
        transition-all duration-300
        object-contain
        ${collapsed ? "h-10 w-10" : "h-14 w-auto"}
      `}
    />
  );
}