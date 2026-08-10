import { useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { getSidebarNavigation } from "./navigation";

export default function SidebarNavigation() {
  const location = useLocation();

  const role = location.pathname.split("/")[1];

  const navigation = getSidebarNavigation(role);

  return (
    <nav className="space-y-2 px-4">
      {navigation.map((item) => (
        <SidebarItem
          key={item.path}
          item={item}
        />
      ))}
    </nav>
  );
}