import { Trash2, Ship, ArrowUpRight, MapPin, Calendar, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
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
    let heat;
    let timer;

    const initHeatLayer = () => {
      const size = map.getSize();
      if (size.x === 0 || size.y === 0) {
        timer = setTimeout(initHeatLayer, 50);
        return;
      }

      // Ensure map is correctly sized
      map.invalidateSize();

      heat = L.heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {0.4: '#3b82f6', 0.6: '#06b6d4', 0.7: '#10b981', 0.8: '#eab308', 1.0: '#ef4444'}
      }).addTo(map);
    };

    initHeatLayer();
    
    return () => {
      if (heat) {
        map.removeLayer(heat);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [map, points]);

  return null;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Monthly');

  // Most trash collected list
  const topCreeks = [
    { name: 'Carlatan Creek', bags: 23, max: 25 },
    { name: 'Biday Creek', bags: 23, max: 25 },
    { name: 'Catbangen River', bags: 18, max: 25 },
    { name: 'San Fernando Creek', bags: 15, max: 25 },
    { name: 'Poro Coastal Line', bags: 12, max: 25 },
  ];

  // Recent activities list
  const recentActivities = [
    { text: 'Bot 02 completed cleanup at Carlatan', time: '14 mins ago', type: 'info' },
    { text: 'System alert: Bot 05 battery low (15%)', time: '45 mins ago', type: 'warn' },
    { text: 'Collection report submitted for Barangay Biday', time: '2 hours ago', type: 'success' },
    { text: 'Bot 01 successfully deployed at Catbangen', time: '4 hours ago', type: 'info' },
    { text: 'Scheduled maintenance completed for Bot 03', time: '1 day ago', type: 'success' },
  ];

  // Creek conditions list
  const creekConditions = [
    { name: 'Carlatan Creek', status: 'Critical', color: 'red' },
    { name: 'Biday Creek', status: 'Warning', color: 'yellow' },
    { name: 'San Fernando Creek', status: 'Normal', color: 'green' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-12">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1.5 font-medium">Welcome back, John</p>
      </header>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
        
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Trash Collected */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative group hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-200">
              <div className="p-6 pb-0 flex items-start gap-4">
                {/* Circular Placeholder */}
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-slate-900 truncate">Trash Collected by Bots</h3>
                  <div className="flex items-baseline gap-2.5 mt-2">
                    <span className="text-3xl font-bold text-slate-950 tracking-tight">67</span>
                    <span className="text-sm font-semibold text-slate-500">Bags</span>
                    <div className="flex items-center text-xs font-semibold text-red-500 ml-1">
                      <ArrowUpRight className="w-4 h-4 mr-0.5" />
                      <span>35.1% vs last week</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Custom SVG Wave graph (Blue) */}
              <div className="w-full h-16 mt-6 relative overflow-hidden rounded-b-2xl">
                <svg className="w-full h-full" viewBox="0 0 340 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,52 C60,42 90,12 130,22 C170,32 210,4 270,38 C300,55 320,40 340,48 L340,64 L0,64 Z" 
                    fill="url(#blueGrad)" 
                  />
                  <path 
                    d="M0,52 C60,42 90,12 130,22 C170,32 210,4 270,38 C300,55 320,40 340,48" 
                    fill="none" 
                    stroke="#2563eb" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
            {/* Card 2: Deployed Cleaning */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden relative group hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-200">
              <div className="p-6 pb-0 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Ship className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-slate-900 truncate">Deployed Cleaning in Barangays</h3>
                  <div className="flex items-baseline gap-2.5 mt-2">
                    <span className="text-3xl font-bold text-slate-950 tracking-tight">34</span>
                    <span className="text-sm font-semibold text-slate-500">Bots</span>
                    <div className="flex items-center text-xs font-semibold text-[#10b981] ml-1">
                      <ArrowUpRight className="w-4 h-4 mr-0.5" />
                      <span>24.3% vs last week</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Custom SVG Wave graph (Green) */}
              <div className="w-full h-16 mt-6 relative overflow-hidden rounded-b-2xl">
                <svg className="w-full h-full" viewBox="0 0 340 64" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,54 C40,48 70,22 110,32 C150,42 190,8 240,24 C280,36 310,25 340,38 L340,64 L0,64 Z" 
                    fill="url(#greenGrad)" 
                  />
                  <path 
                    d="M0,54 C40,48 70,22 110,32 C150,42 190,8 240,24 C280,36 310,25 340,38" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
          </div>
          
          {/* Map Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col min-h-[550px]">
            {/* Map Header with Tabs */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5">
              <h2 className="text-[17px] font-bold text-slate-900">Collective Hotspots</h2>
              
              {/* Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {['Today', 'Weekly', 'Monthly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                      activeTab === tab 
                        ? 'bg-[#1b4de4] text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                
                {/* Custom Tab with Calendar Icon */}
                <button
                  onClick={() => setActiveTab('Custom')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 transition-all duration-200 ${
                    activeTab === 'Custom' 
                      ? 'bg-[#1b4de4] text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Custom</span>
                  <Calendar className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            {/* Leaflet map container */}
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-100 relative min-h-[380px] shadow-inner">
              <MapContainer center={[16.6332, 120.3191]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <HeatmapLayer points={addressPoints} />
              </MapContainer>
            </div>
            
            {/* Gradient scale legend bar */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">low concentration</span>
              <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 via-cyan-400 via-emerald-400 via-yellow-400 to-red-500 rounded-full"></div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">high concentration</span>
            </div>
          </div>
          
        </div>
        
        {/* Right Section / Panels */}
        <div className="flex flex-col gap-6">
          
          {/* Card 1: Most Trash Collected */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-slate-900">Most Trash Collected</h2>
              <button className="text-xs font-semibold text-slate-500 hover:text-[#1b4de4] border border-slate-200 rounded-lg px-2.5 py-1 transition-all cursor-pointer">
                View all
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {topCreeks.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs font-bold text-slate-900 mb-1.5">
                      <span className="truncate">{item.name}</span>
                      <span className="shrink-0">{item.bags} Bags</span>
                    </div>
                    {/* Progress bar container */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1b4de4] rounded-full transition-all duration-500" 
                        style={{ width: `${(item.bags / item.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Card 2: Recent Activities */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-slate-900">Recent Activities</h2>
              <button className="text-xs font-semibold text-slate-500 hover:text-[#1b4de4] border border-slate-200 rounded-lg px-2.5 py-1 transition-all cursor-pointer">
                View all
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {/* Timeline indicator circle */}
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400/80"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 leading-normal break-words">{act.text}</p>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Card 3: Creek Conditions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-slate-900">Creek Conditions</h2>
              <button className="text-xs font-semibold text-slate-500 hover:text-[#1b4de4] border border-slate-200 rounded-lg px-2.5 py-1 transition-all cursor-pointer">
                View in map
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {creekConditions.map((creek, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate">{creek.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[11px] font-semibold ${
                      creek.color === 'red' ? 'text-red-500' : 
                      creek.color === 'yellow' ? 'text-yellow-600' : 'text-emerald-500'
                    }`}>
                      {creek.status}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${
                      creek.color === 'red' ? 'bg-red-500 shadow-[0_0_6px_#ef4444]' : 
                      creek.color === 'yellow' ? 'bg-yellow-400 shadow-[0_0_6px_#facc15]' : 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;

