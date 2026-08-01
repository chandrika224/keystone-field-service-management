import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export default function Loader({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <LoaderCircle
        className={`${sizeClasses[size]} animate-spin text-blue-600`}
      />

      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}