import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SidebarFooter() {
  return (
    <div className="border-t p-4">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
      >
        <LogOut size={18} />
        Logout
      </Button>
    </div>
  );
}