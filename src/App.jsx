import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateReport from './pages/CreateReport';
import Profile from './pages/Profile';
import Login from './pages/Login'; 

function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ['/create', '/login'] ;   // Tambahkan path lain jika ingin menyembunyikan Header di situ juga

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <main className={hideHeaderRoutes.includes(location.pathname) ? '' : 'pt-28'}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
