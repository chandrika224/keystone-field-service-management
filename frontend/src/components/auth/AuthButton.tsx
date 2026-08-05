import { Button } from "@/components/ui/button";

interface AuthButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function AuthButton({
  disabled = false,
  children,
}: AuthButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="h-12 w-full rounded-xl text-base font-semibold"
    >
      {children}
    </Button>
  );
}