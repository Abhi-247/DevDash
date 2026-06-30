import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const CodingProfiles = () => {
    const [profiles, setProfiles] = useState({
        gfg: { connected: false, username: '' },
        leetcode: { connected: false, username: '' },
        codeforces: { connected: false, username: '' },
        hackerrank: { connected: false, username: '' }
    });
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProfiles(response.data.connectedProfiles || profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (platform) => {
        setShowModal(platform);
        setUsername('');
    };

    const handleManualConnect = async () => {
        if (!username.trim()) return;
        
        setConnecting(showModal);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/connect-profile`, {
                platform: showModal,
                username: username.trim()
            }, {
                withCredentials: true
            });
            await fetchProfiles();
            setShowModal(null);
        } catch (error) {
            console.error('Error connecting profile:', error);
            alert('Error connecting profile');
        } finally {
            setConnecting(null);
        }
    };

    const handleDisconnect = async (platform) => {
        if (!confirm(`Are you sure you want to disconnect ${platform}?`)) return;
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/disconnect-profile`, {
                platform
            }, {
                withCredentials: true
            });
            await fetchProfiles();
        } catch (error) {
            console.error('Error disconnecting profile:', error);
            alert('Error disconnecting profile');
        }
    };

    const platformConfig = {
        gfg: {
            name: 'GeeksforGeeks',
            icon: () => <span className="text-2xl font-bold">GFG</span>,
            color: 'bg-green-700',
            description: 'Connect your GeeksforGeeks account to showcase DSA practice and articles',
            url: 'https://www.geeksforgeeks.org/user'
        },
        leetcode: {
            name: 'LeetCode',
            icon: () => <span className="text-2xl font-bold">LC</span>,
            color: 'bg-orange-500',
            description: 'Connect your LeetCode account to track problem-solving progress',
            url: 'https://leetcode.com'
        },
        codeforces: {
            name: 'Codeforces',
            icon: () => <span className="text-2xl font-bold">CF</span>,
            color: 'bg-red-600',
            description: 'Connect your Codeforces account to show competitive programming stats',
            url: 'https://codeforces.com'
        },
        hackerrank: {
            name: 'HackerRank',
            icon: () => <span className="text-2xl font-bold">HR</span>,
            color: 'bg-green-600',
            description: 'Connect your HackerRank account to display coding challenges',
            url: 'https://hackerrank.com'
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Coding Profiles</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Connect your coding platforms to showcase your activity and achievements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(platformConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    const profile = profiles[key];
                    const isConnected = profile?.connected;

                    return (
                        <div
                            key={key}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center text-white`}>
                                        <Icon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                            {config.name}
                                        </h3>
                                        {isConnected && (
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                @{profile.username}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {isConnected ? (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <CheckCircle size={20} />
                                        <span className="text-sm font-medium">Connected</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <XCircle size={20} />
                                        <span className="text-sm font-medium">Not Connected</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                {config.description}
                            </p>

                            <div className="flex items-center gap-3">
                                {isConnected ? (
                                    <>
                                        <button
                                            onClick={() => handleDisconnect(key)}
                                            className="flex-1 px-4 py-2 border border-red-300 text-red-600 dark:border-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                                        >
                                            Disconnect
                                        </button>
                                        <a
                                            href={`${config.url}/${profile.username}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleConnect(key)}
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                    >
                                        Connect Account
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal for manual username input */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                            Connect {platformConfig[showModal].name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Enter your {platformConfig[showModal].name} username to connect your account.
                        </p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleManualConnect()}
                            placeholder="Enter username"
                            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 mb-4"
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(null)}
                                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleManualConnect}
                                disabled={connecting || !username.trim()}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {connecting ? 'Connecting...' : 'Connect'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodingProfiles;
