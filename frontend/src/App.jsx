import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Resume from './pages/Resume';
import PublicProfile from './pages/PublicProfile';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import Loader from './components/Loader';
import Profile from './pages/Profile';
import CodingProfiles from './pages/CodingProfiles';

import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import HROutreach from './pages/HROutreach';

// Layout for authenticated pages
const ProtectedLayout = () => {
  // Simple check: do we have a user in local storage?
  const isAuthenticated = !!localStorage.getItem('user');

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-900 dark:text-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const RootRoute = () => {
  const isAuthenticated = !!localStorage.getItem('user');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LandingPage />;
};

const App = () => {
  return (
    <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/coding-profiles" element={<CodingProfiles />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/hr-outreach" element={<HROutreach />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/u/me" element={<PublicProfile />} />
            </Route>

            {/* Public Profile Route */}
            <Route path="/u/:username" element={<PublicProfile />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
