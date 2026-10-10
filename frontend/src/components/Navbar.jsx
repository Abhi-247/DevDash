import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Bell, Menu, X, Sun, Moon, ChevronDown, LogOut, Settings, 
    User, ExternalLink, LayoutDashboard, FileText, Code2, FolderKanban, 
    Briefcase, BarChart3, Target, Link as LinkIcon, Layers, CheckCircle2, AlertCircle, Award,
    Mail, Plus
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logodevdash.png';

const Navbar = ({ toggleSidebar, isSidebarExpanded }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    
    // Auth User
    const [user, setUser] = useState(() => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    });

    useEffect(() => {
        const handleUserUpdate = () => {
            const userStr = localStorage.getItem('user');
            setUser(userStr ? JSON.parse(userStr) : null);
        };
        window.addEventListener('userUpdated', handleUserUpdate);
        window.addEventListener('storage', handleUserUpdate);
        return () => {
            window.removeEventListener('userUpdated', handleUserUpdate);
            window.removeEventListener('storage', handleUserUpdate);
        };
    }, []);

    // States
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Mock Notifications State
    const [notifications, setNotifications] = useState([
        { id: 1, text: "GitHub repository sync completed successfully.", type: "success", time: "10m ago", read: false, icon: CheckCircle2 },
        { id: 2, text: "LeetCode rating fetched. +15 points in Weekly Contest!", type: "award", time: "2h ago", read: false, icon: Award },
        { id: 3, text: "Complete your portfolio details to boost recruiter visits.", type: "info", time: "1d ago", read: true, icon: AlertCircle }
    ]);

    // Refs for outside click detection
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const searchRef = useRef(null);

    // Close menus on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Logout Handler
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/logout`, {}, {
                withCredentials: true 
            });
        } catch (error) {
            console.error("Failed to log out from server:", error);
        } finally {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    // Sidebar items repeated for Mobile Menu
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Layers, label: 'Accounts', path: '/accounts' },
        { icon: FolderKanban, label: 'Projects & Systems', path: '/projects' },
        { icon: FileText, label: 'Resume & ATS', path: '/resume' },
        { icon: Mail, label: 'HR Outreach CRM', path: '/hr-outreach' },
        { icon: Briefcase, label: 'Public Showcase', path: '/u/me' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const quickLinks = [
        { label: 'Go to Profile', path: '/profile', icon: User },
        { icon: Layers, label: 'Manage Accounts', path: '/accounts' },
        { label: 'View Analytics', path: '/analytics', icon: BarChart3 },
        { label: 'Platform Settings', path: '/settings', icon: Settings },
    ];

    const filteredQuickLinks = quickLinks.filter(link => 
        link.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* ===== NAVBAR — matching Image 1 layout ===== */}
            <header className="navbar-header flex items-center justify-between px-4 sm:px-6 h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 z-30 transition-colors font-poppins">
                {/* ---------- LEFT: Hamburger & Search Input ---------- */}
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                    {/* Mobile hamburger (hidden on desktop where sidebar is always open) */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden navbar-mobile-toggle text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                        title="Open Navigation Menu"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Search Bar matching Image 1 */}
                    <div className="relative w-full max-w-xs sm:max-w-sm">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search telemetry, repos, skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-full text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* ---------- RIGHT: Image 1 Actions (Badge, Avatar, + Button, Settings) ---------- */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                        title={theme === 'dark' ? "Light mode" : "Dark mode"}
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {/* Red Platform / Channel Badge matching Image 1 */}
                    <button
                        onClick={() => navigate('/accounts')}
                        title="Connected Accounts"
                        className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-[10px] font-bold shadow-sm transition-transform hover:scale-105 cursor-pointer"
                    >
                        ⚡
                    </button>

                    {/* Profile Avatar + Dropdown with active indicator */}
                    <div ref={profileRef} className="navbar-dropdown-wrapper relative">
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="relative flex items-center cursor-pointer group"
                        >
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'Dev'}&background=2563eb&color=ffffff&bold=true`}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm group-hover:ring-2 group-hover:ring-blue-400/40 transition-all"
                            />
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </button>

                        <AnimatePresence>
                            {showProfileMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                    className="navbar-dropdown navbar-profile-dropdown"
                                >
                                    <div className="navbar-dropdown-header" style={{ marginBottom: '4px' }}>
                                        <div>
                                            <p className="navbar-dropdown-title" style={{ textTransform: 'none', letterSpacing: 'normal' }}>{user?.name || 'Developer'}</p>
                                            <p className="navbar-dropdown-subtitle">{user?.email || 'dev@devdash.com'}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} className="navbar-dropdown-item">
                                        <User size={14} /> My Profile
                                    </button>
                                    <button onClick={() => { navigate('/settings'); setShowProfileMenu(false); }} className="navbar-dropdown-item">
                                        <Settings size={14} /> Settings
                                    </button>
                                    <a href={`/u/${user?.username || 'me'}`} target="_blank" rel="noreferrer" className="navbar-dropdown-item">
                                        <ExternalLink size={14} /> Public Profile
                                    </a>
                                    <div className="navbar-dropdown-divider" />
                                    <button onClick={() => { handleLogout(); setShowProfileMenu(false); }} className="navbar-dropdown-item danger">
                                        <LogOut size={14} /> Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cyan / Light-Blue + Button matching Image 1 */}
                    <button
                        onClick={() => navigate('/projects')}
                        title="Add Project"
                        className="w-7 h-7 rounded-full bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-950/60 dark:hover:bg-cyan-900/60 text-cyan-600 dark:text-cyan-300 flex items-center justify-center shadow-sm transition-transform hover:scale-105 cursor-pointer"
                    >
                        <Plus size={14} strokeWidth={2.5} />
                    </button>

                    {/* Settings Gear Button matching Image 1 */}
                    <button
                        onClick={() => navigate('/settings')}
                        title="Platform Settings"
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <Settings size={17} />
                    </button>
                </div>
            </header>

            {/* ===== MOBILE DRAWER ===== */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="navbar-mobile-overlay"
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="navbar-mobile-drawer"
                        >
                            <div className="navbar-drawer-header">
                                <div className="navbar-logo">
                                    <img src={logoImg} alt="DevDash" className="navbar-logo-img" style={{ height: '28px' }} />
                                    <span className="navbar-logo-text" style={{ fontSize: '18px' }}>
                                        Dev<span className="navbar-logo-accent">Dash</span>
                                    </span>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="navbar-icon-btn">
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="navbar-drawer-nav">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `navbar-drawer-link ${isActive ? 'active' : ''}`
                                        }
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>
                            <div className="navbar-drawer-footer">
                                <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="navbar-drawer-link danger">
                                    <LogOut size={18} /> Logout Account
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ===== SCOPED STYLES ===== */}
            <style>{`
                /* ── BASE BAR ────────────────────────────────────────── */
                .navbar-header {
                    position: sticky;
                    top: 0;
                    z-index: 30;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 60px;
                    width: 100%;
                    padding: 0 20px;
                    background: rgba(255,255,255,0.92);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-bottom: 1px solid #e8e8ef;
                    transition: all 0.3s ease;
                }
                .dark .navbar-header {
                    background: rgba(15,18,30,0.92);
                    border-bottom-color: rgba(255,255,255,0.06);
                }

                @media (min-width: 768px) {
                    .navbar-header { padding: 0 28px; }
                }

                /* ── LEFT SECTION ────────────────────────────────────── */
                .navbar-left {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .navbar-mobile-toggle {
                    display: flex;
                    padding: 8px;
                    border-radius: 10px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .navbar-mobile-toggle:hover { color: #334155; background: #f1f5f9; }
                .dark .navbar-mobile-toggle { color: #94a3b8; }
                .dark .navbar-mobile-toggle:hover { color: #e2e8f0; background: #1e293b; }
                @media (min-width: 768px) {
                    .navbar-mobile-toggle { display: none; }
                }

                .navbar-logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                .navbar-logo-img {
                    height: 26px;
                    width: auto;
                    object-fit: contain;
                }
                .navbar-logo-text {
                    font-size: 16px;
                    font-weight: 900;
                    letter-spacing: -0.5px;
                    color: #1e293b;
                }
                .dark .navbar-logo-text { color: #f1f5f9; }
                .navbar-logo-accent {
                    color: #7c3aed;
                }
                .dark .navbar-logo-accent { color: #a78bfa; }

                /* ── CENTER PILL ──────────────────────────────────────── */
                .navbar-center {
                    display: none;
                }
                @media (min-width: 768px) {
                    .navbar-center {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex: 1;
                    }
                }
                .navbar-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0;
                    background: #f4f4f8;
                    border: 1px solid #e8e8ef;
                    border-radius: 100px;
                    padding: 4px 6px;
                    transition: all 0.3s;
                }
                .dark .navbar-pill {
                    background: rgba(30,34,52,0.7);
                    border-color: rgba(255,255,255,0.06);
                }
                .navbar-pill-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 16px;
                    border-radius: 100px;
                    border: none;
                    background: transparent;
                    font-size: 13px;
                    font-weight: 500;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .navbar-pill-item:hover {
                    color: #7c3aed;
                    background: rgba(124,58,237,0.06);
                }
                .dark .navbar-pill-item { color: #94a3b8; }
                .dark .navbar-pill-item:hover { color: #a78bfa; background: rgba(167,139,250,0.08); }

                .navbar-pill-divider {
                    width: 1px;
                    height: 18px;
                    background: #e2e2ea;
                    flex-shrink: 0;
                }
                .dark .navbar-pill-divider { background: rgba(255,255,255,0.08); }

                .navbar-pill-label {
                    display: none;
                }
                @media (min-width: 900px) {
                    .navbar-pill-label { display: inline; }
                }

                /* ── RIGHT SECTION ───────────────────────────────────── */
                .navbar-right {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                @media (min-width: 768px) {
                    .navbar-right { gap: 6px; }
                }

                /* Recruiter toggle */
                .navbar-recruiter-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    border-radius: 100px;
                    border: 1px solid #e2e2ea;
                    background: transparent;
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.25s;
                }
                .navbar-recruiter-btn:hover { border-color: #c4b5fd; color: #7c3aed; }
                .navbar-recruiter-btn.active {
                    background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(139,92,246,0.08));
                    border-color: rgba(124,58,237,0.35);
                    color: #7c3aed;
                }
                .dark .navbar-recruiter-btn { border-color: rgba(255,255,255,0.08); color: #94a3b8; }
                .dark .navbar-recruiter-btn:hover { border-color: rgba(167,139,250,0.3); color: #a78bfa; }
                .dark .navbar-recruiter-btn.active {
                    background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(139,92,246,0.12));
                    border-color: rgba(124,58,237,0.4);
                    color: #a78bfa;
                }
                .navbar-recruiter-dot {
                    position: relative;
                    display: flex;
                    height: 8px;
                    width: 8px;
                }
                .navbar-recruiter-ping {
                    position: absolute;
                    display: inline-flex;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    background: #94a3b8;
                    opacity: 0.6;
                    animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
                }
                .navbar-recruiter-ping.active { background: #7c3aed; }
                .navbar-recruiter-dot-inner {
                    position: relative;
                    display: inline-flex;
                    border-radius: 50%;
                    height: 8px;
                    width: 8px;
                    background: #94a3b8;
                }
                .navbar-recruiter-dot-inner.active { background: #7c3aed; }
                .navbar-recruiter-label-lg { display: none; }
                .navbar-recruiter-label-sm { display: inline; }
                @media (min-width: 1024px) {
                    .navbar-recruiter-label-lg { display: inline; }
                    .navbar-recruiter-label-sm { display: none; }
                }

                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }

                /* Icon buttons */
                .navbar-icon-btn {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    border-radius: 50%;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .navbar-icon-btn:hover { color: #7c3aed; background: #f4f4f8; }
                .dark .navbar-icon-btn { color: #94a3b8; }
                .dark .navbar-icon-btn:hover { color: #a78bfa; background: rgba(30,34,52,0.7); }

                .navbar-notif-badge {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                    background: #ef4444;
                    border: 2px solid white;
                    animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
                }
                .dark .navbar-notif-badge { border-color: #0f121e; }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                /* ── DROPDOWNS ───────────────────────────────────────── */
                .navbar-dropdown-wrapper {
                    position: relative;
                }
                .navbar-dropdown {
                    position: absolute;
                    right: 0;
                    top: calc(100% + 10px);
                    background: white;
                    border: 1px solid #e8e8ef;
                    border-radius: 16px;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02);
                    overflow: hidden;
                    z-index: 50;
                }
                .dark .navbar-dropdown {
                    background: #141625;
                    border-color: rgba(255,255,255,0.06);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.35);
                }
                .navbar-notif-dropdown { width: 380px; }
                .navbar-profile-dropdown { width: 210px; padding: 6px 0; }

                @media (max-width: 639px) {
                    .navbar-dropdown {
                        position: fixed;
                        left: 8px;
                        right: 8px;
                        top: 68px;
                        width: auto;
                    }
                }

                .navbar-dropdown-header {
                    padding: 12px 16px;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .dark .navbar-dropdown-header { border-bottom-color: rgba(255,255,255,0.05); }

                .navbar-dropdown-title {
                    font-size: 11px;
                    font-weight: 800;
                    color: #334155;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .dark .navbar-dropdown-title { color: #e2e8f0; }
                .navbar-dropdown-subtitle {
                    font-size: 11px;
                    color: #94a3b8;
                    margin-top: 2px;
                }
                .dark .navbar-dropdown-subtitle { color: #64748b; }

                .navbar-mark-read {
                    font-size: 10px;
                    font-weight: 700;
                    color: #7c3aed;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .navbar-mark-read:hover { text-decoration: underline; }
                .dark .navbar-mark-read { color: #a78bfa; }

                .navbar-dropdown-item {
                    display: flex;
                    width: 100%;
                    align-items: center;
                    gap: 10px;
                    padding: 9px 16px;
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #475569;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.15s;
                    text-decoration: none;
                    text-align: left;
                }
                .navbar-dropdown-item:hover { color: #7c3aed; background: #f8f7ff; }
                .dark .navbar-dropdown-item { color: #94a3b8; }
                .dark .navbar-dropdown-item:hover { color: #a78bfa; background: rgba(124,58,237,0.06); }
                .navbar-dropdown-item.danger { color: #ef4444; }
                .navbar-dropdown-item.danger:hover { background: #fef2f2; }
                .dark .navbar-dropdown-item.danger { color: #f87171; }
                .dark .navbar-dropdown-item.danger:hover { background: rgba(239,68,68,0.06); }

                .navbar-dropdown-divider {
                    height: 1px;
                    background: #f1f5f9;
                    margin: 4px 0;
                }
                .dark .navbar-dropdown-divider { background: rgba(255,255,255,0.05); }

                /* Notification items */
                .navbar-notif-list {
                    max-height: 320px;
                    overflow-y: auto;
                }
                .navbar-notif-item {
                    display: flex;
                    gap: 12px;
                    padding: 14px 16px;
                    border-bottom: 1px solid #f8fafc;
                    transition: background 0.15s;
                    cursor: default;
                }
                .navbar-notif-item:last-child { border-bottom: none; }
                .navbar-notif-item:hover { background: #fafafa; }
                .dark .navbar-notif-item { border-bottom-color: rgba(255,255,255,0.03); }
                .dark .navbar-notif-item:hover { background: rgba(255,255,255,0.02); }
                .navbar-notif-item.unread { background: rgba(124,58,237,0.03); }
                .dark .navbar-notif-item.unread { background: rgba(124,58,237,0.04); }

                .navbar-notif-icon {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .navbar-notif-icon.success { background: #ecfdf5; color: #22c55e; }
                .dark .navbar-notif-icon.success { background: rgba(34,197,94,0.1); }
                .navbar-notif-icon.award { background: #fffbeb; color: #f59e0b; }
                .dark .navbar-notif-icon.award { background: rgba(245,158,11,0.1); }
                .navbar-notif-icon.info { background: #eff6ff; color: #3b82f6; }
                .dark .navbar-notif-icon.info { background: rgba(59,130,246,0.1); }

                .navbar-notif-content { flex: 1; }
                .navbar-notif-text {
                    font-size: 12px;
                    font-weight: 500;
                    color: #475569;
                    line-height: 1.5;
                    margin: 0;
                }
                .dark .navbar-notif-text { color: #cbd5e1; }
                .navbar-notif-time {
                    font-size: 10px;
                    color: #94a3b8;
                    display: block;
                    margin-top: 3px;
                }
                .dark .navbar-notif-time { color: #64748b; }

                /* ── PROFILE BUTTON ──────────────────────────────────── */
                .navbar-profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 3px;
                    padding-right: 8px;
                    border-radius: 100px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .navbar-profile-btn:hover { background: #f4f4f8; }
                .dark .navbar-profile-btn:hover { background: rgba(30,34,52,0.7); }

                .navbar-avatar {
                    height: 32px;
                    width: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #ede9fe;
                    transition: border-color 0.2s;
                }
                .navbar-profile-btn:hover .navbar-avatar { border-color: #c4b5fd; }
                .dark .navbar-avatar { border-color: rgba(124,58,237,0.2); }
                .dark .navbar-profile-btn:hover .navbar-avatar { border-color: rgba(124,58,237,0.5); }

                .navbar-profile-chevron {
                    color: #94a3b8;
                    transition: all 0.25s;
                    display: none;
                }
                @media (min-width: 640px) {
                    .navbar-profile-chevron { display: block; }
                }

                /* ── MOBILE DRAWER ───────────────────────────────────── */
                .navbar-mobile-overlay {
                    position: fixed;
                    inset: 0;
                    background: black;
                    z-index: 40;
                }
                @media (min-width: 768px) { .navbar-mobile-overlay { display: none; } }

                .navbar-mobile-drawer {
                    position: fixed;
                    inset: 0 auto 0 0;
                    width: 280px;
                    background: white;
                    border-right: 1px solid #e8e8ef;
                    z-index: 50;
                    display: flex;
                    flex-direction: column;
                    padding: 24px;
                    box-shadow: 8px 0 30px rgba(0,0,0,0.08);
                }
                .dark .navbar-mobile-drawer {
                    background: #0c0e1a;
                    border-right-color: rgba(255,255,255,0.05);
                    box-shadow: 8px 0 30px rgba(0,0,0,0.4);
                }
                @media (min-width: 768px) { .navbar-mobile-drawer { display: none; } }

                .navbar-drawer-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #f1f5f9;
                    margin-bottom: 20px;
                }
                .dark .navbar-drawer-header { border-bottom-color: rgba(255,255,255,0.05); }

                .navbar-drawer-nav {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .navbar-drawer-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 14px;
                    border-radius: 12px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #64748b;
                    text-decoration: none;
                    transition: all 0.2s;
                    border: none;
                    background: none;
                    cursor: pointer;
                    width: 100%;
                    text-align: left;
                }
                .navbar-drawer-link:hover { color: #1e293b; background: #f8fafc; }
                .navbar-drawer-link.active { color: #7c3aed; background: #f5f3ff; }
                .dark .navbar-drawer-link { color: #94a3b8; }
                .dark .navbar-drawer-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.03); }
                .dark .navbar-drawer-link.active { color: #a78bfa; background: rgba(124,58,237,0.08); }
                .navbar-drawer-link.danger { color: #ef4444; }
                .navbar-drawer-link.danger:hover { background: #fef2f2; }
                .dark .navbar-drawer-link.danger { color: #f87171; }

                .navbar-drawer-footer {
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                    margin-top: auto;
                }
                .dark .navbar-drawer-footer { border-top-color: rgba(255,255,255,0.05); }
            `}</style>
        </>
    );
};

export default Navbar;
