import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">
      {children}
    </div>
  );
}