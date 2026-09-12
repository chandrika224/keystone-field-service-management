import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SiteCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <Skeleton className="h-5 w-36" />
        </div>

        <Skeleton className="h-9 w-9 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <Skeleton className="mt-1 h-4 w-4 shrink-0 rounded-full" />

          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-5 w-6" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}