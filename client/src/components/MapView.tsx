import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapViewProps {
  destination: string;
}

const cityCoordinates: Record<string, [number, number]> = {
  goa: [15.2993, 74.124],
  hyderabad: [17.385, 78.4867],
  delhi: [28.6139, 77.209],
  mumbai: [19.076, 72.8777],
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

export default function MapView({
  destination,
}: MapViewProps) {
  const normalizedDestination = destination
    .trim()
    .toLowerCase();

  const coordinates =
    cityCoordinates[normalizedDestination] ??
    [20.5937, 78.9629];

  const destinationFound =
    normalizedDestination in cityCoordinates;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">
        Trip Location
      </h2>

      <div className="rounded-2xl overflow-hidden border border-slate-800">
        <MapContainer
          key={`${coordinates[0]}-${coordinates[1]}`}
          center={coordinates}
          zoom={destinationFound ? 10 : 5}
          scrollWheelZoom
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
              {destinationFound
                ? destination
                : `${destination} location is not currently available`}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {!destinationFound && (
        <p className="mt-3 text-sm text-amber-400">
          Exact coordinates were not found. Showing the
          default India location.
        </p>
      )}
    </div>
  );
}