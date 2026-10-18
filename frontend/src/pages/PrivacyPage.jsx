import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

const PrivacyPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Header */}
            <section className="pt-32 pb-12 px-6 text-center border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Lock size={14} /> Privacy &amp; Data Security
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-[900] text-slate-900 dark:text-white tracking-tight mb-3">
                        Privacy Policy
                    </h1>
                    <p className="text-xs text-slate-400">
                        Effective Date: October 18, 2026 • Version 2.4
                    </p>
                </div>
            </section>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        1. Our Privacy Philosophy
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        At DevDash, we build tools for developers. Because we are developers ourselves, we respect your digital sovereignty. We do not sell your coding stats, we do not monetize your personal data through third-party ad brokers, and we minimize data collection strictly to what is required to generate your portfolio and DevScore.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        2. Information We Collect
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <li>
                            <strong>Account Information:</strong> When you register, we collect your name, email address, and hashed authentication credentials.
                        </li>
                        <li>
                            <strong>Public Coding Profile Handles:</strong> Usernames you explicitly provide for platforms like LeetCode, GitHub, Codeforces, and HackerRank.
                        </li>
                        <li>
                            <strong>Synced Metric Cache:</strong> Read-only aggregate stats including problem counts, contest ratings, and repository language breakdowns.
                        </li>
                        <li>
                            <strong>HR Outreach Credentials (Optional):</strong> If you configure cold outreach, your 16-character Gmail App Password is encrypted using AES-256 with unique server-side salting. We never store your Google master password.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        3. How We Protect Your Data
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        All web traffic is transmitted via TLS 1.3 encryption. Our database cluster enforces encrypted storage at rest. API tokens and app passwords are protected with envelope encryption and isolated from application logs.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        4. GDPR &amp; CCPA Rights (One-Click Deletion)
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Regardless of your geographical location, you have the right to access, export, or permanently delete your DevDash account and all associated profile sync data at any time from your Account Settings. Upon deletion, all records are permanently expunged within 24 hours.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                        5. Contacting Our Privacy Team
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        If you have questions regarding our data practices or wish to request data verification, contact our Data Protection Officer at <a href="mailto:privacy@devdash.io" className="text-indigo-600 dark:text-indigo-400 font-bold underline">privacy@devdash.io</a>.
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

export default PrivacyPage;
