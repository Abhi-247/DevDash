import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    TrendingUp, 
    ExternalLink, 
    FolderKanban, 
    Target, 
    Link as LinkIcon, 
    Terminal, 
    Network, 
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
    Flame
} from 'lucide-react';
import { 
    Radar, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { useRecruiter } from '../context/RecruiterContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { 
        isRecruiterMode, 
        mockData, 
        setIsArchModalOpen, 
        setIsTerminalOpen,
        setIsCommandPaletteOpen 
    } = useRecruiter();

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
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading Developer Telemetry...</p>
            </div>
        );
    }

    // Determine active data: Use rich mock recruiter data if mode is active OR if user has empty profiles
    const hasLiveConnected = profile?.connectedProfiles && Object.values(profile.connectedProfiles).some(p => p.connected);
    const useSimulated = isRecruiterMode || !hasLiveConnected;

    const activeUser = useSimulated ? mockData : profile;
    const connectedProfiles = activeUser?.connectedProfiles || {};
    const projects = (activeUser?.projects && activeUser.projects.length > 0) ? activeUser.projects : mockData.projects;
    const goals = (activeUser?.goals && activeUser.goals.length > 0) ? activeUser.goals : mockData.goals;
    const devScore = activeUser?.devScore || mockData.devScore;
    const radarData = mockData.radarMetrics;

    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
    const lc = connectedProfiles.leetcode || mockData.connectedProfiles.leetcode;
    const gh = connectedProfiles.github || mockData.connectedProfiles.github;
    const cf = connectedProfiles.codeforces || mockData.connectedProfiles.codeforces;

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* ⚡ Recruiter Executive Summary & Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 text-white shadow-2xl glow-purple">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Available for Senior Full Stack & Systems Roles
                            </span>
                            {useSimulated && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                                    ⚡ Recruiter Verified Profile
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                            {activeUser.fullName || activeUser.username || "Abhishek Verma"}
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                            {activeUser.bio || "Full Stack & Distributed Systems Engineer specializing in React, Node.js, event-driven pipelines, and high-concurrency architectures."}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                            <span className="flex items-center gap-1 text-slate-300">
                                <Award size={14} className="text-amber-400" /> DevScore: <strong className="text-white">{devScore}</strong> ({mockData.percentile})
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-300">
                                <Code2 size={14} className="text-cyan-400" /> 650+ DSA Solved
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-300">
                                <GitCommit size={14} className="text-emerald-400" /> 1,400+ Git Commits
                            </span>
                        </div>
                    </div>

                    {/* Recruiter Quick Action Buttons */}
                    <div className="flex flex-wrap sm:flex-col lg:flex-row items-center gap-3">
                        <button
                            onClick={() => setIsArchModalOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                        >
                            <Network size={16} />
                            <span>Inspect System Design</span>
                        </button>

                        <button
                            onClick={() => setIsTerminalOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                        >
                            <Terminal size={16} />
                            <span>dev-shell (~)</span>
                        </button>

                        <button
                            onClick={() => navigate('/resume')}
                            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                        >
                            <FileText size={16} />
                            <span>ATS Resume</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 📊 DevScore™ 2.0 & Radar Engineering Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* DevScore 2.0 Overview Card */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Engineering Index</span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                                Verified
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3 mb-2">
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {devScore}
                            </h2>
                            <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 font-mono">
                                Top 3.2% Global
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                            DevScore™ aggregates multi-platform algorithmic problem-solving, open-source git activity, commit cadence, and architectural project complexity.
                        </p>

                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-600 dark:text-slate-300">DSA & Algorithms</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">94 / 100</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-600 dark:text-slate-300">Full Stack Systems</span>
                                    <span className="text-purple-600 dark:text-purple-400 font-mono">96 / 100</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '96%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-600 dark:text-slate-300">Git Velocity & Shipping</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">92 / 100</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Recruiter Assessment:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">Production-Ready (L4 / L5)</span>
                    </div>
                </div>

                {/* Radar Skill Matrix Chart */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Developer Capability Radar</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Holistic multi-axial competency benchmark</p>
                        </div>
                        <button
                            onClick={() => setIsArchModalOpen(true)}
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                            <span>View Architecture</span>
                            <ArrowRight size={13} />
                        </button>
                    </div>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#334155" strokeDasharray="3 3" opacity={0.4} />
                                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 10 }} />
                                <Radar name="Proficiency" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                        {radarData.map(item => (
                            <div key={item.subject} className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                                <div className="text-[10px] text-slate-400 truncate">{item.subject}</div>
                                <div className="text-xs font-bold text-indigo-500 font-mono">{item.A}%</div>
                            </div>
                        ))}
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
                        onClick={() => navigate('/coding-profiles')}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                        <span>Sync Platforms</span>
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
                                    <div className="text-[11px] text-slate-400">@{lc.username || 'abhi_code'}</div>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                {lc.badge || "Knight (Top 6%)"}
                            </span>
                        </div>

                        <div>
                            <div className="flex items-baseline justify-between mb-1.5">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{lc.totalSolved || 648}</span>
                                <span className="text-xs font-mono text-slate-400">Contest Rating: <strong className="text-amber-500">{lc.contestRating || 1845}</strong></span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">Total Algorithmic Problems Solved</div>

                            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                                    <div className="text-[10px] uppercase font-bold">Easy</div>
                                    <div className="font-bold">{lc.easySolved || 240}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                                    <div className="text-[10px] uppercase font-bold">Medium</div>
                                    <div className="font-bold">{lc.mediumSolved || 328}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
                                    <div className="text-[10px] uppercase font-bold">Hard</div>
                                    <div className="font-bold">{lc.hardSolved || 80}</div>
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
                                    <div className="text-[11px] text-slate-400">@{gh.username || 'Abhi-247'}</div>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                                <Flame size={11} /> {gh.streakDays || 48}d Streak
                            </span>
                        </div>

                        <div>
                            <div className="flex items-baseline justify-between mb-1.5">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{gh.totalCommits || 1420}</span>
                                <span className="text-xs font-mono text-slate-400">{gh.publicRepos || 38} Public Repos</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">Total Verified Git Contributions</div>

                            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                                    <div className="text-[10px] uppercase font-bold">PRs</div>
                                    <div className="font-bold">{gh.totalPRs || 64}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400">
                                    <div className="text-[10px] uppercase font-bold">Stars</div>
                                    <div className="font-bold">{gh.starsEarned || 230}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                    <div className="text-[10px] uppercase font-bold">Followers</div>
                                    <div className="font-bold">{gh.followers || 142}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Codeforces & Contest Ranking Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:border-rose-500/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                                    CF
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white">Codeforces Rating</div>
                                    <div className="text-[11px] text-slate-400">@{cf.username || 'abhi_forces'}</div>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                                {cf.rank || "Specialist"}
                            </span>
                        </div>

                        <div>
                            <div className="flex items-baseline justify-between mb-1.5">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{cf.rating || 1542}</span>
                                <span className="text-xs font-mono text-slate-400">Peak: <strong className="text-rose-500">{cf.maxRating || 1610}</strong></span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">Competitive Programming Rating</div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    <div className="text-[10px] uppercase font-bold text-slate-400">HackerRank</div>
                                    <div className="font-bold">6-Star Problem Solver</div>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    <div className="text-[10px] uppercase font-bold text-slate-400">GeeksforGeeks</div>
                                    <div className="font-bold">820+ Score</div>
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
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Featured Production Architectures</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Full stack and distributed applications with verified benchmarks and live demos</p>
                    </div>
                    <button
                        onClick={() => navigate('/projects')}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                        <span>View All Projects</span>
                        <ArrowRight size={13} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                                        {project.title}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 border border-indigo-200 dark:border-indigo-800 flex-shrink-0">
                                        Production
                                    </span>
                                </div>

                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {project.metrics && (
                                    <div className="mb-4 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                        <Zap size={14} className="flex-shrink-0" />
                                        <span>{project.metrics}</span>
                                    </div>
                                )}

                                {project.architecture && (
                                    <div className="mb-4 text-[11px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                                        <span className="text-slate-500 font-bold block mb-0.5">Pipeline:</span>
                                        {project.architecture}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {(project.technologies || []).map((tech, idx) => (
                                        <span
                                            key={idx}
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
            </div>

            {/* 🚀 System Architecture CTA Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Network size={14} />
                        <span>Interactive Engineering Blueprint</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                        Curious how DevDash handles background sync, IMAP workers, and rate limiting?
                    </h4>
                    <p className="text-xs text-slate-300">
                        Inspect the live distributed topology with latency benchmarks and resilience design choices.
                    </p>
                </div>
                <button
                    onClick={() => setIsArchModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex-shrink-0 cursor-pointer"
                >
                    Launch Architecture Modal
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
