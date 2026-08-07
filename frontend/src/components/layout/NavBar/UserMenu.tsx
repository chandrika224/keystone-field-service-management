import { UserCircle2 } from "lucide-react";


import ProfileDropdown from "./ProfileDropdown";
import Dropdown, { DropdownContent, DropdownTrigger } from "@/common/Dropdown";

export default function UserMenu() {
  return (
    <Dropdown>

      <DropdownTrigger>
        <div
          className="
            flex
            items-center
            gap-2
            rounded-lg
            p-2
            transition-colors
            hover:bg-muted
          "
        >
          <UserCircle2 size={28} />

          <div className="text-left">
            <p className="text-sm font-medium">
              John Doe
            </p>

            <p className="text-xs text-muted-foreground">
              Manager
            </p>
          </div>
        </div>
      </DropdownTrigger>

      <DropdownContent>
        <ProfileDropdown />
      </DropdownContent>

    </Dropdown>
  );
}