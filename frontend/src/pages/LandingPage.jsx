import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import boyHeroImg from '../assets/boyhero.png';
import heroImg from '../assets/hero.png';
import hourglassImg from '../assets/hourglass.png';
import devdashIcon3dImg from '../assets/devdash-icon-3d.png';
import {
    ArrowRight,
    Code2,
    Github,
    ChevronRight,
    Layout,
    Link2,
    BarChart3,
    Shield,
    Zap,
    Play,
    Twitter,
    Linkedin,
    Mail,
    User,
    CheckCircle2,
    Menu,
    X,
    ExternalLink,
    Eye,
    Layers,
    BadgeCheck,
    Rocket,
    SearchCheck,
    Star,
    Trophy,
    GitBranch,
    Globe,
    FileText,
    Brain,
    TrendingUp,
    Calendar,
    Flame,
    Quote,
    Sparkles,
    Folder,
    Wand2,
    Copy,
    Check,
    RefreshCw,
    Send,
    Paperclip,
    Plus,
    Search
} from 'lucide-react';

/* ─── Platform Chip ─── */
const PlatformChip = ({ name, svg, color, bg }) => (
    <div className={`
        group flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-default select-none
        border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:shadow-lg hover:scale-105 hover:-translate-y-1
        ${bg || 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}
    `}>
        <span className={`flex-shrink-0 ${color}`}
            style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {svg}
        </span>
        <span className="text-sm font-black text-slate-650 group-hover:text-slate-800 dark:text-slate-350 dark:group-hover:text-white whitespace-nowrap tracking-wide">
            {name}
        </span>
    </div>
);

