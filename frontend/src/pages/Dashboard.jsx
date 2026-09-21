import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    TrendingUp, 
    ExternalLink, 
    FolderKanban, 
    Target, 
    Link as LinkIcon, 
    Layers,
    Sparkles, 
    ShieldCheck, 
    GitCommit, 
    CheckCircle2, 
    Award, 
    Zap, 
    Code2, 
    Github, 
    ArrowRight,
    Play,
    FileText,
    Cpu,
    Flame,
    Plus,
    Check,
    X
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { 
        isRecruiterMode, 
        mockData 
    } = useRecruiter();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dismissQuickstart, setDismissQuickstart] = useState(() => localStorage.getItem('devdash_hide_quickstart') === 'true');

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
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading Developer Telemetry...</p>
            </div>
        );
    }

    // Determine active user data: Use mock recruiter data ONLY if explicitly toggled to Recruiter Demo Mode
    const activeUser = isRecruiterMode ? mockData : (profile || {});
    const connectedProfiles = activeUser?.connectedProfiles || {};
    const projects = activeUser?.projects || [];
    const goals = activeUser?.goals || [];
    const devScore = activeUser?.devScore || 500;

    const lc = connectedProfiles.leetcode || {};
    const gh = connectedProfiles.github || {};
    const cf = connectedProfiles.codeforces || {};

    const hasAnyConnected = Object.values(connectedProfiles).some(p => p && p.connected);
    const isNewUser = !hasAnyConnected && projects.length === 0 && !isRecruiterMode;

    // Calculate engineering proficiency breakdown scores
    const dsaAxis = isRecruiterMode ? 94 : Math.min(98, Math.max(30, Math.round(30 + Math.min(65, (lc?.totalSolved || 0) * 0.15))));
    const fullStackAxis = isRecruiterMode ? 96 : Math.min(98, Math.max(35, Math.round(40 + ((activeUser.skills?.length || 0) * 5) + (projects.length * 8))));
    const gitAxis = isRecruiterMode ? 92 : Math.min(98, Math.max(30, Math.round(30 + Math.min(65, (gh?.publicRepos || 0) * 3 + (gh?.followers || 0) * 2))));

    const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
    const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* ⚡ Developer Executive Summary & Welcome Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Available for Engineering Roles
                            </span>
                            {isRecruiterMode ? (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
                                    ⚡ Recruiter Demo Mode
                                </span>
                            ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                    Verified Profile
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {activeUser.fullName || activeUser.username || "Developer"}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {activeUser.bio || "Full Stack Software Engineer building scalable applications, developer tools, and modern web architectures."}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium">
                                <Award size={13} className="text-amber-500" /> DevScore™: <strong className="text-slate-900 dark:text-white">{devScore}</strong>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium">
                                <Code2 size={13} className="text-indigo-500" /> {lc.totalSolved ? `${lc.totalSolved} DSA Solved` : 'DSA Tracker'}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium">
                                <GitCommit size={13} className="text-emerald-500" /> {gh.publicRepos ? `${gh.publicRepos} Public Repos` : 'Git Telemetry'}
                            </span>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                            onClick={() => navigate('/accounts')}
                            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                            <Layers size={15} />
                            <span>Connected Accounts</span>
                        </button>

                        <button
                            onClick={() => navigate('/resume')}
                            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                            <FileText size={15} />
                            <span>ATS Resume</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 🚀 Compact & Dismissible Quickstart Checklist */}
            {isNewUser && !dismissQuickstart && (
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                            <Sparkles size={15} />
                            <span>Quickstart Checklist</span>
                        </div>
                        <button
                            onClick={() => {
                                setDismissQuickstart(true);
                                localStorage.setItem('devdash_hide_quickstart', 'true');
                            }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-lg transition-colors cursor-pointer"
                            title="Dismiss checklist"
                        >
                            <X size={15} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div 
                            onClick={() => navigate('/accounts')}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all flex items-start gap-3 group"
                        >
                            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                <LinkIcon size={15} />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">1. Sync Accounts</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Link LeetCode, Codeforces, or GitHub.</p>
                            </div>
                        </div>

                        <div 
                            onClick={() => navigate('/projects')}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all flex items-start gap-3 group"
                        >
                            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex-shrink-0">
                                <FolderKanban size={15} />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">2. Add Featured Projects</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Showcase full-stack applications & repos.</p>
                            </div>
                        </div>

                        <div 
                            onClick={() => navigate('/u/me')}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all flex items-start gap-3 group"
                        >
                            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                                <ExternalLink size={15} />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">3. Share Public Portfolio</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Get your verified public showcase link.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 📊 DevScore™ Engineering Assessment */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Left Column: DevScore Metric & Index */}
                    <div className="lg:col-span-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Engineering Index</span>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                                {devScore > 1000 ? 'Verified Pro' : 'Calculated'}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {devScore}
                            </h2>
                            <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                {devScore > 1500 ? 'Top 5% Global' : 'Active Growth'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            DevScore™ dynamically aggregates algorithmic problem-solving across LeetCode & Codeforces, git shipping velocity, and technical project density.
                        </p>
                        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80">
                            <span className="text-slate-400 font-medium">Recruiter Assessment:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {devScore > 1500 ? 'Senior / Production-Ready' : 'Full Stack Developer'}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Engineering Axes Progress Breakdown */}
                    <div className="lg:col-span-7 bg-slate-50/70 dark:bg-slate-800/30 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800/60 space-y-4">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Engineering Proficiency Breakdown
                        </div>

                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-slate-700 dark:text-slate-300">DSA & Algorithmic Problem Solving</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold">{dsaAxis} / 100</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-700/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${dsaAxis}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-slate-700 dark:text-slate-300">Full Stack Systems Architecture</span>
                                    <span className="text-purple-600 dark:text-purple-400 font-mono font-semibold">{fullStackAxis} / 100</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-700/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: `${fullStackAxis}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-slate-700 dark:text-slate-300">Git Velocity & Production Shipping</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">{gitAxis} / 100</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-700/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${gitAxis}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⚡ Multi-Platform Algorithmic & Git Telemetry Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verified Platform Telemetry</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Live synchronized metrics from external coding and version control platforms</p>
                    </div>
                    <button
                        onClick={() => navigate('/accounts')}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                        <span>Manage Accounts</span>
                        <ArrowRight size={13} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* LeetCode Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:border-amber-500/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                                    LC
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white">LeetCode DSA</div>
                                    <div className="text-[11px] text-slate-400">{lc.username ? `@${lc.username}` : 'Not Connected'}</div>
                                </div>
                            </div>
                            {lc.connected ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                    {lc.ranking ? `Rank #${lc.ranking.toLocaleString()}` : 'Connected'}
                                </span>
                            ) : (
                                <button 
                                    onClick={() => navigate('/accounts')}
                                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500"
                                >
                                    + Connect
                                </button>
                            )}
                        </div>

                        <div>
                            <div className="flex items-baseline justify-between mb-1.5">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{lc.totalSolved || 0}</span>
                                <span className="text-xs font-mono text-slate-400">Total Solved</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">Algorithmic Problems Solved</div>

                            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                                    <div className="text-[10px] uppercase font-bold">Easy</div>
                                    <div className="font-bold">{lc.easySolved || 0}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                                    <div className="text-[10px] uppercase font-bold">Medium</div>
                                    <div className="font-bold">{lc.mediumSolved || 0}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
                                    <div className="text-[10px] uppercase font-bold">Hard</div>
                                    <div className="font-bold">{lc.hardSolved || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GitHub Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:border-indigo-500/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center">
                                    <Github size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white">GitHub Velocity</div>
                                    <div className="text-[11px] text-slate-400">{gh.username ? `@${gh.username}` : 'Not Connected'}</div>
                                </div>
                            </div>
                            {gh.connected ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                                    <Flame size={11} /> Connected
                                </span>
                            ) : (
                                <button 
                                    onClick={() => navigate('/accounts')}
                                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500"
                                >
                                    + Connect
                                </button>
                            )}
                        </div>

                        <div>
                            <div className="flex items-baseline justify-between mb-1.5">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{gh.publicRepos || 0}</span>
                                <span className="text-xs font-mono text-slate-400">Public Repos</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">Open Source Repositories & Activity</div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                                    <div className="text-[10px] uppercase font-bold">Followers</div>
                                    <div className="font-bold">{gh.followers || 0}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400">
                                    <div className="text-[10px] uppercase font-bold">Following</div>
                                    <div className="font-bold">{gh.following || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Codeforces Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:border-rose-500/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                                    CF
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white">Codeforces</div>
                                    <div className="text-[11px] text-slate-400">{cf.username ? `@${cf.username}` : 'Not Connected'}</div>
                                </div>
                            </div>
                            {cf.connected ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                                    {cf.rank || "Rated"}
                                </span>
                            ) : (
                                <button 
                                    onClick={() => navigate('/accounts')}
                                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500"
                                >
                                    + Connect
                                </button>
                            )}
                        </div>

                        <div>
                            <div className="flex items-baseline justify-between mb-1.5">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{cf.rating || 0}</span>
                                <span className="text-xs font-mono text-slate-400">Peak: <strong className="text-rose-500">{cf.maxRating || 0}</strong></span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">Competitive Programming Rating</div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    <div className="text-[10px] uppercase font-bold text-slate-400">Rank</div>
                                    <div className="font-bold truncate">{cf.rank || 'Unrated'}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    <div className="text-[10px] uppercase font-bold text-slate-400">Max Rank</div>
                                    <div className="font-bold truncate">{cf.maxRank || 'Unrated'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🏗️ Featured Production Systems & Architecture */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Featured Projects & Systems</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Full stack applications, system designs, and live deployments</p>
                    </div>
                    <button
                        onClick={() => navigate('/projects')}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                        <span>Manage Projects</span>
                        <ArrowRight size={13} />
                    </button>
                </div>

                {displayProjects.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3">
                        <FolderKanban size={36} className="mx-auto text-slate-400" />
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">No Projects Added Yet</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                            Add your repositories, system designs, or live applications to impress recruiters with live demos and architecture notes.
                        </p>
                        <button
                            onClick={() => navigate('/projects')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                            <Plus size={15} />
                            <span>Add Your First Project</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {displayProjects.map((project, idx) => (
                            <div
                                key={project._id || idx}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                                            {project.title}
                                        </h4>
                                        {project.featured && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 border border-indigo-200 dark:border-indigo-800 flex-shrink-0">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {(project.technologies || []).map((tech, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            <Github size={15} />
                                            <span>Source Code</span>
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-auto"
                                        >
                                            <ExternalLink size={15} />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
