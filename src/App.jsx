import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import ReportCase from './pages/ReportCase';
import MapView from './pages/MapView';
import Login from './pages/Login';
import VolunteerDashboard from './pages/VolunteerDashboard';
import NGODashboard from './pages/NGODashboard';

function App() {
  return (
    <BrowserRouter>
      {/* Temporary Navbar for Development */}
      <nav className="bg-emerald-600 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-white font-semibold text-sm md:text-base">
          <div className="flex gap-4 md:gap-6">
            <Link to="/" className="hover:text-emerald-200">Home</Link>
            <Link to="/report" className="hover:text-emerald-200">🚨 Report Case</Link>
            <Link to="/map" className="hover:text-emerald-200">🗺️ Live Map</Link>
          </div>
          
          <div className="flex gap-4 items-center">
            {/* Quick links to jump to dashboards during your demo */}
            <Link to="/volunteer" className="text-xs text-emerald-200 hover:text-white hidden md:block">Vol Hub</Link>
            <Link to="/ngo" className="text-xs text-emerald-200 hover:text-white hidden md:block">NGO Admin</Link>
            
            <Link to="/login" className="bg-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-800 transition md:ml-2">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/report" element={<ReportCase />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/ngo" element={<NGODashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;