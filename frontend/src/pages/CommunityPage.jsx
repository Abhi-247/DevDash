import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Users, MessageSquare, ThumbsUp, Sparkles, Trophy,
    ArrowRight, Github, ExternalLink, Flame, CheckCircle2
} from 'lucide-react';

const CommunityPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [threads, setThreads] = useState([
        {
            id: 1,
            title: 'Tips for breaking past the 1,600 rating barrier on Codeforces?',
            author: 'Kunal Patel',
            authorAvatar: 'Kunal',
            tag: 'Competitive Programming',
            upvotes: 84,
            replies: 23,
            time: '2 hours ago',
            liked: false
        },
        {
            id: 2,
            title: 'Project Showcase: How I built a real-time LeetCode contest predictor',
            author: 'Maya Lin',
            authorAvatar: 'Maya',
            tag: 'Showcase',
            upvotes: 142,
            replies: 39,
            time: '5 hours ago',
            liked: false
        },
        {
            id: 3,
            title: 'Does attaching DevScore link in cold emails actually improve response rate? (My 30-day experiment)',
            author: 'David Kim',
            authorAvatar: 'David',
            tag: 'Career Advice',
            upvotes: 219,
            replies: 54,
            time: '1 day ago',
            liked: false
        },
        {
            id: 4,
            title: 'Weekly Community LeetCode Sprint #42: Discussion & Solutions',
            author: 'DevDash Team',
            authorAvatar: 'Team',
            tag: 'Official Challenge',
            upvotes: 98,
            replies: 61,
            time: '2 days ago',
            liked: false
        }
    ]);

    const handleUpvote = (id) => {
        setThreads(threads.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    upvotes: t.liked ? t.upvotes - 1 : t.upvotes + 1,
                    liked: !t.liked
                };
            }
            return t;
        }));
    };

    const leaders = [
        { rank: 1, name: 'Siddharth R.', score: 1890, solutions: 640, streak: 120, badge: 'Diamond' },
        { rank: 2, name: 'Elena Rostova', score: 1820, solutions: 590, streak: 94, badge: 'Diamond' },
        { rank: 3, name: 'Marcus Sterling', score: 1740, solutions: 512, streak: 82, badge: 'Platinum' }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white overflow-x-hidden w-full transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5"
                    >
                        <Users size={14} />
                        10,000+ Active Builders
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        Learn, Share &amp; Level Up With <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Passionate Developers
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                    >
                        Join coding sprint groups, get project feedback, discuss algorithm techniques, and celebrate job offer milestones together.
                    </motion.p>
                </div>
            </section>

            {/* Community Hubs Cards */}
            <section className="py-6 px-6 max-w-5xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">DevDash Discord Server</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Daily coding voice lounges, resume critique channels, and real-time DevScore bot integration.
                            </p>
                        </div>
                        <a
                            href="https://discord.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all text-center"
                        >
                            Join Discord (5,400+ Members) →
                        </a>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center mb-4">
                                <Github size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">GitHub Discussions</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Open-source requests, roadmap voting, architecture debates, and technical troubleshooting.
                            </p>
                        </div>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all text-center"
                        >
                            View GitHub Discussions →
                        </a>
                    </div>
                </div>
            </section>

            {/* Discussion Threads & Leaderboard */}
            <section className="py-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
                {/* Threads column */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Discussions</h3>
                        <button
                            onClick={() => setAuthModal('signup')}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                        >
                            + Start Discussion
                        </button>
                    </div>

                    {threads.map((t) => (
                        <div
                            key={t.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-500/40 transition-colors flex items-start justify-between gap-4"
                        >
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                        {t.tag}
                                    </span>
                                    <span className="text-[11px] text-slate-400">• Posted {t.time}</span>
                                </div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                                    {t.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.authorAvatar}`}
                                        alt={t.author}
                                        className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950"
                                    />
                                    <span>{t.author}</span>
                                    <span>• {t.replies} responses</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleUpvote(t.id)}
                                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                    t.liked
                                        ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                                }`}
                            >
                                <ThumbsUp size={15} />
                                <span className="mt-1">{t.upvotes}</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Leaderboard Column */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy size={18} className="text-amber-500" />
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Leaders</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                        Top DevScore streaks and problem-solving contributors this month.
                    </p>

                    <div className="space-y-3">
                        {leaders.map((lead) => (
                            <div key={lead.rank} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 text-center font-black text-xs text-slate-400">#{lead.rank}</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{lead.name}</p>
                                        <p className="text-[10px] text-slate-400">{lead.solutions} solved • {lead.streak}d streak</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                                    {lead.score}
                                </span>
                            </div>
                        ))}
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

export default CommunityPage;
