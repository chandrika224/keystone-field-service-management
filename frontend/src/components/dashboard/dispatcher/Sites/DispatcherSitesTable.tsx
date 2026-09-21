import { Button } from "@/components/ui/button";

import type { Site } from "@/types/site";

interface DispatcherSitesTableProps {
  sites: Site[];
  search: string;
  onView: (site: Site) => void;
}

export default function DispatcherSitesTable({
  sites,
  search,
  onView,
}: DispatcherSitesTableProps) {

  const searchValue = search.toLowerCase().trim();

  const filteredSites = sites.filter((site) => {

    if (!searchValue) {
      return true;
    }

    return (
      site.name.toLowerCase().includes(searchValue) ||
      (site.customerName ?? "").toLowerCase().includes(searchValue) ||
      site.address.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="overflow-x-auto rounded-lg border">

      <table className="w-full">

        <thead className="bg-muted">

          <tr>

            <th className="px-6 py-4 text-left">
              Site
            </th>

            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Location
            </th>

            <th className="px-6 py-4 text-left">
              Active Work Orders
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredSites.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No sites found.
              </td>

            </tr>

          ) : (

            filteredSites.map((site) => (

              <tr
                key={site.id}
                className="border-t"
              >

                {/* Site */}

                <td className="px-6 py-4">

                  <div>

                    <p className="font-medium">
                      {site.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      #{site.id}
                    </p>

                  </div>

                </td>

                {/* Customer */}

                <td className="px-6 py-4">
                  {site.customerName ?? "Unknown"}
                </td>

                {/* Location */}

                <td className="px-6 py-4">

                  <p>
                    {site.address}
                  </p>

                </td>

                {/* Active Work Orders */}

                <td className="px-6 py-4">
                  {site.activeWorkOrders ?? 0}
                </td>

                {/* Action */}

                <td className="px-6 py-4 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(site)}
                  >
                    View
                  </Button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}