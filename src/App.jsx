import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateReport from './pages/CreateReport';
import Profile from './pages/Profile';
import Login from './pages/Login'; 

function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ['/create', '/login'];

  const shouldHideHeader = hideHeaderRoutes.some((path) => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideHeader && <Header />}
      <main className={shouldHideHeader ? '' : 'pt-28'}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />

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
