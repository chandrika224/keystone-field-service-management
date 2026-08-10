import { type ReactNode } from "react";
import { useDropdown } from "./Dropdown";

interface Props {
  children: ReactNode;
}

export default function DropdownContent({
  children,
}: Props) {
  const { open } = useDropdown();

  return (
    <div
      className={`
        absolute
        right-0
        top-14
        z-50

        transition-all
        duration-200
        ease-out

        ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 -translate-y-3 scale-95"
        }
      `}
    >
      {children}
    </div>
  );
}