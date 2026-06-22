import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ isAuthenticated, onLogout }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 p-8 overflow-y-auto relative bg-[#f8fafc]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
