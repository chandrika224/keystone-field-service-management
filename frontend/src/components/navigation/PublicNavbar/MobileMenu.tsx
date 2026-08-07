import { Menu } from "lucide-react";

export default function MobileMenu() {
  return (
    <button className="md:hidden p-2 rounded-lg hover:bg-muted">
      <Menu size={24} />
    </button>
  );
}