import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Bell, Menu, X, Sun, Moon, ChevronDown, LogOut, Settings, 
    User, ExternalLink, LayoutDashboard, FileText, Code2, FolderKanban, 
    Briefcase, BarChart3, Target, Link as LinkIcon, CheckCircle2, AlertCircle, Award
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    
    // Auth User
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

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
        { icon: LinkIcon, label: 'Coding Profiles', path: '/coding-profiles' },
        { icon: FolderKanban, label: 'Projects', path: '/projects' },
        { icon: FileText, label: 'Resume', path: '/resume' },
        { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const quickLinks = [
        { label: 'Go to Profile', path: '/profile', icon: User },
        { icon: LinkIcon, label: 'Sync Coding Profiles', path: '/coding-profiles' },
        { label: 'View Analytics', path: '/analytics', icon: BarChart3 },
        { label: 'Platform Settings', path: '/settings', icon: Settings },
    ];

    const filteredQuickLinks = quickLinks.filter(link => 
        link.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 px-6 backdrop-blur-md transition-all duration-300">
            {/* Mobile Hamburger menu & Logo */}
            <div className="flex items-center gap-3 md:hidden">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                    <Menu size={22} />
                </button>
                <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="h-7 w-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        <Code2 size={16} />
                    </div>
                    <span className="font-black text-slate-800 dark:text-slate-100 text-lg tracking-tight">DevDash</span>
                </div>
            </div>

            {/* Search Input with Dropdown (Desktop) */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-md relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Quick search links, profiles..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
                
                {/* Search Results / Quick Actions popover */}
                <AnimatePresence>
                    {searchFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-4 overflow-hidden z-40"
                        >
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Quick Navigation</p>
                            {filteredQuickLinks.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredQuickLinks.map((link, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                navigate(link.path);
                                                setSearchFocused(false);
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center gap-3 w-full px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-all text-left"
                                        >
                                            <link.icon size={15} className="text-slate-400 group-hover:text-indigo-600" />
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 py-2">No matching links found.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300"
                    title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
                </button>

                {/* Notifications Bell */}
                <div ref={notificationRef} className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300"
                    >
                        <Bell size={19} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950 animate-pulse"></span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.15 }}
                                className="fixed left-2 right-2 top-16 sm:absolute sm:left-auto sm:top-auto sm:right-0 sm:mt-2.5 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50"
                            >
                                <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-850 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/30">
                                    <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">Notifications</span>
                                    {unreadCount > 0 && (
                                        <button 
                                            onClick={markAllRead}
                                            className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {notifications.map((notif) => (
                                        <div 
                                            key={notif.id} 
                                            className={`p-4 flex gap-3 text-xs transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40 ${
                                                !notif.read ? 'bg-indigo-50/20 dark:bg-indigo-500/5' : ''
                                            }`}
                                        >
                                            <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                notif.type === 'success' ? 'bg-green-50 dark:bg-green-950/20 text-green-500' :
                                                notif.type === 'award' ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500' :
                                                'bg-blue-50 dark:bg-blue-950/20 text-blue-500'
                                            }`}>
                                                <notif.icon size={15} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                                                    {notif.text}
                                                </p>
                                                <span className="text-[10px] text-slate-400 dark:text-slate-550 block font-medium">
                                                    {notif.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile Section (Desktop with Dropdown) */}
                <div ref={profileRef} className="relative flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800 transition-colors">
                    <button 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 group"
                    >
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=c7d2fe&color=3730a3`}
                            alt="Profile"
                            className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900/50 shadow-sm transition-all duration-300"
                        />
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-250 leading-none mb-0.5">{user?.name || 'Developer'}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold leading-none">{user?.role || 'User'}</p>
                        </div>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-300" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none' }} />
                    </button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.15 }}
                                className="fixed right-2 top-16 sm:absolute sm:top-auto sm:right-0 sm:mt-2.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 overflow-hidden z-50"
                            >
                                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                                    <p className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">{user?.name || 'Developer'}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold truncate">{user?.email || 'dev@devdash.com'}</p>
                                </div>
                                <button
                                    onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-355 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                                >
                                    <User size={14} />
                                    My Profile
                                </button>
                                <button
                                    onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-355 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                                >
                                    <Settings size={14} />
                                    Settings
                                </button>
                                <a
                                    href={`/u/${user?.username || 'me'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-355 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                                >
                                    <ExternalLink size={14} />
                                    Public Profile
                                </a>
                                <hr className="border-slate-100 dark:border-slate-800/80 my-1" />
                                <button
                                    onClick={() => { handleLogout(); setShowProfileMenu(false); }}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
                                >
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>

        {/* Mobile Drawer Slide-over */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <>
                    {/* Overlay backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black z-40 md:hidden"
                    />
                    
                    {/* Drawer body */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-850 z-50 flex flex-col p-6 shadow-2xl md:hidden"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-900 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                                    <Code2 size={18} />
                                </div>
                                <span className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">DevDash</span>
                            </div>
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-250 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Drawer Nav links */}
                        <nav className="flex-1 space-y-1.5">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                                        }`
                                    }
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Drawer Footer / Logout */}
                        <div className="pt-5 border-t border-slate-100 dark:border-slate-900 mt-auto">
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                                className="flex w-full items-center gap-3 px-4 py-3 text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors text-sm font-bold"
                            >
                                <LogOut size={18} />
                                Logout Account
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </>
    );
};

export default Navbar;
