import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Code2, Github, Star, GitFork, Heart, Sparkles,
    CheckCircle2, ArrowRight, ExternalLink, Terminal
} from 'lucide-react';

const OpenSourcePage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);

    const repos = [
        {
            name: 'devdash/core-sync',
            desc: 'High-performance GraphQL & REST connector engine for LeetCode, Codeforces, and HackerRank with distributed caching.',
            language: 'TypeScript',
            stars: '1,420',
            forks: '215',
            license: 'MIT',
            tag: 'Core Engine'
        },
        {
            name: 'devdash/devscore-engine',
            desc: 'The official algorithmic credit score algorithm implementation, normalizers, and anti-cheat validation pipeline.',
            language: 'Python',
            stars: '890',
            forks: '142',
            license: 'MIT',
            tag: 'Algorithm'
        },
        {
            name: 'devdash/latex-resume-templates',
            desc: 'Curated collection of 98%+ ATS-verified single-column LaTeX developer resume designs with PDF compilation scripts.',
            language: 'TeX',
            stars: '2,310',
            forks: '480',
            license: 'MIT',
            tag: 'Templates'
        },
        {
            name: 'devdash/embed-widgets',
            desc: 'Lightweight Web Components and React widgets to embed live DevScore badges and solving streaks onto personal portfolio sites.',
            language: 'JavaScript',
            stars: '640',
            forks: '88',
            license: 'MIT',
            tag: 'Widgets'
        }
    ];

    const issues = [
        { title: 'Add AtCoder platform connector scraper worker', repo: 'core-sync', difficulty: 'Good First Issue', tag: 'Feature' },
        { title: 'Support Dark Mode theme toggle in embeddable iframe widget', repo: 'embed-widgets', difficulty: 'Beginner Friendly', tag: 'UI' },
        { title: 'Fix rating percentile rounding for Codeforces division 3', repo: 'devscore-engine', difficulty: 'Bug Fix', tag: 'Algorithm' }
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
                        <Heart size={14} className="text-rose-500" />
                        Free &amp; Open Source Software
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        Built By Developers, <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Backed By Open Source
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        Our core sync adapters, DevScore algorithmic specifications, and LaTeX resume designs are freely available on GitHub for the community to inspect and contribute.
                    </motion.p>
                </div>
            </section>

            {/* Repositories Grid */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Featured Repositories
                    </span>
                    <h2 className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tight mt-1">
                        Explore Our Public Codebases
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {repos.map((repo, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Github size={20} className="text-slate-800 dark:text-white" />
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{repo.name}</h3>
                                    </div>
                                    <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                        {repo.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                    {repo.desc}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">● {repo.language}</span>
                                    <span className="flex items-center gap-1"><Star size={13} className="text-amber-400" /> {repo.stars}</span>
                                    <span className="flex items-center gap-1"><GitFork size={13} /> {repo.forks}</span>
                                </div>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                                >
                                    GitHub →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Good First Issues */}
            <section className="py-12 px-6 max-w-4xl mx-auto">
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Contribute Today
                            </span>
                            <h3 className="text-2xl font-[900] text-slate-900 dark:text-white mt-1">
                                Good First Issues
                            </h3>
                        </div>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            View All on GitHub →
                        </a>
                    </div>

                    <div className="space-y-3">
                        {issues.map((iss, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{iss.title}</h4>
                                    <p className="text-[11px] text-slate-400 mt-0.5">Repo: devdash/{iss.repo}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                        {iss.difficulty}
                                    </span>
                                </div>
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

export default OpenSourcePage;
