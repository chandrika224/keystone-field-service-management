interface StatsGridProps {
  children: React.ReactNode;
}

export default function StatsGrid({
  children,
}: StatsGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}