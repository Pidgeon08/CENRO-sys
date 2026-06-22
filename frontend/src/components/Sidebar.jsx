import { NavLink } from 'react-router-dom';
import { Home, Map, FileText, Settings as SettingsIcon, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const getNavLinkClass = (isActive) =>
    `flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-[15px] group ${
      isActive ? 'bg-[#1b4de4] text-white shadow-[0_4px_12px_rgba(27,77,228,0.25)]' : ''
    }`;

  const getIconClass = (isActive) =>
    `w-5 h-5 mr-3.5 transition-colors duration-200 ${
      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
    }`;

  return (
    <aside className="w-[260px] bg-[#0c165a] text-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.15)] z-20 shrink-0">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3.5 border-b border-white/5">
        {/* CSS Mockup of San Fernando City Seal */}
        <div className="w-12 h-12 rounded-full border-2 border-[#b45309] bg-gradient-to-br from-blue-700 to-red-600 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.1)] relative shrink-0 overflow-hidden">
          <div className="absolute inset-0.5 rounded-full border border-white/40 flex items-center justify-center bg-blue-900">
            <span className="text-[7px] font-bold text-white text-center leading-[9px] tracking-tighter">CENRO</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base leading-tight tracking-wide text-white">CENRO Aquabot</span>
          <span className="text-xs text-blue-300 font-medium mt-0.5">for cleaner waters</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <Home className={getIconClass(isActive)} />
              <span>Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink to="/heatmap" className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <Map className={getIconClass(isActive)} />
              <span>Heatmap</span>
            </>
          )}
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <FileText className={getIconClass(isActive)} />
              <span>Report Generation</span>
            </>
          )}
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => getNavLinkClass(isActive)}>
          {({ isActive }) => (
            <>
              <SettingsIcon className={getIconClass(isActive)} />
              <span>Settings</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* Footer Block */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-4">
        {/* Logout button */}
        <button
          onClick={onLogout}
          className="flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-[15px] bg-transparent border-none w-full cursor-pointer text-left group"
        >
          <LogOut className="w-5 h-5 mr-3.5 text-slate-400 group-hover:text-white" />
          <span>Logout</span>
        </button>

        {/* User Card */}
        <div className="bg-white/[0.06] border border-white/[0.03] rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-500/30 flex items-center justify-center text-slate-300 font-semibold text-sm">
              JA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">John Admin</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Status online</span>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

