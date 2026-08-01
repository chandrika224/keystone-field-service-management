import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
    >
      <Moon size={20} />
    </Button>
  );
}