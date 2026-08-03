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
        `transition-colors duration-200 ${
          isActive
            ? "text-blue-600 font-semibold"
            : "text-slate-600 hover:text-blue-600"
        }`
      }
    >
      {label}
    </NavLink>
  );
}