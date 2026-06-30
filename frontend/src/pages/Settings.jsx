import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/logout`, {}, { withCredentials: true });
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out");
        }
    };
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in transition-colors duration-300">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Account Preferences</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account settings and visibility.</p>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                <Eye size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800 dark:text-white">Profile Visibility</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Make your profile visible to recruiters</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    <div className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </div>
                            <div>
                                <p className="font-medium text-slate-800 dark:text-white">Dark Mode</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    <div className="p-6 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer" onClick={handleLogout}>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg">
                                <LogOut size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-red-600">Sign Out</p>
                                <p className="text-sm text-red-400 dark:text-red-500/70">Log out of your account</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-rose-100 dark:border-rose-900/30 shadow-sm overflow-hidden mb-12 transition-colors">
                <div className="p-6 border-b border-rose-100 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-900/10">
                    <h2 className="text-lg font-bold text-rose-700 dark:text-rose-500">Danger Zone</h2>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-800 dark:text-white">Delete Account</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Once you delete your account, there is no going back. Please be certain.</p>
                    </div>
                    <button className="px-4 py-2 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-500 font-medium rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-2">
                        <Trash2 size={16} />
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
