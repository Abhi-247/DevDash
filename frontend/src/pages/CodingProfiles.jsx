import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink, CheckCircle, XCircle, RefreshCw, Trophy, Github, Sparkles, Layers } from 'lucide-react';

const CodingProfiles = () => {
    const [profiles, setProfiles] = useState({
        gfg: { connected: false, username: '' },
        leetcode: { connected: false, username: '' },
        codeforces: { connected: false, username: '' },
        hackerrank: { connected: false, username: '' },
        github: { connected: false, username: '' }
    });
    const [devScore, setDevScore] = useState(500);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
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
            if (response.data?.connectedProfiles) {
                setProfiles(prev => ({ ...prev, ...response.data.connectedProfiles }));
            }
            if (response.data?.devScore) {
                setDevScore(response.data.devScore);
            }
        } catch (error) {
            console.error('Error fetching profiles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSyncLiveStats = async () => {
        setSyncing(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/sync-stats`, {}, {
                withCredentials: true
            });
            if (response.data?.connectedProfiles) {
                setProfiles(response.data.connectedProfiles);
            }
            if (response.data?.devScore) {
                setDevScore(response.data.devScore);
            }
        } catch (error) {
            console.error('Error syncing live stats:', error);
            alert('Failed to sync live stats from platform APIs.');
        } finally {
            setSyncing(false);
        }
    };

    const handleConnect = (platform) => {
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
            
            setShowModal(null);
            // Automatically trigger live sync after connecting new username
            await handleSyncLiveStats();
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

    const platformCards = [
        {
            key: 'leetcode',
            name: 'LeetCode',
            badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
            data: profiles.leetcode,
            url: (user) => `https://leetcode.com/${user}`
        },
        {
            key: 'codeforces',
            name: 'Codeforces',
            badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
            data: profiles.codeforces,
            url: (user) => `https://codeforces.com/profile/${user}`
        },
        {
            key: 'github',
            name: 'GitHub',
            badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-400/30',
            data: profiles.github,
            url: (user) => `https://github.com/${user}`
        },
        {
            key: 'gfg',
            name: 'GeeksforGeeks',
            badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
            data: profiles.gfg,
            url: (user) => `https://auth.geeksforgeeks.org/user/${user}`
        },
        {
            key: 'hackerrank',
            name: 'HackerRank',
            badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
            data: profiles.hackerrank,
            url: (user) => `https://www.hackerrank.com/${user}`
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Coding Profiles</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Connect your developer handles to automatically sync problem metrics & ratings into your DevScore™.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSyncLiveStats}
                        disabled={syncing}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                    >
                        <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
                        <span>{syncing ? 'Syncing APIs...' : 'Sync Live Stats'}</span>
                    </button>
                </div>
            </div>

            {/* DevScore Header Card */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                        <Sparkles size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Unified DevScore™ Engine</h2>
                        <p className="text-sm text-slate-300">Calculated in real-time based on verified submissions & contest ratings.</p>
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <div className="text-4xl font-extrabold text-white bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                        {devScore} / 2500
                    </div>
                    <span className="text-xs text-slate-400">Global Developer Rank</span>
                </div>
            </div>

            {/* Platform Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformCards.map((platform) => {
                    const isConnected = platform.data?.connected;
                    const username = platform.data?.username;

                    return (
                        <div
                            key={platform.key}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`px-3 py-1 rounded-xl border text-xs font-bold ${platform.badgeBg}`}>
                                            {platform.name}
                                        </div>
                                    </div>
                                    {isConnected ? (
                                        <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                            <CheckCircle size={13} />
                                            <span>Connected</span>
                                        </span>
                                    ) : (
                                        <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-medium">
                                            Not Connected
                                        </span>
                                    )}
                                </div>

                                {isConnected ? (
                                    <div className="space-y-4 mb-6">
                                        <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                                            @{username}
                                        </div>

                                        {/* Platform specific stats */}
                                        {platform.key === 'leetcode' && (
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Total Solved:</span>
                                                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{platform.data.totalSolved || 0}</span>
                                                </div>
                                                {platform.data.ranking > 0 && (
                                                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Global Rank:</span>
                                                        <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">#{platform.data.ranking}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {platform.key === 'codeforces' && (
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Rating:</span>
                                                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">{platform.data.rating || 'Unrated'}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Rank:</span>
                                                    <span className="font-bold text-slate-900 dark:text-slate-100 capitalize">{platform.data.rank || 'Unrated'}</span>
                                                </div>
                                            </div>
                                        )}

                                        {platform.key === 'github' && (
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Public Repos:</span>
                                                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{platform.data.publicRepos || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Followers:</span>
                                                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{platform.data.followers || 0}</span>
                                                </div>
                                            </div>
                                        )}

                                        {platform.key === 'gfg' && (
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Coding Score:</span>
                                                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{platform.data.codingScore || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Total Solved:</span>
                                                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{platform.data.totalSolved || 0}</span>
                                                </div>
                                            </div>
                                        )}

                                        {platform.key === 'hackerrank' && (
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Badges Earned:</span>
                                                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{platform.data.badges || 0}</span>
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                            Last synced: {platform.data?.lastSynced ? new Date(platform.data.lastSynced).toLocaleTimeString() : 'Recently'}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                        Link your handle to automatically sync your verified statistics into your dashboard.
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {isConnected ? (
                                    <>
                                        <a
                                            href={platform.url(username)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            <span>View Profile</span>
                                        </a>
                                        <button
                                            onClick={() => handleDisconnect(platform.key)}
                                            className="px-3 py-2 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 rounded-xl text-xs font-semibold transition-colors"
                                        >
                                            Disconnect
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleConnect(platform.key)}
                                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                                    >
                                        Connect {platform.name}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Handle Input Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Connect {showModal.toUpperCase()} Handle</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Enter your official handle/username to sync stats.
                        </p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Username / Handle</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="e.g. tourist, neetcode, alexdev"
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(null)}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleManualConnect}
                                disabled={connecting === showModal}
                                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                            >
                                {connecting === showModal ? 'Connecting...' : 'Connect'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodingProfiles;
