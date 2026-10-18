import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import { FileText, Shield, AlertCircle } from 'lucide-react';

const TermsPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Header */}
            <section className="pt-32 pb-12 px-6 text-center border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <FileText size={14} /> Legal Agreement
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-[900] text-slate-900 dark:text-white tracking-tight mb-3">
                        Terms of Service
                    </h1>
                    <p className="text-xs text-slate-400">
                        Last Updated: October 18, 2026
                    </p>
                </div>
            </section>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        By accessing, browsing, or creating an account on DevDash ("Service", "Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you must discontinue your use of DevDash immediately.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        2. Permitted Use &amp; Developer Conduct
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        DevDash is intended for software developers and engineering recruiters. You agree not to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <li>Falsify coding credentials, problem-solving counts, or contest ratings.</li>
                        <li>Use automated scripts to overload DevDash public portfolio endpoints.</li>
                        <li>Use the HR Outreach SMTP tool to send unsolicited commercial spam, phishing, or abusive messages.</li>
                        <li>Attempt to reverse-engineer or compromise the DevScore calculation infrastructure.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        3. Third-Party Platform APIs
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        DevDash connects with third-party services including GitHub, LeetCode, Codeforces, HackerRank, and CodeChef. DevDash is not affiliated with, endorsed by, or sponsored by these entities. Service availability depends partly on third-party uptime and rate-limits.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        4. Intellectual Property
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        You retain full copyright and ownership of any original code, project descriptions, and resumes you generate or host on DevDash. DevDash owns the DevScore™ trademark, logo, visual layout, and proprietary scoring algorithms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        5. Termination &amp; Account Closure
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        You may terminate your account at any time via your user dashboard. We reserve the right to suspend accounts that violate acceptable use or attempt malicious platform manipulation.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        6. Contact Us
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        For questions regarding legal terms, licensing, or enterprise agreements, contact <a href="mailto:legal@devdash.io" className="text-indigo-600 dark:text-indigo-400 font-bold underline">legal@devdash.io</a>.
                    </p>
                </section>
            </div>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default TermsPage;
