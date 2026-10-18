import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Mail, MessageSquare, Twitter, Github, Send,
    CheckCircle2, Sparkles, Clock, ShieldCheck, HelpCircle
} from 'lucide-react';

const ContactPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: 'General Question',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: '', email: '', subject: 'General Question', message: '' });
        }, 4000);
    };

    const channels = [
        {
            icon: MessageSquare,
            title: 'Community Discord',
            desc: 'Join 5,000+ coders. Get real-time help from our founders and active contributors.',
            action: 'Join Discord Server',
            href: 'https://discord.com',
            accent: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
        },
        {
            icon: Mail,
            title: 'Direct Support Email',
            desc: 'For billing inquiries, account security, or enterprise recruiter access.',
            action: 'support@devdash.io',
            href: 'mailto:support@devdash.io',
            accent: 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60'
        },
        {
            icon: Twitter,
            title: 'Twitter / X Support',
            desc: 'Tweet or DM us for quick questions, feature requests, or developer shoutouts.',
            action: '@devdash_hq',
            href: 'https://twitter.com',
            accent: 'text-sky-500 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60'
        },
        {
            icon: Github,
            title: 'GitHub Issues',
            desc: 'Report bugs, track connector sync issues, or request platform APIs.',
            action: 'Open Issue on GitHub',
            href: 'https://github.com',
            accent: 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800'
        }
    ];

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
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5"
                    >
                        <Clock size={14} />
                        Support Team Online • Avg Reply &lt; 20 Mins
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        How Can We <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Help You</span> Today?
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        Whether you need help syncing a platform, have a question about DevScore™, or want to partner with us, we are here for you.
                    </motion.p>
                </div>
            </section>

            {/* Channels Grid */}
            <section className="py-10 px-6 max-w-7xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {channels.map((ch, idx) => (
                        <a
                            key={idx}
                            href={ch.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className={`w-12 h-12 rounded-2xl ${ch.accent} flex items-center justify-center mb-4`}>
                                    <ch.icon size={22} />
                                </div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">{ch.title}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{ch.desc}</p>
                            </div>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                {ch.action} →
                            </span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Interactive Contact Form */}
            <section className="py-16 px-6 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl">
                    <div className="text-center mb-8">
                        <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                            Send A Message
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight mt-1">
                            Direct Support Inbox
                        </h2>
                    </div>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-12 text-center space-y-3"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center mx-auto">
                                <CheckCircle2 size={36} />
                            </div>
                            <h3 className="text-2xl font-[900] text-slate-900 dark:text-white">Message Dispatched!</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                Thank you for contacting DevDash. A confirmation ticket has been routed to our support engineer.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Alex Developer"
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="alex@domain.com"
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                    Subject Category
                                </label>
                                <select
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="General Question">General Question</option>
                                    <option value="Platform Sync Issue">Platform Sync Issue (LeetCode/GitHub)</option>
                                    <option value="DevScore Calculation">DevScore™ Inquiries</option>
                                    <option value="AI Resume / HR Outreach">AI Resume &amp; HR Outreach</option>
                                    <option value="Recruiter Enterprise Access">Recruiter &amp; Enterprise Access</option>
                                    <option value="Security / Bug Bounty">Security / Bug Bounty Report</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                    Detailed Message *
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Explain how we can help you..."
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Send size={15} />
                                <span>Send Support Message</span>
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default ContactPage;
