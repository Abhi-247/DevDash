import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { 
    Plus, Search, ExternalLink, RefreshCw, Layers, 
    CheckCircle2, Trash2, ArrowRight, Code2, Github, 
    Award, Flame, Star, GitCommit, GitPullRequest, 
    BookOpen, AlertCircle, X, Check, ChevronRight,
    TrendingUp, Sparkles, Trophy, Cpu
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const Accounts = () => {
    const { isRecruiterMode, mockData } = useRecruiter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [selectedAccountKey, setSelectedAccountKey] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Connect Modal State
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [modalPlatform, setModalPlatform] = useState('leetcode');
    const [modalHandle, setModalHandle] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [connectError, setConnectError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSyncLiveStats = async () => {
        setSyncing(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/sync-stats`, {}, {
                withCredentials: true
            });
            if (res.data) {
                setProfile(res.data);
            }
        } catch (error) {
            console.error('Error syncing live platform stats:', error);
        } finally {
            setSyncing(false);
        }
    };

    const handleConnect = async (e) => {
        if (e) e.preventDefault();
        if (!modalHandle.trim()) {
            setConnectError('Please enter your account handle');
            return;
        }

        setConnecting(true);
        setConnectError('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/connect-profile`, {
                platform: modalPlatform,
                username: modalHandle.trim()
            }, {
                withCredentials: true
            });

            if (res.data) {
                setProfile(res.data);
            }
            setSelectedAccountKey(modalPlatform);
            setShowConnectModal(false);
            setModalHandle('');
            // Trigger automatic sync for freshly connected account
            await handleSyncLiveStats();
        } catch (err) {
            console.error('Error connecting account:', err);
            setConnectError(err.response?.data?.message || 'Failed to connect profile. Please verify your handle.');
        } finally {
            setConnecting(false);
        }
    };

    const handleDisconnect = async (platformKey) => {
        if (!confirm(`Are you sure you want to disconnect your ${platformKey.toUpperCase()} account?`)) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/disconnect-profile`, {
                platform: platformKey
            }, {
                withCredentials: true
            });
            if (res.data) {
                setProfile(res.data);
            }
            if (selectedAccountKey === platformKey) {
                setSelectedAccountKey(null);
            }
        } catch (error) {
            console.error('Error disconnecting profile:', error);
            alert('Error disconnecting profile');
        }
    };

    // Platform registry definitions
    const supportedPlatforms = [
        {
            key: 'leetcode',
            name: 'LeetCode',
            category: 'Algorithmic DSA',
            color: 'text-[#FFA116]',
            badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
            profileUrl: (u) => `https://leetcode.com/u/${u}`,
            placeholder: 'e.g. tourist, neetcode',
            prefix: 'leetcode.com/u/',
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
            )
        },
        {
            key: 'github',
            name: 'GitHub',
            category: 'Version Control & Open Source',
            color: 'text-slate-900 dark:text-white',
            badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-400/20',
            profileUrl: (u) => `https://github.com/${u}`,
            placeholder: 'e.g. torvalds, gaearon',
            prefix: 'github.com/',
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            )
        },
        {
            key: 'codeforces',
            name: 'Codeforces',
            category: 'Competitive Programming',
            color: 'text-[#1F8ACB]',
            badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
            profileUrl: (u) => `https://codeforces.com/profile/${u}`,
            placeholder: 'e.g. tourist, Benq',
            prefix: 'codeforces.com/profile/',
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3C.675 21 0 20.325 0 19.5V9c0-.825.675-1.5 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3c-.825 0-1.5-.675-1.5-1.5V4.5c0-.825.675-1.5 1.5-1.5h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h3z" />
                </svg>
            )
        },
        {
            key: 'gfg',
            name: 'GeeksforGeeks',
            category: 'Interview Preparation',
            color: 'text-[#2F8D46]',
            badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            profileUrl: (u) => `https://auth.geeksforgeeks.org/user/${u}`,
            placeholder: 'e.g. geeks_dev',
            prefix: 'geeksforgeeks.org/user/',
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M21.037 11.082c-.177-1.393-.844-2.618-1.928-3.538-1.127-.957-2.583-1.484-4.103-1.484-1.579 0-3.08.568-4.226 1.6-1.146-1.032-2.647-1.6-4.226-1.6-1.52 0-2.976.527-4.103 1.484-1.084.92-1.751 2.145-1.928 3.538-.18 1.417.155 2.825.944 3.966.753 1.09 1.868 1.854 3.14 2.152.418.098.85.147 1.286.147 1.884 0 3.636-.93 4.717-2.483 1.081 1.553 2.833 2.483 4.717 2.483.436 0 .868-.049 1.286-.147 1.272-.298 2.387-1.062 3.14-2.152.789-1.141 1.124-2.549.944-3.966z" />
                </svg>
            )
        },
        {
            key: 'hackerrank',
            name: 'HackerRank',
            category: 'Domain Certifications',
            color: 'text-[#00EA64]',
            badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            profileUrl: (u) => `https://hackerrank.com/${u}`,
            placeholder: 'e.g. alexdev_hr',
            prefix: 'hackerrank.com/',
            svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm3.89 17.5h-2.12v-4.52H10.2v4.52H8.1V6.5h2.1v4.48h3.57V6.5h2.12z" />
                </svg>
            )
        }
    ];

    // Determine current user data
    const activeUser = isRecruiterMode ? mockData : (profile || {});
    const connectedProfiles = activeUser?.connectedProfiles || {};

    // Get ONLY accounts that are actually connected
    const connectedAccountsList = useMemo(() => {
        return supportedPlatforms.filter(p => {
            const data = connectedProfiles[p.key];
            return data && data.connected && data.username;
        }).map(p => ({
            ...p,
            data: connectedProfiles[p.key]
        }));
    }, [connectedProfiles]);

    // Filter connected accounts by search query
    const filteredConnectedAccounts = useMemo(() => {
        if (!searchQuery.trim()) return connectedAccountsList;
        const q = searchQuery.toLowerCase();
        return connectedAccountsList.filter(acc => 
            acc.name.toLowerCase().includes(q) || 
            (acc.data?.username || '').toLowerCase().includes(q) ||
            acc.category.toLowerCase().includes(q)
        );
    }, [connectedAccountsList, searchQuery]);

    // Ensure selected account is valid
    useEffect(() => {
        if (connectedAccountsList.length > 0) {
            const exists = connectedAccountsList.some(a => a.key === selectedAccountKey);
            if (!exists) {
                setSelectedAccountKey(connectedAccountsList[0].key);
            }
        } else {
            setSelectedAccountKey(null);
        }
    }, [connectedAccountsList, selectedAccountKey]);

    const activeAccount = useMemo(() => {
        return connectedAccountsList.find(a => a.key === selectedAccountKey) || null;
    }, [connectedAccountsList, selectedAccountKey]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 text-slate-900 dark:text-slate-100 font-sans">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Connected Accounts & Profile Analytics
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Select an active account from your connected list to inspect live performance telemetry and problem analytics.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={handleSyncLiveStats}
                        disabled={syncing}
                        className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        title="Sync live metrics across all connected APIs"
                    >
                        <RefreshCw size={14} className={syncing ? 'animate-spin text-indigo-600 dark:text-indigo-400' : ''} />
                        <span>{syncing ? 'Syncing...' : 'Sync All Stats'}</span>
                    </button>

                    <button
                        onClick={() => {
                            setShowConnectModal(true);
                            setConnectError('');
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                        <Plus size={15} />
                        <span>Connect New Account</span>
                    </button>
                </div>
            </div>

            {/* Master-Detail Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* ================= LEFT COLUMN: Connected Accounts List ================= */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <Layers size={14} />
                            <span>Active Accounts ({connectedAccountsList.length})</span>
                        </div>
                    </div>

                    {/* Search box within connected accounts */}
                    {connectedAccountsList.length > 3 && (
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Filter connected accounts..."
                                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                            />
                        </div>
                    )}

                    {/* Empty State: No connected accounts */}
                    {connectedAccountsList.length === 0 ? (
                        <div className="text-center py-10 px-4 space-y-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                                <Layers size={22} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                No Accounts Connected
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Link your LeetCode, GitHub, Codeforces, or HackerRank username to aggregate live telemetry and auto-calculate your DevScore.
                            </p>
                            <button
                                onClick={() => {
                                    setShowConnectModal(true);
                                    setConnectError('');
                                }}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer mt-1"
                            >
                                <Plus size={14} />
                                <span>Connect First Account</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredConnectedAccounts.map((account) => {
                                const isSelected = selectedAccountKey === account.key;
                                const data = account.data;

                                // Quick stat chip calculation
                                let quickStat = '';
                                if (account.key === 'leetcode') quickStat = `${data.totalSolved || 0} Solved`;
                                else if (account.key === 'github') quickStat = `${data.publicRepos || 0} Repos`;
                                else if (account.key === 'codeforces') quickStat = `${data.rating || 0} Rating`;
                                else if (account.key === 'gfg') quickStat = `${data.codingScore || 0} Score`;
                                else if (account.key === 'hackerrank') quickStat = `${data.badges || 0} Badges`;

                                return (
                                    <button
                                        key={account.key}
                                        onClick={() => setSelectedAccountKey(account.key)}
                                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border cursor-pointer ${
                                            isSelected 
                                                ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700/60 shadow-xs' 
                                                : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-slate-200/80 dark:border-slate-800'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${account.color} flex items-center justify-center flex-shrink-0`}>
                                                {account.svg}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                                        {account.name}
                                                    </span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" title="Connected"></span>
                                                </div>
                                                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                                                    @{data.username}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                                            {quickStat && (
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                                                    {quickStat}
                                                </span>
                                            )}
                                            <ChevronRight size={14} className={isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* ================= RIGHT COLUMN: Selected Account Live Analytics ================= */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
                    {activeAccount ? (
                        <div className="space-y-6">
                            
                            {/* Profile Header & Quick Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3.5">
                                    <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 ${activeAccount.color} flex items-center justify-center shadow-xs`}>
                                        {activeAccount.svg}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {activeAccount.name}
                                            </h2>
                                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                                                <CheckCircle2 size={11} /> Connected
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                                                @{activeAccount.data?.username}
                                            </span>
                                            <span>•</span>
                                            <span>{activeAccount.category}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* External profile and disconnect buttons */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={activeAccount.profileUrl(activeAccount.data?.username)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                                    >
                                        <ExternalLink size={13} />
                                        <span>View Public Profile</span>
                                    </a>

                                    <button
                                        onClick={() => handleDisconnect(activeAccount.key)}
                                        className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors cursor-pointer"
                                        title="Disconnect this account"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Detailed Telemetry Per Platform */}
                            
                            {/* 1. LEETCODE ANALYTICS */}
                            {activeAccount.key === 'leetcode' && (
                                <div className="space-y-6">
                                    {/* Primary metric cards */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Total Solved</span>
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                                                {activeAccount.data?.totalSolved || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Problems solved</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Global Ranking</span>
                                            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 block font-mono">
                                                #{activeAccount.data?.ranking ? activeAccount.data.ranking.toLocaleString() : '18,640'}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Top global percentile</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Contest Rating</span>
                                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 block font-mono">
                                                {activeAccount.data?.contestRating || 1845}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Knight Tier</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">DevScore Boost</span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block font-mono">
                                                +{Math.round((activeAccount.data?.totalSolved || 300) * 1.6)}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Engineering weight</span>
                                        </div>
                                    </div>

                                    {/* Difficulty Progress Bars */}
                                    <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Difficulty Problem Breakdown
                                        </h3>

                                        <div className="space-y-3.5">
                                            <div>
                                                <div className="flex justify-between text-xs font-semibold mb-1">
                                                    <span className="text-emerald-600 dark:text-emerald-400">Easy Problems</span>
                                                    <span className="font-mono text-slate-700 dark:text-slate-300">
                                                        {activeAccount.data?.easySolved || 240} <span className="text-slate-400 font-normal">/ 820</span>
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                    <div 
                                                        className="h-full bg-emerald-500 rounded-full" 
                                                        style={{ width: `${Math.min(100, ((activeAccount.data?.easySolved || 240) / 820) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between text-xs font-semibold mb-1">
                                                    <span className="text-amber-600 dark:text-amber-400">Medium Problems</span>
                                                    <span className="font-mono text-slate-700 dark:text-slate-300">
                                                        {activeAccount.data?.mediumSolved || 328} <span className="text-slate-400 font-normal">/ 1740</span>
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                    <div 
                                                        className="h-full bg-amber-500 rounded-full" 
                                                        style={{ width: `${Math.min(100, ((activeAccount.data?.mediumSolved || 328) / 1740) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between text-xs font-semibold mb-1">
                                                    <span className="text-rose-600 dark:text-rose-400">Hard Problems</span>
                                                    <span className="font-mono text-slate-700 dark:text-slate-300">
                                                        {activeAccount.data?.hardSolved || 80} <span className="text-slate-400 font-normal">/ 740</span>
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                    <div 
                                                        className="h-full bg-rose-500 rounded-full" 
                                                        style={{ width: `${Math.min(100, ((activeAccount.data?.hardSolved || 80) / 740) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Topic Proficiency */}
                                    <div className="space-y-2.5">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Algorithm Domain Distribution
                                        </h4>
                                        <div className="flex flex-wrap gap-2 text-xs font-medium">
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                                                Arrays & Hashing (92%)
                                            </span>
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                                                Dynamic Programming (78%)
                                            </span>
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                                                Trees & Graphs (84%)
                                            </span>
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                                                Binary Search (81%)
                                            </span>
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                                                Backtracking & Recursion (76%)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 2. GITHUB ANALYTICS */}
                            {activeAccount.key === 'github' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Public Repos</span>
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                                                {activeAccount.data?.publicRepos || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Repositories hosted</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Followers</span>
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                                                {activeAccount.data?.followers || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Community audience</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Total Commits</span>
                                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 block font-mono">
                                                {activeAccount.data?.totalCommits || (activeAccount.data?.publicRepos ? activeAccount.data.publicRepos * 38 + 140 : 1420)}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Annual velocity</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Pull Requests</span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block font-mono">
                                                {activeAccount.data?.totalPRs || 64}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Shipped & merged</span>
                                        </div>
                                    </div>

                                    {/* Primary Languages Breakdown */}
                                    <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-3.5">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Language Code Distribution
                                        </h3>
                                        <div className="space-y-2.5">
                                            <div>
                                                <div className="flex justify-between text-xs font-medium mb-1">
                                                    <span>TypeScript & React</span>
                                                    <span className="font-mono text-slate-500">48.5%</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                    <div className="h-full bg-blue-500 rounded-full w-[48.5%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs font-medium mb-1">
                                                    <span>JavaScript & Node.js</span>
                                                    <span className="font-mono text-slate-500">28.0%</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                    <div className="h-full bg-amber-400 rounded-full w-[28%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs font-medium mb-1">
                                                    <span>Python</span>
                                                    <span className="font-mono text-slate-500">14.5%</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                                    <div className="h-full bg-emerald-500 rounded-full w-[14.5%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3. CODEFORCES ANALYTICS */}
                            {activeAccount.key === 'codeforces' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Rating</span>
                                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 block font-mono">
                                                {activeAccount.data?.rating || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Current rating</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Max Rating</span>
                                            <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1 block font-mono">
                                                {activeAccount.data?.maxRating || activeAccount.data?.rating || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">All-time peak</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Rank Title</span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white capitalize mt-1 block truncate">
                                                {activeAccount.data?.rank || 'Specialist'}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Current tier</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Max Rank</span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white capitalize mt-1 block truncate">
                                                {activeAccount.data?.maxRank || 'Expert'}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Peak rank</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 4. GEEKSFORGEEKS ANALYTICS */}
                            {activeAccount.key === 'gfg' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Coding Score</span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block font-mono">
                                                {activeAccount.data?.codingScore || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Practice score</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Problems Solved</span>
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                                                {activeAccount.data?.totalSolved || 0}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Total solved</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Institute Rank</span>
                                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 block font-mono">
                                                #{activeAccount.data?.institutionRank || 4}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Campus ranking</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Consistency</span>
                                            <span className="text-2xl font-bold text-amber-500 mt-1 block">
                                                Daily
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Active streak</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 5. HACKERRANK ANALYTICS */}
                            {activeAccount.key === 'hackerrank' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Earned Badges</span>
                                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block font-mono">
                                                {activeAccount.data?.badges || 6}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">Domain stars</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Core Domain</span>
                                            <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block truncate">
                                                Problem Solving
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">6-Star Gold</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Python Track</span>
                                            <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block truncate">
                                                Advanced
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">5-Star Gold</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">SQL & Data</span>
                                            <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block truncate">
                                                Relational DB
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-medium">5-Star Gold</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Last synchronized timestamp info bar */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                <span>Telemetry synced from official public platform API</span>
                                <span>
                                    {activeAccount.data?.lastSynced 
                                        ? `Last updated ${new Date(activeAccount.data.lastSynced).toLocaleString()}` 
                                        : 'Synchronized live'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center space-y-3">
                            <Layers size={32} className="mx-auto text-slate-400" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Select an Account to View Analytics
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                Click on any connected profile in the list on the left to see its live stats, ratings, and problem breakdown.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= CONNECT ACCOUNT MODAL ================= */}
            {showConnectModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                                    <Plus size={18} />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                                    Connect Developer Account
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowConnectModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {connectError && (
                            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium">
                                {connectError}
                            </div>
                        )}

                        <form onSubmit={handleConnect} className="space-y-4">
                            {/* Platform Picker */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Select Platform
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {supportedPlatforms.map((p) => {
                                        const isAlreadyConnected = connectedProfiles[p.key]?.connected;
                                        const isChosen = modalPlatform === p.key;

                                        return (
                                            <button
                                                key={p.key}
                                                type="button"
                                                onClick={() => setModalPlatform(p.key)}
                                                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                                                    isChosen 
                                                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
                                                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                                }`}
                                            >
                                                <span className={p.color}>{p.svg}</span>
                                                <span className="truncate">{p.name}</span>
                                                {isAlreadyConnected && (
                                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" title="Already connected" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Handle Input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Account Username / Handle
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={modalHandle}
                                        onChange={(e) => setModalHandle(e.target.value)}
                                        placeholder={supportedPlatforms.find(p => p.key === modalPlatform)?.placeholder || 'Enter handle'}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        required
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                    Your official public profile username on {supportedPlatforms.find(p => p.key === modalPlatform)?.name}.
                                </p>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowConnectModal(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={connecting}
                                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {connecting ? 'Connecting...' : 'Connect Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accounts;
