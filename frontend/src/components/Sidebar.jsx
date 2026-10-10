import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    User, 
    FileText, 
    Settings, 
    LogOut, 
    FolderKanban, 
    BarChart3, 
    Target, 
    Layers, 
    Mail, 
    Globe,
    ExternalLink
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';
import logoImg from '../assets/logodevdash.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const { isRecruiterMode } = useRecruiter();

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

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Layers, label: 'Accounts & Telemetry', path: '/accounts' },
        { icon: FolderKanban, label: 'Projects & Systems', path: '/projects' },
        { icon: FileText, label: 'Resume & ATS', path: '/resume' },
        { icon: Mail, label: 'HR Outreach CRM', path: '/hr-outreach' },
        { icon: Globe, label: 'Public Showcase', path: '/u/me' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80 hidden md:flex flex-col justify-between transition-colors z-30 select-none font-poppins">
            {/* Top: Logo Branding */}
            <div>
                <div className="h-16 px-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <div 
                        className="flex items-center gap-3 cursor-pointer group" 
                        onClick={() => navigate('/dashboard')}
                    >
                        <img src={logoImg} alt="DevDash" className="h-7 w-auto object-contain group-hover:scale-105 transition-transform" />
                        <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Dev<span className="text-blue-600">Dash</span>
                        </span>
                    </div>

                    {isRecruiterMode && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                            DEMO
                        </span>
                    )}
                </div>

                {/* Navigation Items (Icon + Name) */}
                <nav className="p-3.5 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
                        Platform Navigation
                    </div>

                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-blue-500/10'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon 
                                        size={18} 
                                        className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'} 
                                    />
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom: User Card & Logout */}
            <div className="p-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                {/* User quick profile bar */}
                <div 
                    onClick={() => navigate('/profile')}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer transition-colors"
                >
                    <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'Dev'}&background=2563eb&color=ffffff&bold=true`}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {user?.name || 'Abhishek Verma'}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                            {user?.email || 'developer@devdash.com'}
                        </p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                >
                    <LogOut size={16} />
                    <span>Logout Account</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
