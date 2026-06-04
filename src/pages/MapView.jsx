import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet's default icon paths in React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Dummy data for your presentation demo
const activeCases = [
  { id: 1, lat: 19.0760, lng: 72.8777, animal: 'Dog', issue: 'Hit by a bike, injured leg', urgency: 'High' },
  { id: 2, lat: 19.0850, lng: 72.8890, animal: 'Cow', issue: 'Eating plastic near dump', urgency: 'Medium' },
  { id: 3, lat: 19.0620, lng: 72.8650, animal: 'Cat', issue: 'Stuck inside drainage pipe', urgency: 'High' },
];

export default function MapView() {
  // Centered roughly around Mumbai
  const mapCenter = [19.0760, 72.8777];

  return (
    <div className="p-4 md:p-8 h-[calc(100vh-76px)] flex flex-col max-w-6xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🗺️ Live Rescue Map</h2>
        <p className="text-gray-600 text-sm">
          Real-time view of active emergency cases. Nearest volunteers will be alerted.
        </p>
      </div>
      
      {/* Map Container - Must have a defined height! */}
      <div className="flex-grow rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 z-0">
        <MapContainer center={mapCenter} zoom={13} className="h-full w-full">
          
          {/* OpenStreetMap completely free tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Loop through our active cases and plot them */}
          {activeCases.map((rescue) => (
            <Marker key={rescue.id} position={[rescue.lat, rescue.lng]}>
              <Popup>
                <div className="p-1 min-w-[150px]">
                  <h3 className="font-bold text-lg mb-1">{rescue.animal} Rescue</h3>
                  <p className="text-sm text-gray-600 mb-3">{rescue.issue}</p>
                  <span className={`px-2 py-1 text-xs font-bold rounded text-white ${rescue.urgency === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {rescue.urgency} Priority
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>
    </div>
  );
}