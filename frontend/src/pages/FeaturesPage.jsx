import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Sparkles, RefreshCw, Trophy, FileText, Send, FolderKanban,
    BarChart3, Globe, Target, CheckCircle2, ArrowRight, ShieldCheck,
    Zap, Cpu, Code2, Users, Layers, ExternalLink, Sliders
} from 'lucide-react';

const FeaturesPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    // Interactive DevScore Simulator State
    const [simLeetcode, setSimLeetcode] = useState(350);
    const [simGithub, setSimGithub] = useState(25);
    const [simStreak, setSimStreak] = useState(45);

    // Calculate simulated score
    const calculatedScore = Math.min(2000, Math.round(
        (simLeetcode * 2.2) + (simGithub * 18) + (simStreak * 12) + 420
    ));

    const getScoreTier = (score) => {
        if (score >= 1700) return { name: 'Diamond Elite', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' };
        if (score >= 1400) return { name: 'Platinum Master', color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30' };
        if (score >= 1100) return { name: 'Gold Specialist', color: 'text-amber-400 bg-amber-950/40 border-amber-500/30' };
        return { name: 'Silver Explorer', color: 'text-slate-400 bg-slate-800 border-slate-700' };
    };

    const currentTier = getScoreTier(calculatedScore);

    const featureCategories = [
        { id: 'all', label: 'All Features' },
        { id: 'sync', label: 'Profile Sync' },
        { id: 'devscore', label: 'DevScore™' },
        { id: 'resume', label: 'AI Resume' },
        { id: 'outreach', label: 'HR Outreach' },
        { id: 'analytics', label: 'Analytics' }
    ];

    const allFeatures = [
        {
            category: 'sync',
            icon: RefreshCw,
            title: '1-Click Multi-Platform Aggregation',
            badge: 'Core Engine',
            desc: 'Connect LeetCode, GitHub, Codeforces, HackerRank, GeeksforGeeks, CodeChef, and LinkedIn in seconds without complex tokens.',
            highlights: ['Real-time GraphQL & REST workers', 'Auto-syncs every 6 hours', 'Zero credential leak guarantee'],
            accent: 'from-blue-500 to-indigo-600'
        },
        {
            category: 'devscore',
            icon: Trophy,
            title: 'Algorithmic DevScore™ 2.0',
            badge: 'Exclusive',
            desc: 'A unified developer credit rating out of 2,000 points scientifically calculated from problem difficulty, commit consistency, and contest ranks.',
            highlights: ['Anti-cheat commit normalization', 'Contest percentile weighting', 'Tiered digital verification badges'],
            accent: 'from-amber-500 to-orange-600'
        },
        {
            category: 'resume',
            icon: FileText,
            title: 'ATS-Optimized AI Resume Builder',
            badge: 'AI Powered',
            desc: 'Generate clean LaTeX-style resumes with automated bullet point enhancement, skill matrices, and instant PDF compilation.',
            highlights: ['98%+ ATS parse pass rate', 'Live job-description tailoring', 'One-click recruiter link embeds'],
            accent: 'from-purple-500 to-pink-600'
        },
        {
            category: 'outreach',
            icon: Send,
            title: 'Cold Outreach & Recruiter Pipeline',
            badge: 'Job Hunt',
            desc: 'Send verified emails to tech recruiters using your personal Gmail SMTP relay with full delivery status and reply analytics.',
            highlights: ['Spam-proof throttling algorithms', 'Dynamic recruiter placeholders', 'Read and reply status tracking'],
            accent: 'from-emerald-500 to-teal-600'
        },
        {
            category: 'analytics',
            icon: BarChart3,
            title: 'Deep Engineering Analytics',
            badge: 'Insights',
            desc: 'Comprehensive multi-year timeline graphs showing language mastery, repository momentum, and competitive problem distribution.',
            highlights: ['Interactive heatmaps across platforms', 'Daily streak retention tracker', 'Peer group benchmarking'],
            accent: 'from-cyan-500 to-blue-600'
        },
        {
            category: 'sync',
            icon: Globe,
            title: 'Custom Verified Developer Portfolio',
            badge: 'Public Profile',
            desc: 'Share a fast, responsive public link at devdash.me/u/yourname that showcases your projects, live stats, and verified skills.',
            highlights: ['Custom meta tags & OG card previews', 'High-speed edge caching', 'Integrated recruiter contact CTA'],
            accent: 'from-rose-500 to-indigo-600'
        }
    ];

    const filteredFeatures = activeTab === 'all' 
        ? allFeatures 
        : allFeatures.filter(f => f.category === activeTab);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero Header */}
            <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5"
                    >
                        <Sparkles size={14} />
                        DevDash Feature Suite
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        Everything you need to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">stand out</span> to recruiters.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                    >
                        From automated profile synchronization to algorithmic skill scoring and AI resumes, explore the core engines driving DevDash.
                    </motion.p>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl max-w-2xl mx-auto">
                        {featureCategories.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    activeTab === tab.id
                                        ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Cards Grid */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredFeatures.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div
                                    key={feat.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                                    className="group relative bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-7 hover:border-indigo-500/40 dark:hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.accent} flex items-center justify-center text-white shadow-md`}>
                                                <Icon size={22} strokeWidth={2.4} />
                                            </div>
                                            <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                                                {feat.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {feat.title}
                                        </h3>

                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                            {feat.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                                        {feat.highlights.map((h, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>

            {/* Interactive DevScore Calculator Showcase */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                            Interactive Simulator
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-[900] text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
                            See how your stats translate to <span className="text-indigo-600 dark:text-indigo-400">DevScore™</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Adjust the sliders below to calculate your estimated DevScore ranking and badge tier in real time.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg">
                        {/* Sliders Column */}
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                                    <span>LeetCode Problems Solved</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">{simLeetcode} problems</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="800"
                                    step="10"
                                    value={simLeetcode}
                                    onChange={(e) => setSimLeetcode(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                                    <span>0 (Beginner)</span>
                                    <span>400 (Intermediate)</span>
                                    <span>800+ (Master)</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                                    <span>Public GitHub Repositories</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">{simGithub} repos</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="60"
                                    step="1"
                                    value={simGithub}
                                    onChange={(e) => setSimGithub(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                                    <span>0</span>
                                    <span>30</span>
                                    <span>60+</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                                    <span>Active Coding Streak (Days)</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">{simStreak} days</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="120"
                                    step="5"
                                    value={simStreak}
                                    onChange={(e) => setSimStreak(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                                    <span>0 days</span>
                                    <span>60 days</span>
                                    <span>120+ days</span>
                                </div>
                            </div>
                        </div>

                        {/* Result Score Card */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/5 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-slate-900 border border-indigo-200/60 dark:border-indigo-800/60 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                                Projected DevScore™
                            </span>
                            <div className="text-6xl font-[900] tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-300 bg-clip-text text-transparent my-2">
                                {calculatedScore}
                            </div>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-5">
                                out of 2,000 maximum points
                            </span>

                            <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 ${currentTier.color}`}>
                                🏆 {currentTier.name}
                            </div>

                            <button
                                onClick={() => setAuthModal('signup')}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Claim Your Verified Score</span>
                                <ArrowRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Callout */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-[900] text-slate-900 dark:text-white tracking-tight">
                        Ready to showcase your true engineering potential?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
                        Join over 10,000 developers syncing their profiles, building verified portfolios, and landing interviews today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <button
                            onClick={() => setAuthModal('signup')}
                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 cursor-pointer transition-all hover:scale-105"
                        >
                            Get Started Free
                        </button>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="px-8 py-3.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-xl border border-slate-300 dark:border-slate-800 cursor-pointer transition-all"
                        >
                            View Pricing Plans
                        </button>
                    </div>
                </div>
            </section>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default FeaturesPage;
