import {
  Moon,
  Sun,
} from "lucide-react";


import ThemeDropdown from "./ThemeDropdown";
import { useTheme } from "@/contexts/ThemeContext";
import Dropdown, { DropdownContent, DropdownTrigger } from "@/common/Dropdown";

export default function ThemeToggle() {
  const { theme } = useTheme();

  const Icon =
    theme === "dark"
      ? Moon
      : Sun;

  return (
    <Dropdown>

      <DropdownTrigger>

        <div className="rounded-lg p-2 transition-colors hover:bg-muted dark:hover:bg-slate-800">

          <Icon size={20} />

        </div>

      </DropdownTrigger>

      <DropdownContent>

        <ThemeDropdown />

      </DropdownContent>

    </Dropdown>
  );
}