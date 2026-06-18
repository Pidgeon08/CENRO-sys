import { NavLink } from 'react-router-dom';
import { Home, Map, FileText, Settings as SettingsIcon, LogOut, Menu } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const getNavLinkClass = (isActive) => 
    `group/nav flex items-center px-6 py-3.5 text-sidebar-text no-underline transition-all duration-200 whitespace-nowrap bg-transparent border-none w-full cursor-pointer font-inherit text-base hover:bg-sidebar-hover relative ${
      isActive ? 'bg-sidebar-active before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-400' : ''
    }`;

  const getIconClass = (isActive) =>
    `w-6 h-6 min-w-[1.5rem] transition-opacity duration-200 ${
      isActive ? 'opacity-100' : 'opacity-80 group-hover/nav:opacity-100'
    }`;

  return (
    <aside className="w-20 bg-sidebar-bg text-sidebar-text flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[4px_0_10px_rgba(0,0,0,0.1)] z-10 overflow-hidden hover:w-64 group">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Menu className="w-6 h-6 min-w-[1.5rem] opacity-100 text-blue-400" />
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)} title="Dashboard">
          {({ isActive }) => (
            <>
              <Home className={getIconClass(isActive)} />
              <span className="ml-6 opacity-0 transition-all duration-300 ease translate-x-[-10px] font-medium group-hover:opacity-100 group-hover:translate-x-0">Dashboard</span>
            </>
          )}
        </NavLink>
        
        <NavLink to="/heatmap" className={({ isActive }) => getNavLinkClass(isActive)} title="Heatmap">
          {({ isActive }) => (
            <>
              <Map className={getIconClass(isActive)} />
              <span className="ml-6 opacity-0 transition-all duration-300 ease translate-x-[-10px] font-medium group-hover:opacity-100 group-hover:translate-x-0">Heatmap</span>
            </>
          )}
        </NavLink>
        
        <NavLink to="/reports" className={({ isActive }) => getNavLinkClass(isActive)} title="Reports">
          {({ isActive }) => (
            <>
              <FileText className={getIconClass(isActive)} />
              <span className="ml-6 opacity-0 transition-all duration-300 ease translate-x-[-10px] font-medium group-hover:opacity-100 group-hover:translate-x-0">Reports</span>
            </>
          )}
        </NavLink>
        
        <NavLink to="/settings" className={({ isActive }) => getNavLinkClass(isActive)} title="Settings">
          {({ isActive }) => (
            <>
              <SettingsIcon className={getIconClass(isActive)} />
              <span className="ml-6 opacity-0 transition-all duration-300 ease translate-x-[-10px] font-medium group-hover:opacity-100 group-hover:translate-x-0">Settings</span>
            </>
          )}
        </NavLink>
      </nav>
      
      <div className="py-6 border-t border-white/5">
        <button 
          onClick={onLogout} 
          className="group/nav flex items-center px-6 py-3.5 text-red-500 hover:bg-red-500/10 hover:text-red-400 no-underline transition-all duration-200 whitespace-nowrap bg-transparent border-none w-full cursor-pointer font-inherit text-base relative" 
          title="Logout"
        >
          <LogOut className="w-6 h-6 min-w-[1.5rem] opacity-80 group-hover/nav:opacity-100 transition-opacity duration-200" />
          <span className="ml-6 opacity-0 transition-all duration-300 ease translate-x-[-10px] font-medium group-hover:opacity-100 group-hover:translate-x-0">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
