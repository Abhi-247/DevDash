import React from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, User, FileText, Settings, LogOut, Code2, FolderKanban, 
    Briefcase, BarChart3, Target, Link as LinkIcon, Mail, Terminal, Network, 
    Sparkles, Command
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';
import logoImg from '../assets/logodevdash.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const { 
        isRecruiterMode, 
        setIsArchModalOpen, 
        setIsTerminalOpen, 
        setIsCommandPaletteOpen 
    } = useRecruiter();

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
        { icon: LinkIcon, label: 'Coding Profiles', path: '/coding-profiles' },
        { icon: FolderKanban, label: 'Projects & Systems', path: '/projects' },
        { icon: FileText, label: 'Resume & ATS', path: '/resume' },
        { icon: Mail, label: 'HR Outreach CRM', path: '/hr-outreach' },
        { icon: Briefcase, label: 'Public Showcase', path: '/u/me' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 hidden md:flex flex-col transition-colors z-20">
            {/* Brand Logo & Recruiter Status */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <img src={logoImg} alt="DevDash Logo" className="h-8 w-auto object-contain" />
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">DevDash</span>
                </div>
                {isRecruiterMode && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        DEMO
                    </span>
                )}
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
                    Platform
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                            }`
                        }
                    >
                        <item.icon size={17} />
                        {item.label}
                    </NavLink>
                ))}

                {/* Developer Tools Section */}
                <div className="pt-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
                        Power Tools
                    </div>
                    <button
                        onClick={() => setIsCommandPaletteOpen(true)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-indigo-400 rounded-xl transition-all cursor-pointer text-left"
                    >
                        <span className="flex items-center gap-3">
                            <Command size={17} />
                            <span>Command Palette</span>
                        </span>
                        <kbd className="text-[9px] font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Ctrl+K</kbd>
                    </button>

                    <button
                        onClick={() => setIsTerminalOpen(true)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-emerald-400 rounded-xl transition-all cursor-pointer text-left"
                    >
                        <span className="flex items-center gap-3">
                            <Terminal size={17} />
                            <span>Dev Terminal</span>
                        </span>
                        <kbd className="text-[9px] font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">~</kbd>
                    </button>

                    <button
                        onClick={() => setIsArchModalOpen(true)}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-indigo-400 rounded-xl transition-all cursor-pointer text-left"
                    >
                        <Network size={17} />
                        <span>System Architecture</span>
                    </button>
                </div>
            </nav>

            {/* Logout Footer */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 transition-colors">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-xs font-semibold cursor-pointer"
                >
                    <LogOut size={16} />
                    Logout Account
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
