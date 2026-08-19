import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import type { Site } from "@/services/siteService";

import {
  temporarySiteCoordinates,
} from "@/data/manager/siteCoordinates";

import "leaflet/dist/leaflet.css";

interface ManagerSitesMapProps {
  sites: Site[];
  selectedSite: Site | null;
  onView: (site: Site) => void;
}

export default function ManagerSitesMap({
  sites,
  selectedSite,
  onView,
}: ManagerSitesMapProps) {

  return (
    <div className="h-[600px] overflow-hidden rounded-lg border">

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sites.map((site) => {

          /*
           * Temporary coordinates.
           *
           * The backend currently does not provide
           * latitude/longitude, so we get them from
           * the temporary coordinate mapping.
           */
          const coordinates =
            temporarySiteCoordinates[site.id];

          /*
           * If this site doesn't have temporary
           * coordinates, don't render a marker.
           *
           * The site will still appear in the
           * Sites List.
           */
          if (!coordinates) {
            return null;
          }

          const isSelected =
            selectedSite?.id === site.id;

          return (
            <Marker
              key={site.id}
              position={coordinates}
            >

              <Popup>

                <div className="min-w-[220px] space-y-3">

                  {/* Site information */}

                  <div>

                    <h3 className="font-semibold">
                      {site.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {site.customerName}
                    </p>

                  </div>

                  {/* Address and work orders */}

                  <div className="space-y-1 text-sm">

                    <p>
                      📍 {site.address}
                    </p>

                    <p>
                      Active Work Orders:{" "}
                      <strong>
                        {site.activeWorkOrders}
                      </strong>
                    </p>

                  </div>

                  {/* Select site */}

                  <button
                    type="button"
                    className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                    onClick={() => onView(site)}
                  >
                    Select Site
                  </button>

                </div>

              </Popup>

            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}