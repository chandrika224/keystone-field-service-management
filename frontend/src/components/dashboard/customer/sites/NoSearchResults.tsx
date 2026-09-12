import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface NoSearchResultsProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export default function NoSearchResults({
  searchQuery,
  onClearSearch,
}: NoSearchResultsProps) {
  return (
    <Card>
      <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Search className="h-7 w-7 text-muted-foreground" />
        </div>

        <h2 className="text-xl font-semibold">
          No Sites Found
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          We couldn't find any sites matching{" "}
          <span className="font-medium text-foreground">
            "{searchQuery}"
          </span>
          .
        </p>

        <Button
          variant="outline"
          className="mt-6"
          onClick={onClearSearch}
        >
          <X className="mr-2 h-4 w-4" />
          Clear Search
        </Button>
      </CardContent>
    </Card>
  );
}