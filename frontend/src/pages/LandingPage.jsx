import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
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
    Quote
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

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-650 selection:text-white overflow-x-hidden transition-colors duration-300">
            {/* Navbar */}
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-12 px-6 text-center overflow-hidden">
                {/* Decorative Doodle Elements - Responsive adjusted */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Top Left Face */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-[12%] left-[-5%] md:left-[10%] w-32 h-32 md:w-48 md:h-48 opacity-30 md:opacity-60 dark:opacity-20 text-slate-900 dark:text-white"
                    >
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M150 50C150 100 100 150 50 150" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                            <circle cx="160" cy="80" r="8" fill="currentColor"/>
                            <path d="M40 70C60 40 100 40 120 70" fill="#FFEBB7" fillOpacity="0.4"/>
                        </svg>
                    </motion.div>

                    {/* Top Right Smile */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-[10%] right-[-5%] md:right-[15%] w-32 h-32 md:w-48 md:h-48 opacity-30 md:opacity-60 dark:opacity-20 text-slate-900 dark:text-white"
                    >
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M60 80C60 120 100 140 140 120" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                            <circle cx="150" cy="100" r="4" fill="currentColor"/>
                            <path d="M60 80C60 50 100 50 140 80" fill="#FFB070" fillOpacity="0.4" stroke="#FFB070" strokeWidth="6"/>
                        </svg>
                    </motion.div>

                    {/* Green Blob - Pushed lower on mobile */}
                    <motion.div 
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute bottom-[30%] left-[-10%] md:left-[5%] w-24 h-24 md:w-32 md:h-32 opacity-30 md:opacity-60 dark:opacity-20 text-slate-900 dark:text-white"
                    >
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 30 70 10 50 10" stroke="#00E68A" strokeWidth="6" strokeLinecap="round"/>
                            <circle cx="65" cy="55" r="5" fill="currentColor"/>
                            <circle cx="50" cy="50" r="40" fill="#00E68A" fillOpacity="0.4"/>
                        </svg>
                    </motion.div>

                    {/* Yellow Smiley - Pushed lower on mobile */}
                    <motion.div 
                         animate={{ y: [0, -15, 0] }}
                         transition={{ duration: 4, repeat: Infinity }}
                         className="absolute bottom-[25%] right-[-10%] md:right-[8%] w-24 h-24 md:w-32 md:h-32 opacity-30 md:opacity-60 dark:opacity-20 text-slate-900 dark:text-white"
                    >
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 60C40 75 60 75 70 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                            <circle cx="75" cy="50" r="4" fill="currentColor"/>
                            <path d="M20 50C20 30 40 20 60 20C80 20 90 40 90 60" fill="#FFDC40" fillOpacity="0.4" stroke="#FFDC40" strokeWidth="4"/>
                        </svg>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 w-full">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[84px] font-[900] text-slate-800 dark:text-white leading-[1.1] sm:leading-[1.05] tracking-tight mb-6 sm:mb-8"
                    >
                        All your <span className="font-[950]">coding profiles</span> <br className="hidden sm:block" /> 
                        in one unified developer <br className="hidden sm:block" />
                        <span className="relative inline-block text-indigo-600 dark:text-indigo-400">
                            dashboard
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute bottom-1 left-0 h-2 sm:h-4 bg-indigo-500/10 dark:bg-indigo-500/25 -z-10"
                            />
                        </span>
                    </motion.h1>

                    <p className="text-[18px] sm:text-[20px] md:text-[22px] text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-10 sm:mb-12 font-semibold leading-relaxed px-4">
                        Connect GitHub, LeetCode, Codeforces, and more. Track your growth and showcase your skills with a single professional link.
                    </p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
                    >
                         <button 
                            onClick={() => setAuthModal('signup')}
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-10 py-4 rounded-[12px] font-[900] text-lg lg:text-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-95 cursor-pointer"
                        >
                            Get Started
                        </button>
                        <button 
                            className="w-full sm:w-auto bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-[12px] font-[900] text-lg lg:text-xl border-2 border-slate-200 dark:border-slate-800 transition-all active:scale-95 cursor-pointer"
                        >
                            View Demo
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Platform Integration — Infinite Scroll */}
            <section className="py-12 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
                <div className="text-center mb-8 px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-[900] text-slate-800 dark:text-white tracking-tight"
                    >
                        Connect all your <span className="text-indigo-650 dark:text-indigo-400">favorite platforms</span>
                    </motion.h2>
                    <p className="text-slate-400 dark:text-slate-500 font-bold mt-3 text-sm tracking-wide">
                        Coding · Development · Deployment · Professional
                    </p>
                </div>

                <div>
                    <ScrollStrip speed={30} direction="left" platforms={[
                        { name: "LeetCode", color: "text-[#FFA116]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
                        { name: "GitHub", color: "text-slate-900 dark:text-white", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
                        { name: "Codeforces", color: "text-[#1F8ACB]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9.75-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5h3zm9.75 7.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/></svg> },
                        { name: "Vercel", color: "text-slate-900 dark:text-white", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg> },
                        { name: "CodeChef", color: "text-[#5B4638] dark:text-[#cbb09d]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M11.257.004C5.37-.114.568 4.5.568 10.357c0 3.118 1.316 5.936 3.43 7.934L2.567 19.72a.756.756 0 0 0 .535 1.29h.232l1.842-1.848c1.688 1.104 3.7 1.745 5.86 1.745.308 0 .613-.013.914-.038l1.297 1.3h.232a.756.756 0 0 0 .535-1.29l-1.243-1.248c3.61-1.395 6.183-4.846 6.183-8.904 0-4.624-3.293-8.49-7.697-9.523zm-.258 1.668c.149 0 .296.006.443.014a10.08 10.08 0 0 1 3.01 7.54 10.08 10.08 0 0 1-3.01 7.54 10.08 10.08 0 0 1-3.007-7.54 10.08 10.08 0 0 1 3.007-7.54c.187-.008.375-.014.557-.014z"/></svg> },
                        { name: "LinkedIn", color: "text-[#0A66C2]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                        { name: "HackerRank", color: "text-[#2EC866]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 11.885 0 13-.642 1.114-9.107 6-10.392 6-1.284 0-9.75-4.886-10.392-6C1 17.885 1 7.115 1.6 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .258-.116.258-.258a.253.253 0 0 0-.062-.166L9.346 4.807a.26.26 0 0 0-.393 0L7.469 6.484a.253.253 0 0 0-.062.166c0 .141.115.258.258.258h.701v10.184h-.701a.256.256 0 0 0-.258.258c0 .061.023.12.062.166l1.484 1.677a.26.26 0 0 0 .393 0l1.484-1.677a.253.253 0 0 0 .062-.166.256.256 0 0 0-.258-.258h-.701v-3.875h4.074v3.875h-.701a.256.256 0 0 0-.258.258c0 .061.023.12.062.166l1.484 1.677a.26.26 0 0 0 .393 0l1.484-1.677a.253.253 0 0 0 .062-.166.256.256 0 0 0-.258-.258h-.701V6.908h.701c.141 0 .258-.116.258-.258a.253.253 0 0 0-.062-.166L15.4 4.807a.26.26 0 0 0-.393 0l-1.484 1.677a.253.253 0 0 0-.062.166c0 .141.116.149.834.149z"/></svg> },
                        { name: "GitLab", color: "text-[#FC6D26]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4.845.904c-.435 0-.82.28-.955.692C2.639 5.449 1.246 9.728.07 13.335a1.437 1.437 0 0 0 .522 1.607l11.071 8.045c.2.145.472.144.67-.004L23.408 14.9a1.436 1.436 0 0 0 .522-1.607c-1.176-3.607-2.569-7.886-3.82-11.739a1.003 1.003 0 0 0-.955-.692c-.437 0-.82.28-.956.692l-2.572 7.906H8.372L5.8 1.596A1.003 1.003 0 0 0 4.845.904z"/></svg> },
                        { name: "Netlify", color: "text-[#00C7B7]", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482a1.044 1.044 0 0 1 .355-.177l.574-3.55-1.313-1.256-3.322 2.927z"/></svg> },
                    ]} />
                </div>
            </section>

            {/* ═══════ STEP 5 — Advanced Features ═══════ */}
            <section id="features" className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-indigo-650 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Features</p>
                        <h2 className="text-4xl md:text-[48px] font-[900] text-slate-800 dark:text-white tracking-tight leading-tight">
                            Everything you need to <span className="text-indigo-600 dark:text-indigo-400">stand out</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Link2, title: "Connect All Profiles", desc: "One-click OAuth with GitHub, LeetCode, Codeforces, and 10+ platforms.", color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20" },
                            { icon: Brain, title: "AI Profile Summary", desc: "Auto-generated developer bio based on your actual coding activity.", color: "text-purple-650 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20" },
                            { icon: FileText, title: "Resume Generator", desc: "Create a polished resume directly from your connected profile data.", color: "text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20" },
                            { icon: Globe, title: "Shareable Dev Link", desc: "One clean URL for your entire coding identity. Perfect for CVs.", color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20" },
                            { icon: TrendingUp, title: "Weekly Progress", desc: "Track problems solved, commits pushed, and ratings gained every week.", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20" },
                            { icon: Calendar, title: "Contribution Heatmap", desc: "A beautiful cross-platform heatmap of your entire coding year.", color: "text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20" },
                        ].map(({ icon: Icon, title, desc, color }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="group bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
                            >
                                <div className={`p-3 rounded-xl w-fit mb-5 ${color} group-hover:scale-110 transition-transform`}>
                                    <Icon size={22} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-[19px] font-[900] text-slate-800 dark:text-white mb-2.5">{title}</h3>
                                <p className="text-[15px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ STEP 4 — Stats / Analytics ═══════ */}
            <section className="py-16 px-6 bg-[#F8FAFC] dark:bg-slate-900/30 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-emerald-500 dark:text-emerald-450 font-black uppercase tracking-widest text-xs mb-3">Analytics</p>
                        <h2 className="text-4xl md:text-[48px] font-[900] text-slate-800 dark:text-white tracking-tight">
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
                                <p className={`text-3xl md:text-4xl font-[900] ${color} mb-1`}>{value}</p>
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
                        <h2 className="text-4xl md:text-[48px] font-[900] text-slate-800 dark:text-white leading-tight tracking-tight mb-6">
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
                                <p className="text-xs font-[900] text-slate-805 dark:text-slate-200">Developer Overview</p>
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
                                    <p className="text-lg font-[900] text-slate-800 dark:text-white">34</p>
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Repos</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2 text-center transition-colors">
                                    <p className="text-lg font-[900] text-[#FFA116]">847</p>
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Solved</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2 text-center transition-colors">
                                    <p className="text-lg font-[900] text-[#1F8ACB] dark:text-[#38bdf8]">1842</p>
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
                        <h2 className="text-3xl md:text-[42px] font-[900] text-slate-850 dark:text-white leading-tight tracking-tight mb-10">
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
                                        <p className={`text-2xl font-[900] ${accent}`}>{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Activity</p>
                                    <p className="text-xs font-bold text-green-500">+24% this month</p>
                                </div>
                                <div className="flex items-end gap-1.5 h-16">
                                    {[35,50,40,65,55,80,70,90,60,75,85,95,70,80].map((h, i) => (
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
                        <h2 className="text-4xl md:text-[48px] font-[900] text-slate-800 dark:text-white tracking-tight">
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
                                        <p className="text-sm font-[900] text-slate-800 dark:text-white">{name}</p>
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
