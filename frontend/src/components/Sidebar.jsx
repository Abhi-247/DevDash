import React from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, FileText, Settings, LogOut, Code2, FolderKanban, Briefcase, BarChart3, Target, Link as LinkIcon, Mail } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();

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

        { icon: FolderKanban, label: 'Projects', path: '/projects' },
        { icon: FileText, label: 'Resume', path: '/resume' },
        { icon: Mail, label: 'HR Outreach', path: '/hr-outreach' },
        { icon: Briefcase, label: 'Public Showcase', path: '/u/me' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col transition-colors">
            <div className="p-6 flex items-center gap-2">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <Code2 size={20} />
                </div>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">DevDash</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 transition-colors">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
