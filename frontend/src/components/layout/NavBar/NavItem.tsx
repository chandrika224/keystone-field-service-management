import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  path: string;
}

export default function NavItem({
  label,
  path,
}: NavItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `transition-colors ${
          isActive
            ? "font-semibold text-blue-600"
            : "text-muted-foreground hover:text-blue-600"
        }`
      }
    >
      {label}
    </NavLink>
  );
}