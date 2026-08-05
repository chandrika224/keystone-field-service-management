import { Checkbox } from "@/components/ui/checkbox";

interface RememberMeProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function RememberMe({
  checked,
  onCheckedChange,
}: RememberMeProps) {
  return (
    <div className="flex items-center gap-2">

      <Checkbox
        checked={checked}
        onCheckedChange={(value) =>
          onCheckedChange(Boolean(value))
        }
      />

      <span className="text-sm">
        Remember me
      </span>

    </div>
  );
}