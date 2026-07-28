import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface Trip {
  destination?: string;
}

interface MapSectionProps {
  trip: Trip;
}

delete (L.Icon.Default.prototype as unknown as {
  _getIconUrl?: unknown;
})._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cityCoordinates: Record<
  string,
  [number, number]
> = {
  mumbai: [19.076, 72.8777],
  delhi: [28.6139, 77.209],
  goa: [15.2993, 74.124],
  hyderabad: [17.385, 78.4867],
  chennai: [13.0827, 80.2707],
  bengaluru: [12.9716, 77.5946],
  bangalore: [12.9716, 77.5946],
  kolkata: [22.5726, 88.3639],
  jaipur: [26.9124, 75.7873],
  kochi: [9.9312, 76.2673],
  visakhapatnam: [17.6868, 83.2185],
  vijayawada: [16.5062, 80.648],
  machilipatnam: [16.1905, 81.1362],
  pune: [18.5204, 73.8567],
  agra: [27.1767, 78.0081],
  varanasi: [25.3176, 82.9739],
  mysuru: [12.2958, 76.6394],
  ooty: [11.4102, 76.695],
  manali: [32.2432, 77.1892],
  shimla: [31.1048, 77.1734],
};

function MapSection({
  trip,
}: MapSectionProps) {
  const originalDestination =
    trip?.destination?.trim() || "Destination";

  const normalizedDestination =
    originalDestination.toLowerCase();

  const destinationFound =
    normalizedDestination in cityCoordinates;

  const coordinates: [number, number] =
    cityCoordinates[normalizedDestination] ??
    [20.5937, 78.9629];

  return (
    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-8">
      <h2 className="text-3xl font-bold mb-6">
        🗺️ Route Explorer
      </h2>

      <div className="rounded-3xl overflow-hidden border border-slate-700">
        <MapContainer
          key={`${coordinates[0]}-${coordinates[1]}`}
          center={coordinates}
          zoom={destinationFound ? 11 : 5}
          scrollWheelZoom={true}
          style={{
            height: "450px",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={coordinates}>
            <Popup>
              <strong>
                {originalDestination}
              </strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {!destinationFound && (
        <p className="mt-4 text-amber-400">
          Exact coordinates for{" "}
          {originalDestination} were not found.
          Showing the default India map.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold">
            🚗 Route
          </h3>

          <p className="text-gray-400 mt-3">
            Airport → Hotel → Attractions
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold">
            📍 Nearby
          </h3>

          <p className="text-gray-400 mt-3">
            Popular tourist locations near{" "}
            {originalDestination}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-xl font-bold">
            ⏱ Travel Time
          </h3>

          <p className="text-gray-400 mt-3">
            Estimated 30–45 minutes
          </p>
        </div>
      </div>
    </div>
  );
}

export default MapSection;