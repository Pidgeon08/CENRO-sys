import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.heat';

// Mock data (Creek in San Fernando, La Union, Luzon)
const addressPoints = [
  [16.6332, 120.3191, 0.8], // Carlatan Creek bridge area
  [16.6325, 120.3200, 0.6], // Slightly upstream
  [16.6315, 120.3210, 0.9], // Upstream
  [16.6305, 120.3225, 0.5], // Farther upstream
  [16.6340, 120.3180, 0.7], // Downstream towards lagoon
  [16.6350, 120.3165, 0.4], // Near lagoon outlet
  [16.6360, 120.3150, 0.3], // Near outlet
  [16.6320, 120.3205, 0.8], // Middle upstream section
];

function HeatmapLayer({ points }) {
  const map = useMap();
  
  useEffect(() => {
    const heat = L.heatLayer(points, {
      radius: 30,
      blur: 20,
      maxZoom: 17,
      gradient: {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}
    }).addTo(map);
    
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

const HeatmapView = () => {
  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-1">Heatmap Analysis</h1>
        <p className="text-text-secondary">Detailed view of waste concentration density.</p>
      </header>
      
      <div className="flex-1 p-6 flex flex-col relative min-h-[600px] glass-card">
        <div className="flex-1 rounded-md overflow-hidden border border-slate-200 relative">
          <MapContainer center={[16.6332, 120.3191]} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatmapLayer points={addressPoints} />
          </MapContainer>
          
          <div className="absolute bottom-5 right-5 bg-white/95 p-4 rounded-md shadow-md z-[1000] w-[200px]">
            <span className="block text-sm font-semibold mb-2 text-text-primary">Intensity</span>
            <div className="h-3 bg-gradient-to-r from-blue-600 via-cyan-400 via-lime-400 via-yellow-400 to-red-600 rounded-full mb-1"></div>
            <div className="flex justify-between text-xs text-text-secondary font-medium">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapView;
