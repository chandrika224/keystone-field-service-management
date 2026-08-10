import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value = "",
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}