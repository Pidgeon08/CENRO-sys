import { Trash2, Ship, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.heat';

// Mock data for heatmap (Creek in San Fernando, La Union, Luzon)
const addressPoints = [
  [16.6332, 120.3191, 0.8], // Carlatan Creek bridge area
  [16.6325, 120.3200, 0.6], // Slightly upstream
  [16.6315, 120.3210, 0.9], // Upstream
  [16.6340, 120.3180, 0.7], // Downstream towards lagoon
  [16.6350, 120.3165, 0.5], // Near lagoon outlet
  [16.6305, 120.3225, 0.4], // Further upstream in the creek
];

function HeatmapLayer({ points }) {
  const map = useMap();
  
  useEffect(() => {
    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}
    }).addTo(map);
    
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

const Dashboard = () => {
  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-1">Dashboard</h1>
        <p className="text-text-secondary">Overview of fleet operations and waste collection.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="p-6 flex flex-col min-h-[450px] glass-card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Recent Activity Map</h3>
          </div>
          <div className="flex-1 rounded-md overflow-hidden border border-slate-200">
            <MapContainer center={[16.6332, 120.3191]} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <HeatmapLayer points={addressPoints} />
            </MapContainer>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="p-6 flex items-start gap-4 glass-card">
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-blue-500/10 text-blue-500">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-secondary mb-2">Trash collected this week</h4>
              <div className="text-3xl font-bold mb-2 flex items-baseline gap-1">
                2,300 <span className="text-base text-text-secondary font-medium">kg</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success-color">
                <ArrowUpRight size={16} />
                <span>12.5% vs last week</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex items-start gap-4 glass-card">
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-indigo-500/10 text-indigo-500">
              <Ship className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-secondary mb-2">Total Deployments this week</h4>
              <div className="text-3xl font-bold mb-2 flex items-baseline gap-1">67</div>
              <div className="flex items-center gap-1 text-sm font-medium text-danger-color">
                <ArrowDownRight size={16} />
                <span>1.5% vs last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
