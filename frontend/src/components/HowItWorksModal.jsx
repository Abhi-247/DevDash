import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, RotateCcw, Volume2, VolumeX, X, ChevronRight,
    RefreshCw, Trophy, FileText, Send, Globe, Sparkles, Check,
    ExternalLink, Code2, ShieldCheck, Flame, ArrowRight, Video
} from 'lucide-react';

/* ─── Chapter Definitions for the Animated Simulation ─── */
const CHAPTERS = [
    {
        id: 'sync',
        title: '1. Connect & Sync Profiles',
        badge: 'Automated Ingestion',
        duration: 10, // seconds
        caption: 'DevDash connects to LeetCode, GitHub, and Codeforces in one click using public read-only APIs without asking for account passwords.',
        speechText: 'Step one: Connect your coding profiles. DevDash synchronizes your LeetCode, GitHub, and Codeforces stats automatically with zero password risk.',
        details: [
            { label: 'LeetCode', value: '482 Problems Solved (Guardian)', color: 'text-amber-500' },
            { label: 'GitHub', value: '1,280 Commits • 342 Stars', color: 'text-slate-800 dark:text-slate-200' },
            { label: 'Codeforces', value: '1,640 Rating (Specialist)', color: 'text-sky-500' }
        ]
    },
    {
        id: 'devscore',
        title: '2. Algorithmic DevScore™',
        badge: 'Credit Rating Engine',
        duration: 10,
        caption: 'Our engine normalizes hard problem counts, commit velocity, and contest percentiles into a standardized 2,000-point developer credit score.',
        speechText: 'Step two: Algorithmic DevScore. We normalize problem difficulty, commit consistency, and contest ratings into a single trusted credit score.',
        scoreTarget: 1680,
        tier: 'Platinum Master',
        details: [
            { label: 'Problem Difficulty Weight', value: '+620 pts', color: 'text-indigo-400' },
            { label: 'Consistency & PR Velocity', value: '+480 pts', color: 'text-emerald-400' },
            { label: 'Contest Percentile', value: '+580 pts', color: 'text-purple-400' }
        ]
    },
    {
        id: 'resume',
        title: '3. ATS-Optimized AI Resume',
        badge: 'LaTeX Engine',
        duration: 10,
        caption: 'Generate clean, single-column LaTeX resumes with automated impact metrics tailored to job descriptions, scoring 98%+ on ATS screening.',
        speechText: 'Step three: AI Resume Builder. Generate ATS-optimized single-column LaTeX resumes with verified metrics in seconds.',
        details: [
            { label: 'ATS Compatibility Score', value: '98.4% Pass Rate', color: 'text-emerald-400' },
            { label: 'Bullet Optimization', value: 'Google XYZ Framework', color: 'text-indigo-400' },
            { label: 'Export Format', value: 'Direct PDF & TeX Source', color: 'text-rose-400' }
        ]
    },
    {
        id: 'outreach',
        title: '4. Cold HR Email Outreach',
        badge: 'Gmail SMTP Relay',
        duration: 10,
        caption: 'Dispatch customized cold emails to tech recruiters directly from your personal Gmail address with delivery and read-status tracking.',
        speechText: 'Step four: Automated HR Outreach. Reach tech recruiters directly through your personal Gmail SMTP with verified delivery tracking.',
        details: [
            { label: 'Delivery Gateway', value: 'Personal Gmail App Password (AES-256)', color: 'text-blue-400' },
            { label: 'Recruiter Verified List', value: '10,000+ Tech Talent Contacts', color: 'text-purple-400' },
            { label: 'Response Tracking', value: 'Open & Reply Webhook Events', color: 'text-emerald-400' }
        ]
    },
    {
        id: 'portfolio',
        title: '5. Shareable Developer Link',
        badge: 'devdash.me/u/handle',
        duration: 10,
        caption: 'Share one clean link at devdash.me/u/yourname on LinkedIn, Twitter, and job applications with custom QR badges and click analytics.',
        speechText: 'Step five: Your verified developer link. Share one unified URL with recruiters and showcase everything you have built.',
        details: [
            { label: 'Custom Handle URL', value: 'devdash.me/u/alexdev', color: 'text-indigo-400' },
            { label: 'Social Cards', value: 'Auto-Generated OG Previews', color: 'text-amber-400' },
            { label: 'Recruiter CTA', value: 'Direct Interview Request Inbox', color: 'text-emerald-400' }
        ]
    }
];

