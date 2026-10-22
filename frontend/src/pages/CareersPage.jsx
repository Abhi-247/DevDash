import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Briefcase, Sparkles, MapPin, DollarSign, Laptop,
    Heart, Globe, ArrowRight, CheckCircle2, X, Send, Award
} from 'lucide-react';

const CareersPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedSuccess, setAppliedSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        portfolio: '',
        github: '',
        note: ''
    });

    const perks = [
        {
            icon: Globe,
            title: '100% Remote & Async',
            desc: 'Work from anywhere on Earth with flexible working hours that respect your rhythm.'
        },
        {
            icon: Laptop,
            title: '$2,500 Home Office Stipend',
            desc: 'Top-tier M3 Max MacBook Pro, 4K monitor, and ergonomic chair setup provided day one.'
        },
        {
            icon: DollarSign,
            title: 'Competitive Pay & Equity',
            desc: 'Top-of-market base compensation plus meaningful early-stage company stock options.'
        },
        {
            icon: Heart,
            title: 'Comprehensive Health & Dental',
            desc: '100% premium coverage for you and your dependents, plus mental health stipend.'
        },
        {
            icon: Award,
            title: 'Unlimited Learning Budget',
            desc: '$1,500/yr for books, conferences, hackathons, and certifications.'
        },
        {
            icon: Sparkles,
            title: 'Annual Team Retreats',
            desc: 'Twice a year we fly the whole team to inspiring global destinations to bond and hack.'
        }
    ];

    const jobs = [
        {
            id: 'fe-eng',
            title: 'Senior Frontend Engineer (React & Framer Motion)',
            dept: 'Engineering',
            location: 'Remote (Global)',
            salary: '$120,000 – $155,000 + Equity',
            type: 'Full-time',
            desc: 'Lead the frontend architecture of DevDash. Build slick micro-interactions, responsive dashboards, and high-performance profile pages.',
            reqs: ['4+ years of production React & Tailwind experience', 'Deep knowledge of Framer Motion, SVG animations, and performance profiling', 'Passionate about typography and developer tool UX']
        },
        {
            id: 'backend-eng',
            title: 'Backend Systems Engineer (Scraping & Graph API)',
            dept: 'Engineering',
            location: 'Remote (US/EU/India)',
            salary: '$125,000 – $165,000 + Equity',
            type: 'Full-time',
            desc: 'Architect resilient data ingestion workers syncing 10+ competitive programming and code hosting APIs at massive scale without rate-limiting.',
            reqs: ['Strong experience with Node.js, Express, MongoDB, and Redis', 'Experience building worker queues with BullMQ and anti-bot bypass strategies', 'Obsessed with sub-50ms query latency and caching architectures']
        },
        {
            id: 'devrel',
            title: 'Developer Relations & Community Lead',
            dept: 'Marketing',
            location: 'Remote (Global)',
            salary: '$85,000 – $115,000 + Equity',
            type: 'Full-time',
            desc: 'Be the public face of DevDash. Engage with developer communities on Discord, Twitter, and YouTube, organize hackathons, and gather developer feedback.',
            reqs: ['Active member of college coding, competitive programming, or OSS circles', 'Track record producing technical articles, Twitter threads, or video breakdowns', 'Empathetic communicator who loves helping young coders succeed']
        },
        {
            id: 'ai-eng',
            title: 'AI Resume & ATS Optimization Specialist',
            dept: 'Product',
            location: 'Remote (Global)',
            salary: '$110,000 – $145,000 + Equity',
            type: 'Full-time',
            desc: 'Fine-tune LLM prompt pipelines that transform messy developer commit logs and LeetCode ratings into high-impact LaTeX resume bullet points.',
            reqs: ['Experience with OpenAI/Anthropic APIs, prompt engineering, and evaluation benchmarks', 'Strong technical understanding of ATS resume parsing algorithms']
        }
    ];

    const handleApplySubmit = (e) => {
        e.preventDefault();
        setAppliedSuccess(true);
        setTimeout(() => {
            setAppliedSuccess(false);
            setSelectedJob(null);
            setFormData({ name: '', email: '', portfolio: '', github: '', note: '' });
        }, 3000);
    };

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
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-5"
                    >
                        <Sparkles size={14} />
                        We Are Hiring Across All Roles
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        Build The Future Of <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Developer Identity
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a high-speed, remote-first team building tools that empower developers worldwide to showcase their genuine coding craft.
                    </motion.p>
                </div>
            </section>

            {/* Perks Grid */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Why Join Us
                    </span>
                    <h2 className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tight mt-1">
                        Benefits That Put Developers First
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {perks.map((p, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 hover:border-indigo-500/40 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-sm">
                                <p.icon size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{p.title}</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Roles */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Open Opportunities
                    </span>
                    <h2 className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tight mt-1">
                        Find Your Next Role
                    </h2>
                </div>

                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                        >
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                        {job.dept}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                                    {job.desc}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
                                    <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                                    <span className="flex items-center gap-1"><DollarSign size={13} /> {job.salary}</span>
                                    <span>• {job.type}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedJob(job)}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Apply Now</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Application Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {appliedSuccess ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <h3 className="text-2xl font-[900] text-slate-900 dark:text-white">Application Received!</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                        Thanks for applying. Our engineering lead will review your DevDash link and get in touch within 48 hours.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">
                                        Apply for {selectedJob.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                                        {selectedJob.salary} • {selectedJob.location}
                                    </p>

                                    <form onSubmit={handleApplySubmit} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Ada Lovelace"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="ada@example.com"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                    DevDash / Portfolio Link
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.portfolio}
                                                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                                    placeholder="devdash.me/u/handle"
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                    GitHub Profile
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.github}
                                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                    placeholder="github.com/username"
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                Why DevDash? (Short Note)
                                            </label>
                                            <textarea
                                                rows="3"
                                                value={formData.note}
                                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                                placeholder="Tell us what excites you about developer tooling..."
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                                        >
                                            <Send size={14} />
                                            <span>Submit Application</span>
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default CareersPage;
