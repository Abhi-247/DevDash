import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    TrendingUp, 
    TrendingDown,
    ExternalLink, 
    FolderKanban, 
    Target, 
    Link as LinkIcon, 
    Layers,
    Sparkles, 
    ShieldCheck, 
    GitCommit, 
    GitBranch,
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
    X,
    ChevronDown,
    HelpCircle,
    MoreHorizontal,
    Cloud,
    Download,
    Heart,
    MousePointerClick,
    Users,
    CheckCheck,
    Compass
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';
import boyHeroImg from '../assets/boyhero.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const { isRecruiterMode, mockData } = useRecruiter();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('Last 30 days');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('recent'); // 'recent' | 'platforms' | 'projects'
    const [mediaFilter, setMediaFilter] = useState('Show All Media');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [hoveredCell, setHoveredCell] = useState(null);

    // Generate 22 weeks of realistic GitHub daily contributions ending today
    const { contributionWeeks, monthLabels } = useMemo(() => {
        const weeks = [];
        const months = [];
        const today = new Date();
        const totalWeeks = 22;
        const totalDays = totalWeeks * 7;
        
        // Start date aligned to week start
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - totalDays + (6 - today.getDay()));

        let cursor = new Date(startDate);
        let currentMonth = '';

        for (let w = 0; w < totalWeeks; w++) {
            const week = [];
            const monthStr = cursor.toLocaleDateString('en-US', { month: 'short' });
            if (monthStr !== currentMonth) {
                months.push({ weekIndex: w, name: monthStr });
                currentMonth = monthStr;
            }

            for (let d = 0; d < 7; d++) {
                const diffTime = today - cursor;
                const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const isWeekend = cursor.getDay() === 0 || cursor.getDay() === 6;

                let count = 0;
                if (daysAgo >= 0 && daysAgo <= 24) {
                    // Active streak period: guaranteed active daily commits
                    const wave = Math.abs(Math.sin((daysAgo + 3) * 0.7));
                    count = isWeekend ? Math.round(wave * 3) + 1 : Math.round(wave * 6) + 3;
                } else if (daysAgo > 24 && daysAgo <= 154) {
                    // Organic developer rhythm
                    const hash = (w * 11 + d * 17) % 23;
                    if (hash > 7) {
                        count = isWeekend ? Math.floor(hash % 3) : Math.floor(hash % 7) + 1;
                    }
                }

                let level = 0;
                if (count > 0 && count <= 2) level = 1;
                else if (count > 2 && count <= 4) level = 2;
                else if (count > 4 && count <= 7) level = 3;
                else if (count > 7) level = 4;

                week.push({
                    date: cursor.toISOString().split('T')[0],
                    formattedDate: cursor.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    count,
                    level
                });

                cursor.setDate(cursor.getDate() + 1);
            }
            weeks.push(week);
        }

        return { contributionWeeks: weeks, monthLabels: months };
    }, []);

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
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Synchronizing Telemetry...</p>
            </div>
        );
    }

    const activeUser = isRecruiterMode ? mockData : (profile || {});
    const connectedProfiles = activeUser?.connectedProfiles || {};
    const projects = activeUser?.projects || [];
    const devScore = activeUser?.devScore || 1088;

    const lc = connectedProfiles.leetcode || {};
    const gh = connectedProfiles.github || {};
    const cf = connectedProfiles.codeforces || {};

    // Dynamic stats derived from real accounts or fallback defaults matching Image 1
    const dsaSolvedCount = lc?.totalSolved || 174;
    const gitCommitsCount = gh?.publicRepos ? (gh.publicRepos * 38 + 28) : 826;
    const acceptanceRate = lc?.easySolved ? `${Math.min(99, Math.round(((lc.easySolved + lc.mediumSolved) / Math.max(1, lc.totalSolved)) * 85))}%` : '18.2%';

    // Engineering axes
    const dsaAxis = isRecruiterMode ? 94 : Math.min(98, Math.max(30, Math.round(30 + Math.min(65, (lc?.totalSolved || 0) * 0.15))));
    const fullStackAxis = isRecruiterMode ? 96 : Math.min(98, Math.max(35, Math.round(40 + ((activeUser.skills?.length || 0) * 5) + (projects.length * 8))));
    const gitAxis = isRecruiterMode ? 92 : Math.min(98, Math.max(30, Math.round(30 + Math.min(65, (gh?.publicRepos || 0) * 3 + (gh?.followers || 0) * 2))));

    const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
    const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

    // Radial Gauge SVG calculations (77% filled semicircle)
    const gaugePercent = 0.77;
    const radius = 95;
    const circumference = Math.PI * radius; // Half-circle circumference
    const strokeDashoffset = circumference * (1 - gaugePercent);

    return (
        <div className="relative min-h-screen bg-[#F4F7FD] dark:bg-slate-950 p-4 sm:p-7 lg:p-9 text-slate-800 dark:text-slate-100 font-poppins antialiased overflow-x-hidden selection:bg-blue-100 selection:text-blue-700">
            
            {/* Top Navigation / Breadcrumbs Sub-bar */}
            <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Heading */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 dark:text-white">
                        Analytics Overview
                    </h1>
                </div>

                {/* Right Time Filter Dropdown (Image 1 Style) */}
                <div className="relative flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                        >
                            <span>{timeRange}</span>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isTimeDropdownOpen && (
                            <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in">
                                {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setTimeRange(item);
                                            setIsTimeDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${timeRange === item ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {isRecruiterMode && (
                        <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                            ⚡ Recruiter Mode
                        </span>
                    )}
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1. ROW OF 4 KPI STAT CARDS (COMPACT IMAGE 1 REPLICA)      */}
            {/* ========================================================= */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4.5 mb-6">
                
                {/* ── CARD 1: Total Followers / DevScore ───────────── */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-4.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] relative group hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 dark:text-slate-600 hover:text-slate-500 cursor-pointer">
                            <HelpCircle size={13} />
                        </span>
                    </div>

                    <div className="text-center">
                        {/* Circular Icon Container */}
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-500 flex items-center justify-center mx-auto mb-2.5">
                            <Users size={15} />
                        </div>
                        {/* Metric Value */}
                        <div className="text-2xl font-[800] tracking-tight text-slate-900 dark:text-white mb-0.5">
                            {devScore > 1000 ? `${(devScore / 100).toFixed(1)}k` : devScore}
                        </div>
                        {/* Subtitle */}
                        <div className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mb-2.5">
                            Total DevScore™
                        </div>
                        {/* Growth percentage */}
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                            <span>▲</span> 14.85%
                        </div>
                    </div>
                </div>

                {/* ── CARD 2: Impressions / DSA Solved (ELEVATED HERO CARD) ── */}
                <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 sm:p-4.5 shadow-[0_16px_36px_-10px_rgba(0,102,255,0.14)] dark:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.6)] -translate-y-1 relative group transition-all">
                    {/* Top right circular blue + badge just like Image 1 */}
                    <button 
                        onClick={() => navigate('/accounts')}
                        title="Add or sync account"
                        className="absolute -top-2.5 right-4 w-5 h-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110"
                    >
                        <Plus size={11} strokeWidth={3} />
                    </button>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 dark:text-slate-600 hover:text-slate-500 cursor-pointer">
                            <HelpCircle size={13} />
                        </span>
                    </div>

                    <div className="text-center">
                        {/* Purple Circular Icon Container */}
                        <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-500 flex items-center justify-center mx-auto mb-2.5">
                            <MousePointerClick size={15} />
                        </div>
                        {/* Metric Value */}
                        <div className="text-2xl font-[800] tracking-tight text-slate-900 dark:text-white mb-0.5">
                            {dsaSolvedCount > 1000 ? `${(dsaSolvedCount / 1000).toFixed(1)}k` : dsaSolvedCount}
                        </div>
                        {/* Subtitle */}
                        <div className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mb-2.5">
                            DSA Problems Solved
                        </div>
                        {/* Growth percentage */}
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                            <span>▲</span> 112.71%
                        </div>
                    </div>
                </div>

                {/* ── CARD 3: Reach / Git Repos & Commits ─────────── */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-4.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] relative group hover:shadow-md transition-all">
                    {/* Small avatar notification badge on top right just like Image 1 */}
                    <div className="absolute -top-2.5 right-4 flex items-center">
                        <div className="relative">
                            <img 
                                src={boyHeroImg} 
                                alt="User" 
                                className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-xs"
                            />
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                                2
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 dark:text-slate-600 hover:text-slate-500 cursor-pointer">
                            <HelpCircle size={13} />
                        </span>
                    </div>

                    <div className="text-center">
                        {/* Yellow / Amber Circular Icon Container */}
                        <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mx-auto mb-2.5">
                            <GitBranch size={15} />
                        </div>
                        {/* Metric Value */}
                        <div className="text-2xl font-[800] tracking-tight text-slate-900 dark:text-white mb-0.5">
                            {gitCommitsCount}
                        </div>
                        {/* Subtitle */}
                        <div className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mb-2.5">
                            Git Velocity & Repos
                        </div>
                        {/* Negative or red growth indicator matching Image 1 */}
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500">
                            <span>▼</span> 24.2%
                        </div>
                    </div>
                </div>

                {/* ── CARD 4: Engagement Rate / Acceptance Rate ──── */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-4.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] relative group hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 dark:text-slate-600 hover:text-slate-500 cursor-pointer">
                            <HelpCircle size={13} />
                        </span>
                    </div>

                    <div className="text-center">
                        {/* Green Circular Icon Container */}
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center mx-auto mb-2.5">
                            <CheckCircle2 size={15} />
                        </div>
                        {/* Metric Value */}
                        <div className="text-2xl font-[800] tracking-tight text-slate-900 dark:text-white mb-0.5">
                            {acceptanceRate}
                        </div>
                        {/* Subtitle */}
                        <div className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mb-2.5">
                            Acceptance Rate
                        </div>
                        {/* Growth percentage */}
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                            <span>▲</span> 112.71%
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 2. SUB-NAVIGATION & FILTER ACTIONS ROW (IMAGE 1 STYLE)    */}
            {/* ========================================================= */}
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                {/* Left: Tab with bold blue underline indicator */}
                <div className="flex items-center gap-6">
                    <div className="relative pb-2 cursor-pointer group" onClick={() => setActiveTab('recent')}>
                        <div className="flex items-center gap-1.5 text-base font-bold text-slate-900 dark:text-white">
                            <span>Most Recent Activity</span>
                            <ChevronDown size={15} className="text-slate-400" />
                        </div>
                        {/* Signature blue line under active tab */}
                        {activeTab === 'recent' && (
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-full" />
                        )}
                    </div>

                    <div className="relative pb-2 cursor-pointer group" onClick={() => setActiveTab('platforms')}>
                        <div className={`flex items-center gap-1.5 text-base font-semibold transition-colors ${activeTab === 'platforms' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                            <span>Platform Telemetry</span>
                        </div>
                        {activeTab === 'platforms' && (
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-full" />
                        )}
                    </div>

                    <div className="relative pb-2 cursor-pointer group" onClick={() => setActiveTab('projects')}>
                        <div className={`flex items-center gap-1.5 text-base font-semibold transition-colors ${activeTab === 'projects' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                            <span>Featured Projects</span>
                        </div>
                        {activeTab === 'projects' && (
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-full" />
                        )}
                    </div>
                </div>

                {/* Right: Dropdown filter & Cloud download button */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                            className="bg-transparent text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            <span>{mediaFilter}</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>

                        {isFilterDropdownOpen && (
                            <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in">
                                {['Show All Media', 'Algorithmic DSA', 'Git Repositories', 'Project Telemetry'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setMediaFilter(item);
                                            setIsFilterDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${mediaFilter === item ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Download / Export Button */}
                    <button 
                        onClick={() => navigate('/resume')}
                        title="Export Telemetry / Resume"
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                        <Download size={14} />
                    </button>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 3. THE TWO CORE GRAPHICAL CARDS (GAUGE & BAR CHART)       */}
            {/* ========================================================= */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                
                {/* ── LEFT CARD: SEMI-CIRCULAR RADIAL GAUGE ────────── */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            DevScore™ Target Milestone
                        </h3>
                        <button className="text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 p-1">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>

                    {/* Radial Speedometer Gauge */}
                    <div className="relative flex flex-col items-center justify-center my-auto py-2">
                        <svg className="w-64 h-36 overflow-visible" viewBox="0 0 240 140">
                            {/* Background track (grey semicircle) */}
                            <path
                                d="M 25 125 A 95 95 0 0 1 215 125"
                                fill="none"
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="16"
                                strokeLinecap="round"
                            />
                            {/* Foreground vibrant red/coral arc (77% progress like Image 1) */}
                            <path
                                d="M 25 125 A 95 95 0 0 1 215 125"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>

                        {/* Floating red Heart badge in the center of the arc */}
                        <div className="absolute top-[35px] w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shadow-sm">
                            <Heart size={16} className="fill-rose-500" />
                        </div>

                        {/* Large Score Metric */}
                        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                            {devScore > 1000 ? `${(devScore * 26.8).toFixed(1)}k` : '29.2k'}
                        </div>

                        {/* Subtitle Caption */}
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-400 text-center mt-3">
                            You are at 77% of 36,000 target points
                        </p>
                    </div>

                    {/* Footer / Quick Action */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Cadence: Weekly Sync</span>
                        <button 
                            onClick={() => navigate('/accounts')}
                            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                            Boost Score <ArrowRight size={12} />
                        </button>
                    </div>
                </div>

                {/* ── RIGHT CARD: GITHUB DAILY STREAK HEATMAP TABLE ── */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] flex flex-col justify-between relative font-poppins">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-xs">
                                <Github size={16} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        GitHub Daily Streak & Activity
                                    </h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                                        <Flame size={10} className="fill-emerald-500 text-emerald-500" /> 24 Days Streak
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400">
                                    {gh.username ? `@${gh.username}` : '@Abhi-247'} • Daily contribution cadence
                                </p>
                            </div>
                        </div>

                        {/* Top quick metrics chips */}
                        <div className="flex items-center gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                                ⚡ Longest: <strong>56 Days</strong>
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                                📦 <strong>{gitCommitsCount}</strong> Commits
                            </span>
                        </div>
                    </div>

                    {/* Streak & Contribution Table Container */}
                    <div className="w-full overflow-x-auto py-2">
                        <div className="min-w-[480px]">
                            {/* Months Header Row */}
                            <div className="flex text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1.5 pl-6">
                                {monthLabels.map((m, idx) => (
                                    <div 
                                        key={idx} 
                                        style={{ width: `${(100 / monthLabels.length)}%` }}
                                        className="text-left"
                                    >
                                        {m.name}
                                    </div>
                                ))}
                            </div>

                            {/* Days labels + Grid table */}
                            <div className="flex gap-2">
                                {/* Day of week vertical labels */}
                                <div className="flex flex-col justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500 py-0.5 select-none pr-1">
                                    <span>Mon</span>
                                    <span>Wed</span>
                                    <span>Fri</span>
                                    <span>Sun</span>
                                </div>

                                {/* Columns of weeks */}
                                <div className="flex-1 flex gap-1 sm:gap-1.5">
                                    {contributionWeeks.map((week, wIdx) => (
                                        <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5 flex-1">
                                            {week.map((day, dIdx) => {
                                                const levelClasses = [
                                                    'bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-750', // 0
                                                    'bg-emerald-200 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-900', // 1
                                                    'bg-emerald-400 dark:bg-emerald-700', // 2
                                                    'bg-emerald-500 dark:bg-emerald-500', // 3
                                                    'bg-emerald-600 dark:bg-emerald-400'  // 4
                                                ];

                                                return (
                                                    <div
                                                        key={dIdx}
                                                        onMouseEnter={() => setHoveredCell(day)}
                                                        onMouseLeave={() => setHoveredCell(null)}
                                                        className={`w-full aspect-square rounded-[3px] transition-transform duration-150 hover:scale-125 cursor-pointer ${levelClasses[day.level]}`}
                                                        title={`${day.count} contributions on ${day.formattedDate}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Footer: Legend & Interactive Hover Display */}
                    <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        {/* Hover info or summary */}
                        <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            {hoveredCell ? (
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold animate-fade-in">
                                    ● {hoveredCell.count} {hoveredCell.count === 1 ? 'contribution' : 'contributions'} on {hoveredCell.formattedDate}
                                </span>
                            ) : (
                                <span className="text-slate-400 font-medium">
                                    Hover over any day to inspect commit volume
                                </span>
                            )}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                            <span>Less</span>
                            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-slate-800 border border-slate-200/50"></span>
                            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950"></span>
                            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-700"></span>
                            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-500"></span>
                            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400"></span>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 4. PLATFORM TELEMETRY & SYSTEMS BREAKDOWN ACCORDION/TABS   */}
            {/* ========================================================= */}
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* ── Verified Platform Telemetry Section ── */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Verified Platform Telemetry
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Real-time synchronized metrics from external algorithmic and version control platforms
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/accounts')}
                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                            Manage Accounts <ArrowRight size={13} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* LeetCode Card */}
                        <div className="p-5 rounded-2xl bg-[#F8FAFD] dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-4 hover:border-amber-400/50 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center text-xs">
                                        LC
                                    </div>
                                    <div>
                                        <div className="font-bold text-xs text-slate-900 dark:text-white">LeetCode DSA</div>
                                        <div className="text-[11px] text-slate-400">{lc.username ? `@${lc.username}` : 'Synced'}</div>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                                    {lc.ranking ? `#${lc.ranking.toLocaleString()}` : 'Connected'}
                                </span>
                            </div>

                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{lc.totalSolved || 174}</span>
                                    <span className="text-xs font-mono text-slate-400">Total Solved</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mt-3">
                                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                                        <div className="text-[10px] uppercase font-bold text-emerald-500">Easy</div>
                                        <div className="font-bold">{lc.easySolved || 92}</div>
                                    </div>
                                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                                        <div className="text-[10px] uppercase font-bold text-amber-500">Med</div>
                                        <div className="font-bold">{lc.mediumSolved || 68}</div>
                                    </div>
                                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
                                        <div className="text-[10px] uppercase font-bold text-rose-500">Hard</div>
                                        <div className="font-bold">{lc.hardSolved || 14}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GitHub Card */}
                        <div className="p-5 rounded-2xl bg-[#F8FAFD] dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-4 hover:border-blue-400/50 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center">
                                        <Github size={17} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-xs text-slate-900 dark:text-white">GitHub Velocity</div>
                                        <div className="text-[11px] text-slate-400">{gh.username ? `@${gh.username}` : 'Synced'}</div>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                                    Connected
                                </span>
                            </div>

                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{gh.publicRepos || 21}</span>
                                    <span className="text-xs font-mono text-slate-400">Public Repos</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono mt-3">
                                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                        <div className="text-[10px] uppercase font-bold text-blue-500">Followers</div>
                                        <div className="font-bold">{gh.followers || 48}</div>
                                    </div>
                                    <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400">
                                        <div className="text-[10px] uppercase font-bold text-purple-500">Following</div>
                                        <div className="font-bold">{gh.following || 32}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Codeforces Card */}
                        <div className="p-5 rounded-2xl bg-[#F8FAFD] dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-4 hover:border-rose-400/50 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 font-bold flex items-center justify-center text-xs">
                                        CF
                                    </div>
                                    <div>
                                        <div className="font-bold text-xs text-slate-900 dark:text-white">Codeforces</div>
                                        <div className="text-[11px] text-slate-400">{cf.username ? `@${cf.username}` : 'Synced'}</div>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                                    {cf.rank || 'Specialist'}
                                </span>
                            </div>

                            <div>
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{cf.rating || 1420}</span>
                                    <span className="text-xs font-mono text-slate-400">Max: <strong className="text-rose-500">{cf.maxRating || 1510}</strong></span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono mt-3">
                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Current Rank</div>
                                        <div className="font-bold truncate">{cf.rank || 'Specialist'}</div>
                                    </div>
                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Peak Rank</div>
                                        <div className="font-bold truncate">{cf.maxRank || 'Expert'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Engineering Proficiency Breakdown Bars ── */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                        Engineering Proficiency Index
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1.5">
                                <span className="text-slate-700 dark:text-slate-300">DSA & Algorithmic Problem Solving</span>
                                <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{dsaAxis} / 100</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${dsaAxis}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1.5">
                                <span className="text-slate-700 dark:text-slate-300">Full Stack Systems Architecture</span>
                                <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">{fullStackAxis} / 100</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-600 rounded-full transition-all duration-700" style={{ width: `${fullStackAxis}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1.5">
                                <span className="text-slate-700 dark:text-slate-300">Git Velocity & Production Shipping</span>
                                <span className="text-emerald-500 font-mono font-bold">{gitAxis} / 100</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${gitAxis}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Featured Projects Grid ── */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Featured Systems & Deployments
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Production architectures and live GitHub repositories
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/projects')}
                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                            View All Projects <ArrowRight size={13} />
                        </button>
                    </div>

                    {displayProjects.length === 0 ? (
                        <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
                            <FolderKanban size={32} className="mx-auto text-slate-400" />
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Featured Projects Added</h4>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                Showcase your full stack applications, live URLs, and GitHub repos.
                            </p>
                            <button
                                onClick={() => navigate('/projects')}
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                            >
                                + Add Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {displayProjects.map((project, idx) => (
                                <div
                                    key={project._id || idx}
                                    className="p-5 rounded-2xl bg-[#F8FAFD] dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between hover:border-blue-400/50 transition-all group"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h4>
                                            {project.featured && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {(project.technologies || []).slice(0, 4).map((tech, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                                            >
                                                <Github size={13} /> Source
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-auto"
                                            >
                                                <ExternalLink size={13} /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ========================================================= */}
            {/* 5. SIGNATURE BLUE L-CORNER ACCENT (EXACT IMAGE 1 REPLICA) */}
            {/* ========================================================= */}
            <div className="fixed bottom-0 right-0 w-28 h-28 pointer-events-none hidden xl:block z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-600 drop-shadow-md">
                    <path d="M 100 100 L 0 100 L 0 74 L 74 74 L 74 0 L 100 0 Z" />
                </svg>
            </div>

        </div>
    );
};

export default Dashboard;
