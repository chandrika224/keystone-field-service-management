import { type ReactNode } from "react";
import { useDropdown } from "./Dropdown";

interface Props {
  children: ReactNode;
}

export default function DropdownTrigger({
  children,
}: Props) {
  const { open, setOpen } = useDropdown();

  return (
    <button
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  );
}