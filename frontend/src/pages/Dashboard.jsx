import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, FolderKanban, Target, TrendingUp, User, ExternalLink, ArrowRight, Link as LinkIcon } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const connectedProfiles = profile?.connectedProfiles || {};
    const projects = profile?.projects || [];
    const goals = profile?.goals || [];
    const analytics = profile?.analytics || {};

    const connectedCount = Object.values(connectedProfiles).filter(p => p.connected).length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

    const quickActions = [
        { icon: LinkIcon, label: 'Connect GFG', path: '/coding-profiles', color: 'bg-green-700' },
        { icon: FolderKanban, label: 'Add Project', path: '/projects', color: 'bg-indigo-600' },
        { icon: Target, label: 'Set Goal', path: '/goals', color: 'bg-purple-600' },
        { icon: User, label: 'Edit Profile', path: '/profile', color: 'bg-pink-600' }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Welcome back, {profile?.fullName || profile?.username || 'Developer'}!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Here's what's happening with your developer portfolio today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                            <LinkIcon className="text-indigo-600 dark:text-indigo-400" size={18} />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Connected</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{connectedCount}/4</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">Coding Profiles</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <FolderKanban className="text-purple-600 dark:text-purple-400" size={18} />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Total</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{projects.length}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">Projects</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <Target className="text-green-600 dark:text-green-400" size={18} />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Completed</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{completedGoals}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">Goals</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                            <TrendingUp className="text-orange-600 dark:text-orange-400" size={18} />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Total</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{analytics.totalCommits || 0}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">Commits</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.path}
                                onClick={() => navigate(action.path)}
                                className="flex flex-col items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all group"
                            >
                                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Featured Projects */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Featured Projects</h3>
                        <button
                            onClick={() => navigate('/projects')}
                            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    {featuredProjects.length > 0 ? (
                        <div className="space-y-4">
                            {featuredProjects.map((project) => (
                                <div
                                    key={project._id}
                                    className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                                >
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{project.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FolderKanban size={48} className="mx-auto text-slate-400 mb-3" />
                            <p className="text-slate-600 dark:text-slate-400 mb-3">No featured projects yet</p>
                            <button
                                onClick={() => navigate('/projects')}
                                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                            >
                                Add your first project
                            </button>
                        </div>
                    )}
                </div>

                {/* Connected Profiles Status */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Connected Profiles</h3>
                        <button
                            onClick={() => navigate('/coding-profiles')}
                            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                        >
                            Manage
                        </button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { key: 'gfg', name: 'GeeksforGeeks', color: 'bg-green-700' },
                            { key: 'leetcode', name: 'LeetCode', color: 'bg-orange-500' },
                            { key: 'codeforces', name: 'Codeforces', color: 'bg-red-600' },
                            { key: 'hackerrank', name: 'HackerRank', color: 'bg-green-600' }
                        ].map((platform) => {
                            const isConnected = connectedProfiles[platform.key]?.connected;
                            const Icon = platform.icon;
                            return (
                                <div
                                    key={platform.key}
                                    className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 ${platform.color} rounded flex items-center justify-center text-white`}>
                                            {platform.icon ? <Icon size={16} /> : platform.name.charAt(0)}
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{platform.name}</span>
                                    </div>
                                    {isConnected ? (
                                        <span className="text-green-600 dark:text-green-400 text-sm">Connected</span>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/coding-profiles')}
                                            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                                        >
                                            Connect
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Goals Progress */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Active Goals</h3>
                    <button
                        onClick={() => navigate('/goals')}
                        className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                    >
                        View All
                    </button>
                </div>
                {goals.filter(g => g.status !== 'completed').length > 0 ? (
                    <div className="space-y-4">
                        {goals.filter(g => g.status !== 'completed').slice(0, 3).map((goal) => (
                            <div key={goal._id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{goal.title}</h4>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{goal.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all"
                                        style={{ width: `${goal.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Target size={48} className="mx-auto text-slate-400 mb-3" />
                        <p className="text-slate-600 dark:text-slate-400 mb-3">No active goals</p>
                        <button
                            onClick={() => navigate('/goals')}
                            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                        >
                            Set your first goal
                        </button>
                    </div>
                )}
            </div>

            {/* Get Started Card */}
            {connectedCount === 0 && projects.length === 0 && goals.length === 0 && (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Get Started with DevDash</h3>
                            <p className="text-white/80 mb-6">
                                Connect your coding profiles, add projects, and set goals to build your developer portfolio.
                            </p>
                            <button
                                onClick={() => navigate('/coding-profiles')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                            >
                                Connect Your First Profile
                                <ArrowRight size={18} />
                            </button>
                        </div>
                        <LayoutDashboard size={80} className="text-white/20" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
