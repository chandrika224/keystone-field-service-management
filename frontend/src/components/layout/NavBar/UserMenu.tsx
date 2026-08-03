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
            hover:bg-slate-100
          "
        >
          <UserCircle2 size={28} />

          <div className="text-left">
            <p className="text-sm font-medium">
              John Doe
            </p>

            <p className="text-xs text-slate-500">
              Manager
            </p>
          </div>
        </div>
      </DropdownTrigger>

      <DropdownContent>
        <ProfileDropdown open={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </DropdownContent>

    </Dropdown>
  );
}