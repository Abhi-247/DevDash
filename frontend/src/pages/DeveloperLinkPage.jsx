import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Link2, QrCode, Eye, Share2, Sparkles, Check, ArrowRight,
    Copy, ExternalLink, ShieldCheck, Flame, Trophy, Code2,
    CheckCircle2, Laptop, Smartphone, Palette
} from 'lucide-react';

const DeveloperLinkPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [handle, setHandle] = useState('alexdeveloper');
    const [copied, setCopied] = useState(false);
    const [previewMode, setPreviewMode] = useState('card'); // 'card' | 'qr' | 'metrics'

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://devdash.me/u/${handle}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5"
                    >
                        <Link2 size={14} />
                        Personalized Developer Identity
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        One Single Link For <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Everything You've Built
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        Replace messy link trees, scattered Google Drive resumes, and multiple platform URLs with a lightning-fast, verified developer profile link.
                    </motion.p>

                    {/* Interactive Handle Claim Input */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-indigo-500/5 flex flex-col sm:flex-row items-center gap-2"
                    >
                        <div className="flex items-center flex-1 w-full px-3 py-2 text-slate-400 font-mono text-sm">
                            <span className="select-none text-slate-400 dark:text-slate-500 font-bold">devdash.me/u/</span>
                            <input
                                type="text"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                                placeholder="yourname"
                                className="w-full bg-transparent text-slate-900 dark:text-white font-bold focus:outline-none placeholder-slate-400 pl-1"
                            />
                            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 shrink-0 ml-2">
                                <Check size={14} /> Available
                            </span>
                        </div>
                        <button
                            onClick={() => setAuthModal('signup')}
                            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                            <span>Claim Link</span>
                            <ArrowRight size={14} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Live Preview Box */}
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                Live Interactive Mockup
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                What your visitors & recruiters see
                            </h3>
                        </div>

                        {/* Switch Preview Tabs */}
                        <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <button
                                onClick={() => setPreviewMode('card')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode === 'card' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                Portfolio View
                            </button>
                            <button
                                onClick={() => setPreviewMode('qr')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode === 'qr' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                QR Badge
                            </button>
                            <button
                                onClick={() => setPreviewMode('metrics')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode === 'metrics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                Click Insights
                            </button>
                        </div>
                    </div>

                    {/* Preview Viewport */}
                    <div className="max-w-2xl mx-auto">
                        {previewMode === 'card' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                                
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-3">
                                    <div className="relative">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${handle || 'Alex'}`}
                                            alt="Avatar"
                                            className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-500/20 shadow-md"
                                        />
                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" title="Open to Work" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                            <h4 className="text-xl font-[900] text-slate-900 dark:text-white capitalize">
                                                {handle || 'Alex Developer'}
                                            </h4>
                                            <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                                                Verified Dev
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Full Stack Engineer • React, Node.js, Go • San Francisco, CA
                                        </p>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50 flex items-center gap-1">
                                                <Trophy size={13} /> DevScore 1,640
                                            </span>
                                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-200/50 flex items-center gap-1">
                                                <Flame size={13} /> 64 Day Streak
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCopy}
                                        className="px-3.5 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                                    </button>
                                </div>

                                {/* Pinned stats grid */}
                                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400 font-semibold">LeetCode</p>
                                        <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">482 Solved</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400 font-semibold">GitHub</p>
                                        <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">1,240 Commits</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400 font-semibold">Codeforces</p>
                                        <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">1580 (Specialist)</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {previewMode === 'qr' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl max-w-sm mx-auto"
                            >
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-fit mx-auto mb-4">
                                    <QrCode size={160} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                                    devdash.me/u/{handle}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
                                    Instant scan badge for physical resumes, business cards, and hackathons.
                                </p>
                                <button className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold rounded-xl text-slate-800 dark:text-white">
                                    Download High-Res SVG
                                </button>
                            </motion.div>
                        )}

                        {previewMode === 'metrics' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl"
                            >
                                <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">
                                    Recruiter & Profile Traffic
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400">Total Views</p>
                                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">2,842</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400">Unique Tech Recruiters</p>
                                        <p className="text-2xl font-black text-emerald-500 mt-1">148</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400">Resume Downloads</p>
                                        <p className="text-2xl font-black text-purple-500 mt-1">94</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <p className="text-xs text-slate-400">Avg. Dwell Time</p>
                                        <p className="text-2xl font-black text-pink-500 mt-1">2m 45s</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    All analytics are GDPR-compliant, privacy-first, and require zero tracking cookies.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Link Features List */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: ShieldCheck,
                            title: 'Cryptographically Verified',
                            desc: 'Stats are authenticated directly from GitHub and LeetCode API pipelines, guaranteeing 100% genuine recruiter trust.'
                        },
                        {
                            icon: Share2,
                            title: 'Dynamic OpenGraph Previews',
                            desc: 'Whenever you share your link on LinkedIn, Twitter, or Discord, a customized preview card with your latest DevScore is automatically generated.'
                        },
                        {
                            icon: Eye,
                            title: 'Recruiter Direct Inquiry CTA',
                            desc: 'Recruiters can schedule an interview or send job descriptions straight to your inbox without exposing your personal email to web scrapers.'
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                                <item.icon size={20} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default DeveloperLinkPage;