const HowItWorksModal = ({ isOpen, onClose, onOpenSignup, customVideoUrl = '' }) => {
    // Mode: 'simulation' (animated interactive walkthrough) or 'video' (MP4 / YouTube embed)
    const [viewMode, setViewMode] = useState('simulation');
    const [currentChapter, setCurrentChapter] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0); // 0 to 100 within current chapter
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [scoreCounter, setScoreCounter] = useState(420);

    const speechRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Handle speech synthesis when sound is enabled
    useEffect(() => {
        if (!isOpen) {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            return;
        }

        if (soundEnabled && isPlaying && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(CHAPTERS[currentChapter].speechText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            speechRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        } else {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        }

        return () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, [currentChapter, soundEnabled, isPlaying, isOpen]);

    // Timer loop for chapter progression
    useEffect(() => {
        if (!isOpen || !isPlaying || viewMode !== 'simulation') return;

        const intervalMs = 100;
        const totalDurationMs = CHAPTERS[currentChapter].duration * 1000;
        const step = (intervalMs / totalDurationMs) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev + step >= 100) {
                    // Advance to next chapter
                    setCurrentChapter((prevCh) => (prevCh + 1) % CHAPTERS.length);
                    return 0;
                }
                return prev + step;
            });
        }, intervalMs);

        return () => clearInterval(timer);
    }, [isOpen, isPlaying, currentChapter, viewMode]);

    // Animate score counter during DevScore chapter
    useEffect(() => {
        if (currentChapter === 1 && isOpen) {
            let start = 420;
            const target = 1680;
            const increment = (target - start) / 30;
            const scoreTimer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setScoreCounter(target);
                    clearInterval(scoreTimer);
                } else {
                    setScoreCounter(Math.round(start));
                }
            }, 50);
            return () => clearInterval(scoreTimer);
        } else {
            setScoreCounter(420);
        }
    }, [currentChapter, isOpen]);

    if (!isOpen) return null;

    const chapter = CHAPTERS[currentChapter];

    const handleJumpToChapter = (idx) => {
        setCurrentChapter(idx);
        setProgress(0);
        setIsPlaying(true);
    };

    const handleRestart = () => {
        setCurrentChapter(0);
        setProgress(0);
        setIsPlaying(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative"
            >
                {/* ── Modal Header Bar ── */}
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-50/60 dark:bg-slate-950/40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <h3 className="font-[900] text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                                <span>How DevDash Works</span>
                                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                                    Interactive Demo
                                </span>
                            </h3>
                            <p className="text-[11px] text-slate-500 hidden sm:block">
                                Explore the end-to-end flow from account sync to verified developer portfolio.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Switch Mode: Simulation vs Custom Video */}
                        {customVideoUrl && (
                            <div className="flex p-0.5 bg-slate-200 dark:bg-slate-800 rounded-xl text-xs font-bold">
                                <button
                                    onClick={() => setViewMode('simulation')}
                                    className={`px-3 py-1 rounded-lg transition-all ${viewMode === 'simulation' ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                                >
                                    AI Simulation
                                </button>
                                <button
                                    onClick={() => setViewMode('video')}
                                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${viewMode === 'video' ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                                >
                                    <Video size={13} /> Video
                                </button>
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* ── Main Viewport Content ── */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50 dark:bg-slate-950/60">
                    {viewMode === 'simulation' ? (
                        <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-inner overflow-hidden min-h-[380px] flex flex-col justify-between">
                            {/* Decorative ambient gradient backdrop */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                            {/* Stage Top Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        {chapter.badge}
                                    </span>
                                </div>
                                <div className="text-xs font-bold text-slate-400">
                                    Step {currentChapter + 1} of {CHAPTERS.length}
                                </div>
                            </div>

                            {/* ─── Animated Stage Visuals per Chapter ─── */}
                            <div className="my-6 relative z-10">
                                <AnimatePresence mode="wait">
                                    {currentChapter === 0 && (
                                        <motion.div
                                            key="ch0"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white">
                                                Connecting Multi-Platform Signals
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                                                DevDash runs automated background scrapers that query contest ratings, submission streaks, and repository stars in parallel.
                                            </p>

                                            <div className="grid sm:grid-cols-3 gap-3 pt-3">
                                                {chapter.details.map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.15 }}
                                                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                                                    >
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                                                            <Check size={14} className="text-emerald-500" />
                                                        </div>
                                                        <p className={`text-xs font-black ${item.color}`}>{item.value}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentChapter === 1 && (
                                        <motion.div
                                            key="ch1"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white">
                                                Algorithmic Normalization in Real Time
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                                                Raw platform counts are weighted by contest percentiles and difficulty multipliers to calculate a unified DevScore out of 2,000.
                                            </p>

                                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                                                <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center shrink-0 w-48">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">DevScore™</span>
                                                    <div className="text-4xl font-[900] text-indigo-600 dark:text-indigo-400 my-1">
                                                        {scoreCounter}
                                                    </div>
                                                    <span className="text-[11px] font-bold text-emerald-500">🏆 {chapter.tier}</span>
                                                </div>

                                                <div className="flex-1 space-y-2 w-full">
                                                    {chapter.details.map((item, i) => (
                                                        <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                                                            <span className="font-semibold text-slate-600 dark:text-slate-400">{item.label}</span>
                                                            <span className={`font-black ${item.color}`}>{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentChapter === 2 && (
                                        <motion.div
                                            key="ch2"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white">
                                                ATS-Tested LaTeX Resume Compilation
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                                                Your GitHub repos and verified LeetCode milestones are structured into single-column LaTeX code that parses through Workday, Taleo, and Greenhouse with 98%+ accuracy.
                                            </p>

                                            <div className="grid sm:grid-cols-3 gap-3 pt-3">
                                                {chapter.details.map((item, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <span className="text-xs text-slate-400 block mb-1">{item.label}</span>
                                                        <p className={`text-sm font-black ${item.color}`}>{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentChapter === 3 && (
                                        <motion.div
                                            key="ch3"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white">
                                                Personal Gmail SMTP Cold Outreach
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                                                Send cold emails to verified recruiters directly through your own Gmail server with real-time open notifications and zero spam penalties.
                                            </p>

                                            <div className="grid sm:grid-cols-3 gap-3 pt-3">
                                                {chapter.details.map((item, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <span className="text-xs text-slate-400 block mb-1">{item.label}</span>
                                                        <p className={`text-xs font-bold ${item.color}`}>{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentChapter === 4 && (
                                        <motion.div
                                            key="ch4"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white">
                                                Your Verified devdash.me Link
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                                                Replace messy link dumps with a sleek developer profile, QR badge, and recruiter interview scheduler.
                                            </p>

                                            <div className="grid sm:grid-cols-3 gap-3 pt-3">
                                                {chapter.details.map((item, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <span className="text-xs text-slate-400 block mb-1">{item.label}</span>
                                                        <p className={`text-xs font-bold ${item.color}`}>{item.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Caption & Narration Bar */}
                            <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-slate-950/80 border border-indigo-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between gap-3 relative z-10">
                                <p className="font-medium italic leading-relaxed">
                                    "{chapter.caption}"
                                </p>
                                <button
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    className={`shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${soundEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}
                                    title={soundEnabled ? 'Mute AI voice narration' : 'Enable AI voice narration'}
                                >
                                    {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Video Player Fallback / Embed Mode */
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center relative">
                            {customVideoUrl.includes('youtube.com') || customVideoUrl.includes('youtu.be') ? (
                                <iframe
                                    src={customVideoUrl}
                                    title="DevDash Platform Walkthrough"
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : customVideoUrl.includes('loom.com') ? (
                                <iframe
                                    src={customVideoUrl}
                                    title="DevDash Walkthrough Loom"
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={customVideoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* ── Chapter Timeline & Navigation Scrub Bar ── */}
                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                    {/* Chapter Progress Indicators */}
                    <div className="grid grid-cols-5 gap-2 mb-3">
                        {CHAPTERS.map((ch, idx) => {
                            const isPast = idx < currentChapter;
                            const isCurrent = idx === currentChapter;
                            const fill = isPast ? 100 : isCurrent ? progress : 0;
                            return (
                                <button
                                    key={ch.id}
                                    onClick={() => handleJumpToChapter(idx)}
                                    className="text-left group cursor-pointer"
                                >
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                                        <div
                                            className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-100 rounded-full"
                                            style={{ width: `${fill}%` }}
                                        />
                                    </div>
                                    <span className={`text-[10px] font-bold block truncate transition-colors ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                                        {ch.title.split('. ')[1]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Controls & Call to Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                            >
                                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                <span>{isPlaying ? 'Pause Tour' : 'Play Tour'}</span>
                            </button>
                            <button
                                onClick={handleRestart}
                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
                                title="Restart Tour"
                            >
                                <RotateCcw size={14} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    onClose();
                                    if (onOpenSignup) onOpenSignup();
                                }}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105"
                            >
                                <span>Create Your Account Free</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HowItWorksModal;
