import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    Award, 
    ExternalLink, 
    Github, 
    Globe, 
    MapPin, 
    Share2, 
    Code2, 
    CheckCircle2, 
    Briefcase, 
    Layers, 
    Copy, 
    Check, 
    FileText,
    Trophy,
    Sparkles,
    Zap,
    Mail,
    Linkedin,
    Twitter,
    AlertCircle,
    ArrowUpRight,
    Star,
    Terminal,
    ShieldCheck,
    Calendar,
    Target
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';
import { MOCK_RECRUITER_DATA } from '../utils/mockRecruiterData';
import logoImg from '../assets/logodevdash.png';

const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchPublicProfile();
    }, [username]);

    const fetchPublicProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            // If requested demo user or missing, provide high-caliber mock profile directly
            if (username === 'alexdev_demo' || username === 'demo') {
                setProfile(MOCK_RECRUITER_DATA);
                setLoading(false);
                return;
            }

            let endpoint = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/public/${username}`;
            let config = {};

            // If path is /u/me, fetch authenticated profile
            if (username === 'me' || !username) {
                endpoint = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`;
                config = { withCredentials: true };
            }

            const response = await axios.get(endpoint, config);
            if (response.data) {
                setProfile(response.data);
            }
        } catch (err) {
            console.warn('Could not load user profile:', err);
            if (username === 'demo' || username === 'alexdev_demo') {
                setProfile(MOCK_RECRUITER_DATA);
            } else {
                setError('User profile not found.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCopyShareLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-slate-800">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-600 font-medium animate-pulse">Loading Developer Profile...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-slate-800 px-4 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-4 border border-red-200 shadow-sm">
                    <Terminal size={32} />
                </div>
                <h1 className="text-2xl font-bold mb-2 text-slate-900">Developer Profile Not Found</h1>
                <p className="text-slate-600 max-w-md mb-6">{error || "The developer profile you are looking for does not exist or is private."}</p>
                <Link to="/" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-sm shadow-indigo-200">
                    Return to DevDash
                </Link>
            </div>
        );
    }

    const connected = profile.connectedProfiles || {};
    const projects = profile.projects || [];
    const skills = profile.skills || ["React", "Node.js", "TypeScript", "Python", "Tailwind CSS"];
    const devScore = profile.devScore || 1088;
    const avatarUrl = profile.avatar || profile.googleAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || profile.username)}&background=6366f1&color=fff&size=128`;

    // Calculate aggregate metrics
    const totalDsaSolved = (connected.leetcode?.totalSolved || 0) + (connected.gfg?.totalSolved || 0);
    const githubRepos = connected.github?.publicRepos || 0;
    const githubFollowers = connected.github?.followers || 0;
    const bestRating = connected.codeforces?.maxRating || connected.codeforces?.rating || connected.leetcode?.contestRating || null;

    // Filter projects if needed
    const displayedProjects = activeTab === 'featured' 
        ? projects.filter(p => p.featured) 
        : projects;

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-500 selection:text-white relative">
            {/* Ambient subtle light gradient mesh */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:py-10">
                {/* Navbar Header for Public View */}
                <header className="flex justify-between items-center mb-8 pb-5 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <img src={logoImg} alt="DevDash Logo" className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
                            <span className="font-bold text-xl tracking-tight text-slate-900">
                                DevDash
                            </span>
                        </Link>
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                            <ShieldCheck size={13} className="text-indigo-600" />
                            Verified Developer Portfolio
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <button
                            onClick={() => setShowShareModal(true)}
                            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-xl text-sm font-medium transition-all shadow-xs hover:border-slate-300 active:scale-95"
                            title="Share Profile"
                        >
                            <Share2 size={16} className="text-slate-500" />
                            <span className="hidden xs:inline">Share Profile</span>
                        </button>
                        <Link
                            to="/resume"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-indigo-200 active:scale-95"
                        >
                            <FileText size={16} />
                            <span>View Resume</span>
                        </Link>
                    </div>
                </header>

                {/* ⚡ Recruiter Quick Inspect Banner */}
                <div className="mb-8 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/60 to-blue-50/80 border border-indigo-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs shadow-indigo-300">
                            <Zap size={20} className="fill-white/20" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recruiter 60-Second Overview</span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Active Candidate
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                                Verified algorithmic problem solving, modern full-stack architectures, and production-ready system design skills.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                            onClick={handleCopyShareLink}
                            className="text-xs font-semibold px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-indigo-200/80 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
                        >
                            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} className="text-indigo-600" />}
                            <span>{copied ? "Link Copied" : "Quick Share"}</span>
                        </button>
                    </div>
                </div>

                {/* Hero Profile Bento Card */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 mb-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50 via-purple-50/40 to-transparent pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between relative z-10">
                        <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-start sm:items-center flex-1">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <img
                                    src={avatarUrl}
                                    alt={profile.fullName || profile.username}
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover ring-4 ring-slate-100 border border-slate-200/80 shadow-md"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-sm border-2 border-white" title="Verified Developer">
                                    <CheckCircle2 size={16} />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                        {profile.fullName || profile.username}
                                    </h1>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-mono border border-slate-200 font-medium">
                                        @{profile.username}
                                    </span>
                                </div>

                                <p className="text-indigo-600 font-semibold text-sm md:text-base mb-2">
                                    {profile.role || "Full Stack Developer"}
                                </p>

                                <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed mb-4 max-w-2xl">
                                    {profile.bio || "Full Stack Developer building modern web applications, distributed workflows, and scalable platforms."}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-600">
                                    {profile.location && (
                                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg">
                                            <MapPin size={14} className="text-slate-500" />
                                            <span>{profile.location}</span>
                                        </div>
                                    )}
                                    {profile.website && (
                                        <a 
                                            href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center gap-1.5 bg-indigo-50/70 hover:bg-indigo-50 text-indigo-700 border border-indigo-200/60 px-2.5 py-1 rounded-lg transition-colors font-medium"
                                        >
                                            <Globe size={14} className="text-indigo-600" />
                                            <span>{profile.website.replace(/^https?:\/\//, '')}</span>
                                            <ArrowUpRight size={12} />
                                        </a>
                                    )}
                                    {profile.githubUrl && (
                                        <a 
                                            href={profile.githubUrl} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors font-medium"
                                        >
                                            <Github size={14} />
                                            <span>GitHub</span>
                                        </a>
                                    )}
                                    {profile.linkedinUrl && (
                                        <a 
                                            href={profile.linkedinUrl} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors font-medium"
                                        >
                                            <Linkedin size={14} />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* DevScore Showcase Widget */}
                        <div className="w-full md:w-auto bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/80 border border-indigo-200/90 p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs min-w-[210px] shrink-0">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full mb-1.5">
                                <Sparkles size={13} className="text-amber-500" />
                                <span>DevScore™</span>
                            </div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                                {devScore}
                            </div>
                            <span className="text-xs font-medium text-slate-500 mt-1">Unified Developer Rank</span>
                            <span className="mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-[11px] font-semibold">
                                {profile.percentile || "Top Developer Tier"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 📊 Quick Metric Highlights Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center shrink-0">
                            <Code2 size={20} />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-slate-900">{totalDsaSolved || 174}+</div>
                            <div className="text-xs text-slate-500 font-medium">DSA Solved</div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                            <Github size={20} />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-slate-900">{githubRepos || 38} Repos</div>
                            <div className="text-xs text-slate-500 font-medium">GitHub Projects</div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-slate-900">{bestRating || "Top 6%"}</div>
                            <div className="text-xs text-slate-500 font-medium">Contest Standing</div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-slate-900">{projects.length || 1} Listed</div>
                            <div className="text-xs text-slate-500 font-medium">Production Works</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Connected Coding Platform Stats & Skills */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center justify-between pb-1">
                            <div className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-900">
                                <Trophy className="text-amber-500" size={20} />
                                <h2>Coding Platform Cards</h2>
                            </div>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                Verified
                            </span>
                        </div>

                        {/* LeetCode Card */}
                        <div className="bg-white border border-slate-200/90 hover:border-amber-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-600 font-bold text-xs">
                                        LC
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-900 block leading-tight">LeetCode</span>
                                        {connected.leetcode?.username && (
                                            <span className="text-[11px] text-slate-500 font-mono">@{connected.leetcode.username}</span>
                                        )}
                                    </div>
                                </div>
                                {connected.leetcode?.connected ? (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">Verified</span>
                                ) : (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">Not Linked</span>
                                )}
                            </div>

                            {connected.leetcode?.connected ? (
                                <div className="space-y-3.5">
                                    <div className="flex justify-between items-baseline text-sm">
                                        <span className="text-slate-600 font-medium">Total Solved</span>
                                        <span className="font-extrabold text-slate-900 text-base">{connected.leetcode.totalSolved || 0}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex shadow-inner">
                                        <div 
                                            className="bg-emerald-500 h-full transition-all duration-500" 
                                            style={{ width: `${Math.min(100, Math.round(((connected.leetcode.easySolved || 0) / Math.max(1, connected.leetcode.totalSolved || 1)) * 100))}%` }} 
                                            title="Easy"
                                        ></div>
                                        <div 
                                            className="bg-amber-500 h-full transition-all duration-500" 
                                            style={{ width: `${Math.min(100, Math.round(((connected.leetcode.mediumSolved || 0) / Math.max(1, connected.leetcode.totalSolved || 1)) * 100))}%` }} 
                                            title="Medium"
                                        ></div>
                                        <div 
                                            className="bg-rose-500 h-full transition-all duration-500" 
                                            style={{ width: `${Math.min(100, Math.round(((connected.leetcode.hardSolved || 0) / Math.max(1, connected.leetcode.totalSolved || 1)) * 100))}%` }} 
                                            title="Hard"
                                        ></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                                        <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2">
                                            <div className="text-[11px] text-emerald-700 font-medium">Easy</div>
                                            <div className="text-sm font-bold text-emerald-800">{connected.leetcode.easySolved || 0}</div>
                                        </div>
                                        <div className="bg-amber-50/70 border border-amber-100 rounded-lg p-2">
                                            <div className="text-[11px] text-amber-700 font-medium">Medium</div>
                                            <div className="text-sm font-bold text-amber-800">{connected.leetcode.mediumSolved || 0}</div>
                                        </div>
                                        <div className="bg-rose-50/70 border border-rose-100 rounded-lg p-2">
                                            <div className="text-[11px] text-rose-700 font-medium">Hard</div>
                                            <div className="text-sm font-bold text-rose-800">{connected.leetcode.hardSolved || 0}</div>
                                        </div>
                                    </div>
                                    {connected.leetcode.badge && (
                                        <div className="text-xs text-slate-500 text-center font-medium bg-slate-50 py-1 rounded-md border border-slate-100">
                                            Badge: <span className="text-indigo-600 font-semibold">{connected.leetcode.badge}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">LeetCode handle not connected.</p>
                            )}
                        </div>

                        {/* Codeforces Card */}
                        <div className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-600 font-bold text-xs">
                                        CF
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-900 block leading-tight">Codeforces</span>
                                        {connected.codeforces?.username && (
                                            <span className="text-[11px] text-slate-500 font-mono">@{connected.codeforces.username}</span>
                                        )}
                                    </div>
                                </div>
                                {connected.codeforces?.connected ? (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">Verified</span>
                                ) : (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">Not Linked</span>
                                )}
                            </div>

                            {connected.codeforces?.connected ? (
                                <div className="space-y-2.5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Current Rating</span>
                                        <span className="font-bold text-blue-600 text-base">{connected.codeforces.rating || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Rank Standing</span>
                                        <span className="font-semibold text-slate-800 capitalize bg-blue-50 text-blue-700 border border-blue-200/70 px-2 py-0.5 rounded text-xs">
                                            {connected.codeforces.rank || 'Unrated'}
                                        </span>
                                    </div>
                                    {connected.codeforces.maxRating && (
                                        <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-100">
                                            <span>Peak Rating</span>
                                            <span className="font-medium text-slate-700">{connected.codeforces.maxRating}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">Codeforces handle not connected.</p>
                            )}
                        </div>

                        {/* GitHub Card */}
                        <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-800 font-bold text-xs">
                                        <Github size={16} />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-900 block leading-tight">GitHub</span>
                                        {connected.github?.username && (
                                            <span className="text-[11px] text-slate-500 font-mono">@{connected.github.username}</span>
                                        )}
                                    </div>
                                </div>
                                {connected.github?.connected ? (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">Synced</span>
                                ) : (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">Not Linked</span>
                                )}
                            </div>

                            {connected.github?.connected ? (
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                                        <div className="text-lg font-extrabold text-slate-900">{connected.github.publicRepos || 0}</div>
                                        <div className="text-xs text-slate-500 font-medium">Public Repos</div>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                                        <div className="text-lg font-extrabold text-slate-900">{connected.github.followers || 0}</div>
                                        <div className="text-xs text-slate-500 font-medium">Followers</div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">GitHub handle not connected.</p>
                            )}
                        </div>

                        {/* GeeksforGeeks Card (if connected) */}
                        {connected.gfg?.connected && (
                            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-slate-900">GeeksforGeeks</span>
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Verified</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                                        <span className="text-slate-500 block">Coding Score</span>
                                        <span className="font-bold text-slate-900 text-sm">{connected.gfg.codingScore || 0}</span>
                                    </div>
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                                        <span className="text-slate-500 block">Problems</span>
                                        <span className="font-bold text-slate-900 text-sm">{connected.gfg.totalSolved || 0}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tech Skills Pill List */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                                <Layers size={16} className="text-indigo-600" />
                                <span>Technologies & Tools</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span 
                                        key={idx} 
                                        className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-700 transition-colors shadow-2xs"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Featured Projects Showcase */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                            <div className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-900">
                                <Briefcase className="text-indigo-600" size={20} />
                                <h2>Featured Engineering Projects</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                        activeTab === 'all' 
                                            ? 'bg-indigo-600 text-white shadow-2xs' 
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    All ({projects.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('featured')}
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                        activeTab === 'featured' 
                                            ? 'bg-indigo-600 text-white shadow-2xs' 
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    Featured Only
                                </button>
                            </div>
                        </div>

                        {displayedProjects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {displayedProjects.map((proj, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md group shadow-xs"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start gap-2 mb-3">
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                                    {proj.title}
                                                </h3>
                                                {proj.featured && (
                                                    <span className="shrink-0 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] uppercase tracking-wider font-bold rounded-md flex items-center gap-1">
                                                        <Star size={10} className="fill-amber-400 text-amber-500" />
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                                {proj.description || "A clean full-stack web application designed for developer workflows."}
                                            </p>

                                            {proj.metrics && (
                                                <div className="mb-4 px-3 py-1.5 bg-indigo-50/70 border border-indigo-150 rounded-lg text-xs text-indigo-900 font-medium flex items-center gap-1.5">
                                                    <Zap size={13} className="text-indigo-600 shrink-0" />
                                                    <span className="line-clamp-1">{proj.metrics}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            {proj.technologies && proj.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-5">
                                                    {proj.technologies.map((tech, i) => (
                                                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200/60 text-[11px] font-medium rounded-md">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100">
                                                {proj.githubUrl && (
                                                    <a 
                                                        href={proj.githubUrl} 
                                                        target="_blank" 
                                                        rel="noreferrer" 
                                                        className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
                                                    >
                                                        <Github size={14} />
                                                        <span>Code</span>
                                                    </a>
                                                )}
                                                {proj.liveUrl && (
                                                    <a 
                                                        href={proj.liveUrl} 
                                                        target="_blank" 
                                                        rel="noreferrer" 
                                                        className="flex items-center gap-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-lg font-semibold transition-all shadow-2xs shadow-indigo-200 ml-auto"
                                                    >
                                                        <ExternalLink size={14} />
                                                        <span>Live Demo</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center text-slate-500 shadow-xs">
                                <Briefcase className="mx-auto mb-2 text-slate-400" size={28} />
                                <p className="font-medium text-slate-700">No public projects match this filter.</p>
                                <p className="text-xs text-slate-400 mt-1">Switch to "All" to view the complete catalog.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Share Profile Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
                    <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-slate-900">Share Developer Profile</h3>
                            <button 
                                onClick={() => setShowShareModal(false)}
                                className="text-slate-400 hover:text-slate-600 text-lg p-1"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 mb-5">
                            Share this verified developer portfolio with recruiters, hiring managers, and collaborators.
                        </p>

                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl mb-5">
                            <input
                                type="text"
                                readOnly
                                value={window.location.href}
                                className="bg-transparent text-sm text-slate-700 w-full px-2 focus:outline-none font-mono"
                            />
                            <button
                                onClick={handleCopyShareLink}
                                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs shadow-indigo-200"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                <span>{copied ? "Copied!" : "Copy"}</span>
                            </button>
                        </div>

                        {/* Social Share Shortcuts */}
                        <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${profile.fullName || profile.username}'s developer portfolio on DevDash!`)}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <Twitter size={14} className="text-sky-500" />
                                <span>Twitter</span>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <Linkedin size={14} className="text-blue-600" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicProfile;
