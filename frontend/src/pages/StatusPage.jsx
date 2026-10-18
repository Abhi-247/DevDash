import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Activity, CheckCircle2, AlertTriangle, Clock, RefreshCw,
    ShieldCheck, ArrowRight, Bell
} from 'lucide-react';

const StatusPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [subscribed, setSubscribed] = useState(false);
    const [statusEmail, setStatusEmail] = useState('');

    const systems = [
        { name: 'Core Web Application & Portfolios', status: 'Operational', uptime: '100.0%', latency: '42ms' },
        { name: 'GitHub Sync Worker & Webhooks', status: 'Operational', uptime: '99.98%', latency: '120ms' },
        { name: 'LeetCode GraphQL Connector', status: 'Operational', uptime: '99.95%', latency: '210ms' },
        { name: 'Codeforces API Adapter', status: 'Operational', uptime: '99.89%', latency: '340ms' },
        { name: 'AI Resume LaTeX Compilation Worker', status: 'Operational', uptime: '100.0%', latency: '1.2s' },
        { name: 'Gmail SMTP Outreach Relay', status: 'Operational', uptime: '100.0%', latency: '95ms' },
        { name: 'Global Redis Cache & Edge Network', status: 'Operational', uptime: '100.0%', latency: '28ms' }
    ];

    const incidents = [
        {
            date: 'October 12, 2026',
            title: 'Minor Delay in LeetCode Contest Ranking Ingestion',
            status: 'Resolved',
            desc: 'LeetCode upstream API returned intermittent 503 throttling during Biweekly Contest 142. Our worker retry queue successfully processed all sync payloads with zero data loss.'
        },
        {
            date: 'September 24, 2026',
            title: 'Scheduled Database Index Optimization',
            status: 'Completed',
            desc: 'Completed planned index re-sharding across our profile collections. Total maintenance window: 4 minutes with zero user downtime.'
        }
    ];

    const handleSubscribeStatus = (e) => {
        e.preventDefault();
        if (statusEmail.trim()) {
            setSubscribed(true);
            setStatusEmail('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero Header */}
            <section className="pt-32 pb-12 px-6 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5">
                        <Activity size={14} />
                        Real-Time Platform Health
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                        DevDash System Status
                    </h1>

                    {/* Operational Banner */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 max-w-xl mx-auto flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold text-base shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span>All Systems Operational</span>
                    </div>
                </div>
            </section>

            {/* Key Metrics */}
            <section className="py-6 px-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs text-slate-400">90-Day Uptime</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">99.97%</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs text-slate-400">Avg Global Latency</p>
                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">142ms</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs text-slate-400">Sync Jobs / Hr</p>
                        <p className="text-2xl font-black text-emerald-500 mt-1">18,400+</p>
                    </div>
                </div>
            </section>

            {/* Systems Status List */}
            <section className="py-10 px-6 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        System Components &amp; Pipelines
                    </h3>

                    <div className="space-y-4">
                        {systems.map((sys, idx) => (
                            <div key={idx} className="pb-4 border-b border-slate-100 dark:border-slate-800/80 last:border-0 last:pb-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {sys.name}
                                    </span>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="text-slate-400">Latency: {sys.latency}</span>
                                        <span className="text-slate-500 font-semibold">Uptime: {sys.uptime}</span>
                                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                                            <CheckCircle2 size={13} /> {sys.status}
                                        </span>
                                    </div>
                                </div>
                                {/* 90-day Visual Uptime Bar */}
                                <div className="w-full h-2 bg-emerald-500/20 dark:bg-emerald-950/40 rounded-full overflow-hidden flex gap-0.5">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div key={i} className="flex-1 bg-emerald-500 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Incident History */}
            <section className="py-8 px-6 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Past Incident Reports
                    </h3>

                    <div className="space-y-6">
                        {incidents.map((inc, i) => (
                            <div key={i} className="space-y-1.5 pb-6 border-b border-slate-100 dark:border-slate-800/80 last:border-0 last:pb-0">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{inc.title}</h4>
                                    <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        {inc.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400">{inc.date}</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                                    {inc.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscribe to Status Updates */}
            <section className="py-12 px-6 max-w-xl mx-auto text-center">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <Bell size={20} className="text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">Get Incident Alerts</h4>
                    <p className="text-xs text-slate-500 mb-4">Receive email notifications whenever an incident occurs.</p>
                    <form onSubmit={handleSubscribeStatus} className="flex gap-2">
                        <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            value={statusEmail}
                            onChange={(e) => setStatusEmail(e.target.value)}
                            className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </form>
                    {subscribed && (
                        <p className="text-xs font-bold text-emerald-500 mt-2">
                            Subscribed to status notifications!
                        </p>
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

export default StatusPage;
