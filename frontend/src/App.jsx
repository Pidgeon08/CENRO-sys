import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import HeatmapView from './pages/Admin/HeatmapView';
import Reports from './pages/Admin/Reports';
import Settings from './pages/Admin/Settings';
import ManageBots from './pages/Admin/Manage-bots';
import UserManagement from './pages/Admin/UserManagement';
import Requests from './pages/Admin/Requests';
import CollectionSchedule from './pages/Admin/CollectionSchedule';
import AuditLogs from './pages/Admin/AuditLogs';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('admin');

  const handleLogin = (type = 'admin') => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Main Layout wrapper */}
        <Route element={<Layout isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} userType={userType} />}>

          {/* Root redirect: Send user to their specific dashboard on login */}
          <Route path="/" element={<Navigate to={`/${userType === 'mayorsoffice' ? 'mayorsoffice/requests' : userType + '/dashboard'}`} replace />} />

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userType} allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/manage-bots" element={<ManageBots />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/requests" element={<Requests />} />
            <Route path="/admin/collection" element={<CollectionSchedule />} />
            <Route path="/admin/heatmap" element={<HeatmapView />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/audit" element={<AuditLogs />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>

          {/* MAYOR'S OFFICE ROUTES */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userType} allowedRoles={['mayorsoffice']} />}>
            <Route path="/mayorsoffice/requests" element={<Requests />} />
          </Route>

          {/* SPEARHEAD ROUTES */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} userRole={userType} allowedRoles={['spearhead']} />}>
            <Route path="/spearhead/requests" element={<Requests />} />
            <Route path="/spearhead/heatmap" element={<HeatmapView />} />
            <Route path="/spearhead/reports" element={<Reports />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
