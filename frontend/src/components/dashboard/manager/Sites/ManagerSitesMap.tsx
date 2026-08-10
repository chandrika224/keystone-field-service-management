import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import type { ManagerSite } from "@/data/manager/sites";

import "leaflet/dist/leaflet.css";

interface ManagerSitesMapProps {
  sites: ManagerSite[];
  selectedSite: ManagerSite | null;
  onView: (site: ManagerSite) => void;
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

          const isSelected =
            selectedSite?.id === site.id;

          return (
            <Marker
              key={site.id}
              position={[
                site.latitude,
                site.longitude,
              ]}
            >

              <Popup>

                <div className="min-w-[220px] space-y-3">

                  <div>
                    <h3 className="font-semibold">
                      {site.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {site.customer}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm">

                    <p>
                      📍 {site.city}, {site.state}
                    </p>

                    <p>
                      Active Work Orders:{" "}
                      <strong>
                        {site.activeWorkOrders}
                      </strong>
                    </p>

                  </div>

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