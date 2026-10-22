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

import ScrollToTop from './components/ScrollToTop';
import FeaturesPage from './pages/FeaturesPage';
import DeveloperLinkPage from './pages/DeveloperLinkPage';
import IntegrationsPage from './pages/IntegrationsPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import DocsPage from './pages/DocsPage';
import CommunityPage from './pages/CommunityPage';
import OpenSourcePage from './pages/OpenSourcePage';
import StatusPage from './pages/StatusPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

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
    <div className="flex bg-[#F4F7FD] dark:bg-slate-950 min-h-screen font-poppins text-slate-900 dark:text-slate-50 overflow-x-hidden max-w-full">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen min-w-0 max-w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full min-w-0 max-w-full">
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
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/developer-link" element={<DeveloperLinkPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<Navigate to="/contact" replace />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/open-source" element={<OpenSourcePage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

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