/* ─── Infinite strip ─── */
const ScrollStrip = ({ platforms, direction = 'left', speed = 35 }) => {
    const doubled = [...platforms, ...platforms, ...platforms];
    const animClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
    return (
        <div className="relative overflow-hidden py-2">
            {/* Fade edge masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

            <div
                className={`flex gap-4 w-max ${animClass}`}
                style={{ animationDuration: `${speed}s` }}
                onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
            >
                {doubled.map((p, i) => (
                    <PlatformChip key={i} {...p} />
                ))}
            </div>
        </div>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);

    // 🎛️ Interactive Feature Tabs State
    const [activeFeatureTab, setActiveFeatureTab] = useState('sync');

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-650 selection:text-white overflow-x-hidden transition-colors duration-300">
            {/* Navbar */}
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero Section — Pagedone-style split: white left, gradient right, phone overlapping */}
            <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-0 overflow-hidden">
                {/* ── Right-side gradient background — 33% right edge ── */}
                <div
                    className="absolute top-0 bottom-0 right-0 hidden lg:block pointer-events-none"
                    style={{ width: '33%' }}
                >
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-purple-500 to-indigo-600 dark:from-indigo-500 dark:via-purple-600 dark:to-indigo-800" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700/15 via-transparent to-white/8" />
                </div>

                {/* White left background */}
                <div className="absolute inset-0 -z-10 bg-white dark:bg-slate-950 transition-colors duration-300" />

                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">

                        {/* ─── LEFT: Text Content ─── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-left relative z-10 pb-12 sm:pb-16 lg:pb-20"
                        >
                            {/* Headline with inline curved arrow */}
                            <h1 className="text-3xl sm:text-4xl md:text-[2.7rem] lg:text-[3.2rem] font-[800] text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-7">
                                <span>All your </span>
                                <span className="text-[#6D28D9] dark:text-purple-400">coding profiles</span>
                                <span> in one unified </span>
                                <span className="text-[#6D28D9] dark:text-purple-400">developer dashboard</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-slate-500 dark:text-slate-400 text-[15px] sm:text-base font-normal leading-relaxed max-w-[520px] mb-10">
                                Connect all your coding and social profiles in one unified developer dashboard to share with recruiters and employers.Along with job managment system.
                            </p>

                            {/* How it works — outlined button with play icon */}
                            <button
                                onClick={() => navigate('/about')}
                                className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 text-[#6D28D9] dark:text-purple-400 font-semibold text-sm sm:text-base hover:border-[#6D28D9] dark:hover:border-purple-400 hover:shadow-md transition-all duration-300 cursor-pointer bg-white dark:bg-slate-950"
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6D28D9] dark:bg-purple-500">
                                    <Play size={13} className="fill-white text-white ml-0.5" />
                                </span>
                                <span>How it works</span>
                            </button>
                        </motion.div>

                        {/* ─── RIGHT: Hero Phone Image ─── */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative flex justify-center lg:justify-end z-10 self-end"
                        >
                            <img
                                src={heroImg}
                                alt="DevDash app preview showing unified developer dashboard"
                                className="relative w-[300px] sm:w-[350px] md:w-[380px] lg:w-[420px] xl:w-[460px] h-auto object-contain block align-bottom"
                                style={{ filter: 'drop-shadow(0 20px 40px rgba(30, 0, 80, 0.3))' }}
                            />
                        </motion.div>

                    </div>
                </div>

                {/* Mobile gradient background */}
                <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-indigo-400/20 via-purple-400/10 to-transparent pointer-events-none" />
            </section>



            {/* Platform Integration Showcase — 2-Column Section matching reference */}
            <section className="pt-6 sm:pt-8 lg:pt-10 pb-20 lg:pb-28 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300 relative overflow-hidden">
                {/* Decorative ambient background glows */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

                {/* Top-right sparkle accent rays */}
                <div className="absolute top-4 right-12 sm:right-24 text-purple-400/50 pointer-events-none hidden sm:block">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <line x1="8" y1="28" x2="2" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18" y1="20" x2="18" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="26" y1="24" x2="34" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

                        {/* ---------- LEFT COLUMN: Headline, Text, Platform Pills & CTA ---------- */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-5 space-y-6 text-left"
                        >


                            {/* Headline */}
                            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-[800] text-slate-900 dark:text-white tracking-tight leading-[1.14]">
                                Connect all your <br />
                                <span className="text-[#6D28D9] dark:text-[#A78BFA]">
                                    developer platforms
                                </span>
                            </h2>

                            {/* Subtext */}
                            <p className="text-slate-500 dark:text-slate-400 font-normal text-sm sm:text-base leading-relaxed max-w-lg">
                                Link your coding, development, and professional profiles in seconds. Keep everything in sync and let DevDash build your unified developer identity automatically.
                            </p>

                            {/* 8 Platform Pills (2 rows of 4) */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 pb-2">
                                {[
                                    {
                                        name: "GitHub",
                                        color: "text-slate-900 dark:text-white",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "LeetCode",
                                        color: "text-[#FFA116]",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "Codeforces",
                                        color: "text-[#1F8ACB]",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9.75-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5h3zm9.75 7.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "Vercel",
                                        color: "text-slate-900 dark:text-white",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                                <path d="M24 22.525H0l12-21.05 12 21.05z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "CodeChef",
                                        color: "text-[#5B4638] dark:text-[#cbb09d]",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M11.257.004C5.37-.114.568 4.5.568 10.357c0 3.118 1.316 5.936 3.43 7.934L2.567 19.72a.756.756 0 0 0 .535 1.29h.232l1.842-1.848c1.688 1.104 3.7 1.745 5.86 1.745.308 0 .613-.013.914-.038l1.297 1.3h.232a.756.756 0 0 0 .535-1.29l-1.243-1.248c3.61-1.395 6.183-4.846 6.183-8.904 0-4.624-3.293-8.49-7.697-9.523zm-.258 1.668c.149 0 .296.006.443.014a10.08 10.08 0 0 1 3.01 7.54 10.08 10.08 0 0 1-3.01 7.54 10.08 10.08 0 0 1-3.007-7.54 10.08 10.08 0 0 1 3.007-7.54c.187-.008.375-.014.557-.014z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "LinkedIn",
                                        color: "text-[#0A66C2]",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "Netlify",
                                        color: "text-[#00C7B7]",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482a1.044 1.044 0 0 1 .355-.177l.574-3.55-1.313-1.256-3.322 2.927z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "GitLab",
                                        color: "text-[#FC6D26]",
                                        svg: (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                                <path d="M4.845.904c-.435 0-.82.28-.955.692C2.639 5.449 1.246 9.728.07 13.335a1.437 1.437 0 0 0 .522 1.607l11.071 8.045c.2.145.472.144.67-.004L23.408 14.9a1.436 1.436 0 0 0 .522-1.607c-1.176-3.607-2.569-7.886-3.82-11.739a1.003 1.003 0 0 0-.955-.692c-.437 0-.82.28-.956.692l-2.572 7.906H8.372L5.8 1.596A1.003 1.003 0 0 0 4.845.904z" />
                                            </svg>
                                        )
                                    }
                                ].map((plat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-600 hover:shadow transition-all cursor-default"
                                    >
                                        <span className={`${plat.color} flex items-center justify-center shrink-0`}>
                                            {plat.svg}
                                        </span>
                                        <span className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm tracking-tight truncate">
                                            {plat.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="group flex items-center justify-center gap-2 text-white px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-purple-600/25 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span>+ Connect Your Accounts</span>
                                    <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                            </div>
                        </motion.div>

                        {/* ---------- RIGHT COLUMN: Dashboard Accounts Mockup with Floating Tooltips ---------- */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-7 relative pt-8 sm:pt-6"
                        >



                            {/* The Dashboard Accounts Mockup Card */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-[28px] p-5 sm:p-6 shadow-2xl shadow-purple-500/10 text-left">
                                {/* Mockup Top Controls */}
                                <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                                    <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800">
                                        <span className="px-3.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs">
                                            Accounts
                                        </span>
                                        <span className="px-3.5 py-1 text-slate-500 font-semibold">
                                            Groups
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-[11px]">
                                            <Search size={12} />
                                            <span>Search accounts</span>
                                        </div>
                                        <span className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 font-bold text-[11px] flex items-center gap-1">
                                            <RefreshCw size={11} />
                                            <span>Sync All</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Mockup 2-Column Inside Layout */}
                                <div className="grid grid-cols-12 gap-4 pt-4 items-start">
                                    {/* Mini Platform Sidebar with ALL 11 items & official colored SVGs */}
                                    <div className="col-span-4 space-y-1 pr-2 border-r border-slate-100 dark:border-slate-800 text-xs">
                                        {/* All (Active) */}
                                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold">
                                            <div className="flex items-center gap-1.5">
                                                <Layers size={13} className="text-purple-600 dark:text-purple-400" />
                                                <span>All</span>
                                            </div>
                                            <span className="text-[10px] px-1.5 py-0.2 bg-white dark:bg-slate-900 rounded-full font-semibold">1/10</span>
                                        </div>

                                        {/* LeetCode with green dot */}
                                        <div className="flex items-center justify-between px-2.5 py-1 rounded-xl text-slate-800 dark:text-slate-200 font-semibold">
                                            <span className="flex items-center gap-1.5 truncate">
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#FFA116] shrink-0">
                                                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                                                </svg>
                                                <span className="truncate">LeetCode</span>
                                            </span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                        </div>

                                        {/* GitHub */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="shrink-0 text-slate-800 dark:text-slate-200">
                                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                            </svg>
                                            <span className="truncate">GitHub</span>
                                        </div>

                                        {/* Codeforces */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#1F8ACB] shrink-0">
                                                <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9.75-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5h3zm9.75 7.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
                                            </svg>
                                            <span className="truncate">Codeforces</span>
                                        </div>

                                        {/* GeeksforGeeks */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#2F8D46] shrink-0">
                                                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-1.12 7.02c1.78 0 3.06.96 3.66 2.37l-1.89.87c-.36-.84-1.02-1.32-1.77-1.32-1.29 0-2.22 1.05-2.22 2.76 0 1.74.93 2.79 2.22 2.79.84 0 1.53-.51 1.86-1.38h-2.1v-1.77h4.08v3.66c-.96 1.47-2.31 2.1-3.84 2.1-2.61 0-4.47-1.92-4.47-4.8s1.86-4.8 4.47-4.8zm6.48 4.02h2.04v1.89h-2.04v2.04h-1.89v-2.04h-2.04v-1.89h2.04V9.03h1.89v2.01z" />
                                            </svg>
                                            <span className="truncate">GeeksforGeeks</span>
                                        </div>

                                        {/* HackerRank */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#2EC866] shrink-0">
                                                <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 11.885 0 13-.642 1.114-9.107 6-10.392 6-1.284 0-9.75-4.886-10.392-6C1 17.885 1 7.115 1.6 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .258-.116.258-.258a.253.253 0 0 0-.062-.166L9.346 4.807a.26.26 0 0 0-.393 0L7.469 6.484a.253.253 0 0 0-.062.166c0 .141.115.258.258.258h.701v10.184h-.701a.256.256 0 0 0-.258.258c0 .061.023.12.062.166l1.484 1.677a.26.26 0 0 0 .393 0l1.484-1.677a.253.253 0 0 0 .062-.166.256.256 0 0 0-.258-.258h-.701v-3.875h4.074v3.875h-.701a.256.256 0 0 0-.258.258c0 .061.023.12.062.166l1.484 1.677a.26.26 0 0 0 .393 0l1.484-1.677a.253.253 0 0 0 .062-.166.256.256 0 0 0-.258-.258h-.701V6.908h.701c.141 0 .258-.116.258-.258a.253.253 0 0 0-.062-.166L15.4 4.807a.26.26 0 0 0-.393 0l-1.484 1.677a.253.253 0 0 0-.062.166c0 .141.116.149.834.149z" />
                                            </svg>
                                            <span className="truncate">HackerRank</span>
                                        </div>

                                        {/* CodeChef */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#5B4638] dark:text-[#cbb09d] shrink-0">
                                                <path d="M11.257.004C5.37-.114.568 4.5.568 10.357c0 3.118 1.316 5.936 3.43 7.934L2.567 19.72a.756.756 0 0 0 .535 1.29h.232l1.842-1.848c1.688 1.104 3.7 1.745 5.86 1.745.308 0 .613-.013.914-.038l1.297 1.3h.232a.756.756 0 0 0 .535-1.29l-1.243-1.248c3.61-1.395 6.183-4.846 6.183-8.904 0-4.624-3.293-8.49-7.697-9.523zm-.258 1.668c.149 0 .296.006.443.014a10.08 10.08 0 0 1 3.01 7.54 10.08 10.08 0 0 1-3.01 7.54 10.08 10.08 0 0 1-3.007-7.54 10.08 10.08 0 0 1 3.007-7.54c.187-.008.375-.014.557-.014z" />
                                            </svg>
                                            <span className="truncate">CodeChef</span>
                                        </div>

                                        {/* LinkedIn */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#0A66C2] shrink-0">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span className="truncate">LinkedIn</span>
                                        </div>

                                        {/* Vercel */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" className="text-slate-900 dark:text-white shrink-0">
                                                <path d="M24 22.525H0l12-21.05 12 21.05z" />
                                            </svg>
                                            <span className="truncate">Vercel</span>
                                        </div>

                                        {/* Netlify */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#00C7B7] shrink-0">
                                                <path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482a1.044 1.044 0 0 1 .355-.177l.574-3.55-1.313-1.256-3.322 2.927z" />
                                            </svg>
                                            <span className="truncate">Netlify</span>
                                        </div>

                                        {/* GitLab */}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 truncate">
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="text-[#FC6D26] shrink-0">
                                                <path d="M4.845.904c-.435 0-.82.28-.955.692C2.639 5.449 1.246 9.728.07 13.335a1.437 1.437 0 0 0 .522 1.607l11.071 8.045c.2.145.472.144.67-.004L23.408 14.9a1.436 1.436 0 0 0 .522-1.607c-1.176-3.607-2.569-7.886-3.82-11.739a1.003 1.003 0 0 0-.955-.692c-.437 0-.82.28-.956.692l-2.572 7.906H8.372L5.8 1.596A1.003 1.003 0 0 0 4.845.904z" />
                                            </svg>
                                            <span className="truncate">GitLab</span>
                                        </div>
                                    </div>

                                    {/* Mini Main Area matching reference */}
                                    <div className="col-span-8 space-y-3">
                                        {/* Connect Account Button */}
                                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] dark:text-purple-300 text-xs font-bold bg-purple-50/50 dark:bg-purple-950/30">
                                            <Plus size={13} className="stroke-[2.5]" />
                                            <span>Connect Account</span>
                                        </div>

                                        {/* Curved Pointer Arrow */}
                                        <div className="text-slate-400 dark:text-slate-500 pl-4 py-0.5 pointer-events-none">
                                            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                                                <path d="M 10 2 C 10 12, 22 15, 32 17" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
                                                <polygon points="28,14 34,17 30,20" fill="currentColor" />
                                            </svg>
                                        </div>

                                        {/* Mockup Instruction Callout Box */}
                                        <div className="p-3.5 rounded-2xl border-2 border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-slate-950/40 text-[11px] space-y-2 text-slate-600 dark:text-slate-300 leading-snug">
                                            <p className="text-slate-800 dark:text-white leading-tight">
                                                To connect your developer accounts, click <strong className="font-extrabold text-slate-900 dark:text-white">"Connect Account"</strong>. There are two methods available:
                                            </p>
                                            <div className="space-y-1">
                                                <p className="text-[10.5px]">
                                                    <strong className="text-slate-900 dark:text-white font-bold">Connect:</strong> It will automatically connect your developer account using your public username/handle without any credentials.
                                                </p>
                                                <p className="text-[10.5px]">
                                                    <strong className="text-slate-900 dark:text-white font-bold">Custom App:</strong> It will show you a form to input app credentials or personal access tokens to create your own app and connect your developer account.
                                                </p>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>



            {/* ⚡ PROBLEM VS SOLUTION (CHAOS TO CLARITY) SECTION — Inspired by reference layout */}
            <section className="py-20 lg:py-28 px-6 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14 sm:mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-[800] text-[#7C3AED] dark:text-purple-400 tracking-tight leading-tight">
                            Stop Wasting Time Switching Platforms
                        </h2>
                        <h3 className="text-2xl sm:text-3xl md:text-[2.5rem] font-[800] text-slate-900 dark:text-white tracking-tight leading-tight mt-1 mb-5">
                            Connect All Your Developer Profiles in One Dashboard
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-normal max-w-3xl mx-auto leading-relaxed">
                            Manual profile updating drains your time and energy. With DevDash, you can link GitHub, LeetCode, Codeforces, HackerRank, GeeksforGeeks, GitLab, and more, then automatically track rank, generate AI resumes, and manage every account from one place.
                        </p>
                    </motion.div>

                    {/* 2-Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

                        {/* ---------- CARD 1: THE PROBLEM (CHAOS / KILLS TIME) ---------- */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-[#F8F9FA] dark:bg-slate-900/60 rounded-[32px] sm:rounded-[36px] border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 flex flex-col justify-between text-left relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            <div>
                                <h4 className="text-xl sm:text-2xl font-[800] text-slate-900 dark:text-white leading-snug mb-6">
                                    Switching between apps <span className="text-[#DC2626] dark:text-rose-400 font-[800]">kills time and productivity</span>
                                </h4>

                                <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm sm:text-[14.5px] leading-relaxed font-normal">
                                    <p>
                                        Without automation, switching between coding platforms and repeating the same updates for each profile is tedious.
                                    </p>
                                    <p>
                                        Sometimes it leads to missed platforms and errors, which is quite obvious if you're updating profiles manually.
                                    </p>
                                    <p>
                                        However, the consequences of these are bad — inconsistency, decreased productivity, and increased burnout.
                                    </p>
                                </div>
                            </div>

                            {/* Bottom 3D Hourglass Visual */}
                            <div className="flex justify-center pt-8 mt-auto">
                                <img
                                    src={hourglassImg}
                                    alt="Wasted time with manual updates"
                                    className="w-40 sm:w-48 h-auto object-contain mix-blend-multiply dark:mix-blend-normal select-none pointer-events-none hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                                />
                            </div>
                        </motion.div>

                        {/* ---------- CARD 2: THE SOLUTION (FROM CHAOS TO CLARITY) ---------- */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-[32px] sm:rounded-[36px] border-2 border-slate-900/80 dark:border-purple-500/40 p-8 sm:p-10 flex flex-col justify-between text-left relative overflow-hidden shadow-xl shadow-purple-500/5 transition-all duration-300 hover:shadow-2xl"
                        >
                            <div>
                                <h4 className="text-xl sm:text-2xl font-[800] text-slate-900 dark:text-white leading-snug mb-6">
                                    <span className="text-[#059669] dark:text-emerald-400 block mb-1">From Chaos to Clarity:</span>
                                    Manage Every Account in One Place
                                </h4>

                                <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm sm:text-[14.5px] leading-relaxed font-normal">
                                    <p>
                                        Say goodbye to manual logins to each coding account separately. DevDash is here to change the game of developer tracking. Let's automate the process, link multiple accounts with DevDash, and enjoy unified profiles and live dashboards from the same place.
                                    </p>
                                    <p>
                                        There are two connection methods, which make it more flexible: <strong className="text-slate-900 dark:text-white font-bold">One Click</strong> and <strong className="text-slate-900 dark:text-white font-bold">Custom App</strong> method.
                                    </p>
                                    <p>
                                        The One Click method is super easy to set up, best for beginners, while the custom app method requires credentials or personal access tokens, perfect for advanced users.
                                    </p>
                                </div>
                            </div>

                            {/* Bottom 3D App Icon Visual */}
                            <div className="flex justify-end pt-8 mt-auto">
                                <img
                                    src={devdashIcon3dImg}
                                    alt="DevDash unified dashboard app icon"
                                    className="w-36 sm:w-44 h-auto object-contain mix-blend-multiply dark:mix-blend-normal select-none pointer-events-none hover:scale-105 transition-transform duration-500 drop-shadow-md"
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
            <section id="features" className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-purple-600 dark:text-purple-400 font-black uppercase tracking-widest text-xs mb-3">Interactive Showcase</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[800] text-slate-900 dark:text-white tracking-tight leading-tight">
                            Explore DevDash <span className="text-purple-600 dark:text-purple-400">in Action</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-xl mx-auto mt-3">
                            Click through the tabs below to interactively test our live developer tools!
                        </p>
                    </div>

                    {/* Tab Selection Bar */}
                    <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                            {[
                                { id: 'sync', label: '🔄 Live Profile Sync' },
                                { id: 'outreach', label: '✉️ Cold HR Outreach' },
                                { id: 'analytics', label: '📊 Developer Analytics' },
                                { id: 'showcase', label: '💼 Public Showcase' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFeatureTab(tab.id)}
                                    className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${activeFeatureTab === tab.id
                                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Tab Body */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/80 p-6 sm:p-10 shadow-2xl transition-colors">
                        {activeFeatureTab === 'sync' && (
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-6 space-y-4 text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                                        <span>Multi-Platform OAuth</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-[800] text-slate-900 dark:text-white">Auto-Sync Your Coding Achievements</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                        DevDash connects seamlessly with LeetCode, GitHub, Codeforces, HackerRank, and GeeksforGeeks. Every solved DSA problem and committed line of code updates your live DevScore automatically.
                                    </p>
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-3 font-bold text-sm text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 size={18} className="text-emerald-500" />
                                            <span>Real-Time LeetCode & Codeforces Rating Fetcher</span>
                                        </div>
                                        <div className="flex items-center gap-3 font-bold text-sm text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 size={18} className="text-emerald-500" />
                                            <span>Automated DevScore Algorithm (500 ➔ 2000+)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-6 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-left">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Connected Coding Platforms</span>
                                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">Live Synced</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                            <span className="font-bold text-sm text-amber-500">🔥 LeetCode</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">345 Solved (Top 12%)</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                            <span className="font-bold text-sm text-slate-900 dark:text-white">🐙 GitHub</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">28 Public Repos · 64 Followers</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                            <span className="font-bold text-sm text-cyan-500">🏆 Codeforces</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">1540 Rating (Specialist)</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeFeatureTab === 'outreach' && (
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-6 space-y-4 text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold">
                                        <span>Automated Cold Emails</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-[800] text-slate-900 dark:text-white">Target HRs & Deliver Resumes Directly</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                        Send customized, recruiter-tailored cold emails directly through Gmail SMTP. DevDash attaches your verified PDF resume from the Resume Vault and logs responses in real-time.
                                    </p>
                                    <button
                                        onClick={() => setAuthModal('signup')}
                                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer"
                                    >
                                        <span>Try HR Outreach</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                                <div className="lg:col-span-6 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 text-left">
                                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                                        <Mail size={18} className="text-purple-600" />
                                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">HR Outreach Mailer Mockup</span>
                                    </div>
                                    <div className="space-y-2.5 text-left text-xs">
                                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300">
                                            <strong>To:</strong> tech.recruiter@stripe.com
                                        </div>
                                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300">
                                            <strong>Subject:</strong> Full Stack Developer Application — Alex Developer
                                        </div>
                                        <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-900/30 text-slate-700 dark:text-slate-300 leading-relaxed">
                                            "Hi Tech Recruiting Team! I am a Full-Stack Engineer with 345+ solved LeetCode DSA problems and 28 public GitHub repositories..."
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                                            <Paperclip size={14} />
                                            <span>Attached: Alex_Developer_Resume.pdf (150 KB)</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeFeatureTab === 'analytics' && (
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-6 space-y-4 text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                                        <span>Unified Analytics</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-[800] text-slate-900 dark:text-white">Visualize Your Developer DNA</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                        Track your commit streaks, DSA difficulty breakdown (Easy / Medium / Hard), and coding activity heatmaps all in one unified dashboard.
                                    </p>
                                </div>
                                <div className="lg:col-span-6 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-left">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">DSA Problem Difficulty Breakdown</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs font-bold mb-1">
                                                <span className="text-emerald-500">Easy (140 Solved)</span>
                                                <span className="text-slate-400">40%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 w-[40%]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-bold mb-1">
                                                <span className="text-amber-500">Medium (165 Solved)</span>
                                                <span className="text-slate-400">48%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500 w-[48%]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-bold mb-1">
                                                <span className="text-rose-500">Hard (40 Solved)</span>
                                                <span className="text-slate-400">12%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-500 w-[12%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeFeatureTab === 'showcase' && (
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-6 space-y-4 text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
                                        <span>Shareable Portfolio Link</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-[800] text-slate-900 dark:text-white">One Single Link for CVs & LinkedIn</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                        Share your clean public URL (`devdash.me/u/alexdev_demo`) with recruiters. No login required for tech leads to inspect your verified coding stats!
                                    </p>
                                    <button
                                        onClick={() => navigate('/u/alexdev_demo')}
                                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
                                    >
                                        <span>View Public Showcase Demo</span>
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                                <div className="lg:col-span-6 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-left space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                        <span className="font-bold text-xs text-amber-500">🌐 devdash.me/u/alexdev_demo</span>
                                        <span className="text-xs font-bold text-slate-400">Public Portfolio</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm">AD</div>
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Alex Developer (Demo)</h4>
                                                <p className="text-xs text-slate-400">DevScore: 1850 · Senior Master</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════ STEP 4 — Stats / Analytics ═══════ */}
            <section className="py-16 px-6 bg-[#F8FAFC] dark:bg-slate-900/30 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-emerald-500 dark:text-emerald-450 font-black uppercase tracking-widest text-xs mb-3">Analytics</p>
                        <h2 className="text-4xl md:text-[48px] font-[800] text-slate-800 dark:text-white tracking-tight">
                            Track your growth with <span className="text-indigo-600 dark:text-indigo-400">real data</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {[
                            { icon: Code2, label: "Problems Solved", value: "1,247", color: "text-[#FFA116]" },
                            { icon: Star, label: "GitHub Stars", value: "386", color: "text-[#FFDC40]" },
                            { icon: Trophy, label: "CF Rating", value: "1,842", color: "text-[#1F8ACB] dark:text-[#38bdf8]" },
                            { icon: Rocket, label: "Deployed", value: "18", color: "text-[#00C7B7]" },
                            { icon: GitBranch, label: "Contributions", value: "2.4k", color: "text-slate-800 dark:text-slate-200" },
                            { icon: Flame, label: "Day Streak", value: "67", color: "text-orange-500" },
                        ].map(({ icon: Icon, label, value, color }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default"
                            >
                                <div className={`mx-auto mb-3 ${color} group-hover:scale-110 transition-transform`}>
                                    <Icon size={26} strokeWidth={2} />
                                </div>
                                <p className={`text-3xl md:text-4xl font-[800] ${color} mb-1`}>{value}</p>
                                <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ STEP 6 — Dashboard Preview ═══════ */}
            <section className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <p className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-4">Dashboard</p>
                        <h2 className="text-4xl md:text-[48px] font-[800] text-slate-800 dark:text-white leading-tight tracking-tight mb-6">
                            See everything<br />at a <span className="relative inline-block text-indigo-600 dark:text-indigo-400">glance
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="absolute bottom-1 left-0 h-3 bg-indigo-500/10 dark:bg-indigo-500/20 -z-10" />
                            </span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-xl leading-relaxed mb-8 max-w-lg">
                            A unified dashboard that brings together your GitHub activity, coding stats, and skill breakdown — all updated in real time.
                        </p>
                        <div className="space-y-4">
                            {[
                                "GitHub contribution graph & commit history",
                                "LeetCode & Codeforces rating trends",
                                "Language proficiency breakdown",
                                "Live deployment status from Vercel & Netlify"
                            ].map((t, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} strokeWidth={3} />
                                    <span className="text-slate-655 dark:text-slate-300 font-bold text-[17px]">{t}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 1 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full max-w-md"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl p-4 space-y-3 transition-colors">
                            {/* Header */}
                            <div className="flex items-center justify-between px-1">
                                <p className="text-xs font-[800] text-slate-805 dark:text-slate-200">Developer Overview</p>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-300 dark:bg-red-950/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-300 dark:bg-yellow-950/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-300 dark:bg-green-950/40"></div>
                                </div>
                            </div>
                            {/* Heatmap mock */}
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 transition-colors">
                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Contribution Heatmap</p>
                                <div className="grid grid-cols-14 gap-[3px]">
                                    {Array.from({ length: 56 }).map((_, i) => {
                                        const opacity = [0.1, 0.2, 0.35, 0.55, 0.75, 1][Math.floor(Math.random() * 6)];
                                        return <div key={i} className="aspect-square rounded-[2px] bg-indigo-600" style={{ opacity }} />;
                                    })}
                                </div>
                            </div>
                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2 text-center transition-colors">
                                    <p className="text-lg font-[800] text-slate-800 dark:text-white">34</p>
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Repos</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2 text-center transition-colors">
                                    <p className="text-lg font-[800] text-[#FFA116]">847</p>
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Solved</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2 text-center transition-colors">
                                    <p className="text-lg font-[800] text-[#1F8ACB] dark:text-[#38bdf8]">1842</p>
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Rating</p>
                                </div>
                            </div>
                            {/* Skills bar */}
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 space-y-2 transition-colors">
                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skill Breakdown</p>
                                {[
                                    { lang: 'JavaScript', pct: 85, color: '#FFDC40' },
                                    { lang: 'Python', pct: 70, color: '#6366f1' },
                                    { lang: 'C++', pct: 60, color: '#fc6d26' },
                                ].map(({ lang, pct, color }) => (
                                    <div key={lang}>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-550 dark:text-slate-400 mb-0.5">
                                            <span>{lang}</span><span>{pct}%</span>
                                        </div>
                                        <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ Built for developers (existing) ═══════ */}
            <section className="py-16 px-6 bg-[#F8FAFC] dark:bg-slate-900/30 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex-1">
                        <p className="text-indigo-650 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-4">Why DevDash</p>
                        <h2 className="text-3xl md:text-[42px] font-[800] text-slate-850 dark:text-white leading-tight tracking-tight mb-10">
                            Built for developers.<br /><span className="text-indigo-600 dark:text-indigo-400">Loved by recruiters.</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { icon: Eye, text: "View all coding profiles in one place" },
                                { icon: Layers, text: "No need to open multiple tabs" },
                                { icon: BadgeCheck, text: "Verified stats across platforms" },
                                { icon: Rocket, text: "See real projects and deployments" },
                                { icon: SearchCheck, text: "Quick skill evaluation at a glance" },
                            ].map(({ icon: Icon, text }, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4 group">
                                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:shadow-md group-hover:scale-105 transition-all">
                                        <Icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-slate-655 dark:text-slate-300 font-bold text-[18px]">{text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex-1 w-full max-w-xl">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 space-y-5 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white"><User className="h-5 w-5 text-white" /></div>
                                    <div><div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded-full mb-1.5"></div><div className="w-16 h-2 bg-slate-100 dark:bg-slate-950 rounded-full"></div></div>
                                </div>
                                <div className="px-3 py-1 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 text-[11px] font-black rounded-full">Verified</div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[{ label: 'Problems', value: '847', accent: 'text-[#FFA116]' }, { label: 'Repos', value: '34', accent: 'text-slate-700 dark:text-slate-300' }, { label: 'Deploys', value: '12', accent: 'text-[#00C7B7]' }].map(({ label, value, accent }) => (
                                    <div key={label} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 text-center transition-colors">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                                        <p className={`text-2xl font-[800] ${accent}`}>{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Activity</p>
                                    <p className="text-xs font-bold text-green-500">+24% this month</p>
                                </div>
                                <div className="flex items-end gap-1.5 h-16">
                                    {[35, 50, 40, 65, 55, 80, 70, 90, 60, 75, 85, 95, 70, 80].map((h, i) => (
                                        <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }} className="flex-1 bg-indigo-650 rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Node.js', 'Python', 'Go', 'TypeScript'].map(s => (
                                    <span key={s} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-full text-[12px] font-bold text-slate-500 dark:text-slate-400 transition-colors">{s}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ STEP 7 — Testimonials ═══════ */}
            <section className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Testimonials</p>
                        <h2 className="text-4xl md:text-[48px] font-[800] text-slate-800 dark:text-white tracking-tight">
                            Loved by the <span className="text-indigo-600 dark:text-indigo-400">community</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "DevDash helped me showcase all my work in one place. Recruiters loved it — I got 3 interview calls in the first week.",
                                name: "Priya Sharma",
                                role: "SDE Intern @ Amazon",
                                avatar: 21
                            },
                            {
                                quote: "I used to maintain separate profiles everywhere. Now I just share my DevDash link. It's like a developer portfolio on autopilot.",
                                name: "Arjun Mehta",
                                role: "Full Stack Developer",
                                avatar: 33
                            },
                            {
                                quote: "The contribution heatmap and AI summary are game changers. My GitHub + LeetCode stats in one view saved me hours.",
                                name: "Sara Chen",
                                role: "CS Undergrad @ IIT",
                                avatar: 47
                            },
                        ].map(({ quote, name, role, avatar }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#F8FAFC] dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                <Quote className="text-indigo-600 dark:text-indigo-400 opacity-30 mb-4" size={28} />
                                <p className="text-slate-655 dark:text-slate-300 font-semibold leading-relaxed text-[17px] flex-1 mb-6">"{quote}"</p>
                                <div className="flex items-center gap-3">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`} alt={name} className="w-11 h-11 rounded-full bg-indigo-50 dark:bg-indigo-900/20" />
                                    <div>
                                        <p className="text-sm font-[800] text-slate-800 dark:text-white">{name}</p>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500">{role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <PublicFooter />

            {/* Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default LandingPage;
