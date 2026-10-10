import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RecruiterProvider } from './context/RecruiterContext';
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
import Profile from './pages/Profile';
import Accounts from './pages/Accounts';

import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import HROutreach from './pages/HROutreach';

// Layout for authenticated pages
const ProtectedLayout = () => {
  const isAuthenticated = !!localStorage.getItem('user');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    return localStorage.getItem('devdash_sidebar_expanded') === 'true';
  });

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => {
      const next = !prev;
      localStorage.setItem('devdash_sidebar_expanded', String(next));
      return next;
    });
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-[#F4F7FD] dark:bg-slate-950 min-h-screen font-poppins text-slate-900 dark:text-slate-50">
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
      <RecruiterProvider>
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
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/coding-profiles" element={<Navigate to="/accounts" replace />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/hr-outreach" element={<HROutreach />} />
              <Route path="/portfolio" element={<Navigate to="/u/me" replace />} />
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
      </RecruiterProvider>
    </ThemeProvider>
  );
};

export default App;
