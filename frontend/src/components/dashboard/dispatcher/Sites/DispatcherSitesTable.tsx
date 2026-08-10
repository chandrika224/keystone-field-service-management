import { Button } from "@/components/ui/button";

import type { DispatcherSite } from "@/data/dispatcher/sites";

interface DispatcherSitesTableProps {
  sites: DispatcherSite[];
  search: string;
  onView: (site: DispatcherSite) => void;
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
      site.customer.toLowerCase().includes(searchValue) ||
      site.address.toLowerCase().includes(searchValue) ||
      site.city.toLowerCase().includes(searchValue) ||
      site.state.toLowerCase().includes(searchValue) ||
      site.postalCode.toLowerCase().includes(searchValue)
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
                      {site.id}
                    </p>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  {site.customer}
                </td>

                {/* Location */}
                <td className="px-6 py-4">
                  <div>
                    <p>
                      {site.city}, {site.state}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {site.postalCode}
                    </p>
                  </div>
                </td>

                {/* Active Work Orders */}
                <td className="px-6 py-4">
                  {site.activeWorkOrders}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log("Site View clicked:", site);
                      onView(site);
                    }}
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