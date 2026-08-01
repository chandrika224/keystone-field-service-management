import UserAvatar from "@/components/common/UserAvatar";
import { ChevronDown } from "lucide-react";

export default function UserMenu() {
  return (
    <button className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-100">
      <UserAvatar
        name="John Doe"
        size="sm"
      />

      <div className="text-left">
        <p className="text-sm font-semibold">
          John Doe
        </p>

        <p className="text-xs text-slate-500">
          Dispatcher
        </p>
      </div>

      <ChevronDown size={18} />
    </button>
  );
}