import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, GitCommit, GitPullRequest, AlertCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/analytics`, {
                withCredentials: true
            });
            setAnalytics(response.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchAnalytics();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const languagesData = analytics?.analytics?.languagesUsed?.map(lang => ({
        name: lang.language,
        value: lang.count
    })) || [];

    const mockActivityData = [
        { date: 'Mon', commits: 12, contributions: 15 },
        { date: 'Tue', commits: 8, contributions: 10 },
        { date: 'Wed', commits: 15, contributions: 20 },
        { date: 'Thu', commits: 6, contributions: 8 },
        { date: 'Fri', commits: 20, contributions: 25 },
        { date: 'Sat', commits: 4, contributions: 5 },
        { date: 'Sun', commits: 2, contributions: 3 },
    ];

    const stats = [
        {
            label: 'Total Commits',
            value: analytics?.analytics?.totalCommits || 0,
            icon: GitCommit,
            color: 'bg-indigo-500',
            change: '+12%'
        },
        {
            label: 'Pull Requests',
            value: analytics?.analytics?.totalPRs || 0,
            icon: GitPullRequest,
            color: 'bg-purple-500',
            change: '+8%'
        },
        {
            label: 'Issues Closed',
            value: analytics?.analytics?.totalIssues || 0,
            icon: AlertCircle,
            color: 'bg-pink-500',
            change: '+15%'
        },
        {
            label: 'Active Days',
            value: 45,
            icon: TrendingUp,
            color: 'bg-green-500',
            change: '+5%'
        }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Analytics</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Track your coding activity and progress</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                                    <Icon size={24} />
                                </div>
                                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Activity Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                        Weekly Activity
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockActivityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="date" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#f1f5f9'
                                }}
                            />
                            <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Languages Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                        Languages Used
                    </h3>
                    {languagesData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={languagesData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {languagesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f1f5f9'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px] text-slate-500 dark:text-slate-400">
                            Connect coding profiles to see language statistics
                        </div>
                    )}
                </div>
            </div>

            {/* Contribution Trend */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                    Contribution Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#f1f5f9'
                            }}
                        />
                        <Line type="monotone" dataKey="contributions" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Connected Profiles Status */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                    Connected Profiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: 'GeeksforGeeks', connected: analytics?.connectedProfiles?.gfg?.connected, color: 'bg-green-700' },
                        { name: 'LeetCode', connected: analytics?.connectedProfiles?.leetcode?.connected, color: 'bg-orange-500' },
                        { name: 'Codeforces', connected: analytics?.connectedProfiles?.codeforces?.connected, color: 'bg-red-600' },
                        { name: 'HackerRank', connected: analytics?.connectedProfiles?.hackerrank?.connected, color: 'bg-green-600' }
                    ].map((profile) => (
                        <div
                            key={profile.name}
                            className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                        >
                            <div className={`w-3 h-3 rounded-full ${profile.connected ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{profile.name}</span>
                            {profile.connected && (
                                <span className="ml-auto text-xs text-green-600 dark:text-green-400">Connected</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
