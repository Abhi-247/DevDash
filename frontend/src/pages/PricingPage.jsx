import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Check, Sparkles, Zap, ShieldCheck, HelpCircle,
    ChevronDown, ArrowRight, Star, HeartHandshake, Shield
} from 'lucide-react';

const PricingPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [annual, setAnnual] = useState(true);
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const tiers = [
        {
            name: 'Hobbyist',
            tagline: 'Essential developer identity for students & beginners.',
            price: '$0',
            period: 'forever free',
            popular: false,
            cta: 'Start Free Today',
            features: [
                'Connect up to 4 coding platforms',
                'Standard DevScore™ calculation',
                'Custom devdash.me/u/handle link',
                'Standard resume export (PDF)',
                'Sync updates every 24 hours',
                'Community Discord support'
            ],
            missing: [
                'AI resume tailoring',
                'Automated HR cold email outreach',
                'Custom domain mapping',
                'Recruiter analytics'
            ]
        },
        {
            name: 'Pro Developer',
            tagline: 'Advanced automation, AI resumes, and HR cold outreach.',
            price: annual ? '$6' : '$8',
            period: 'per month',
            popular: true,
            cta: 'Claim Pro Membership',
            features: [
                'Unlimited platform connections (all 10+)',
                'Real-time GraphQL sync every 4 hours',
                'AI Resume Builder with ATS scoring',
                '150 HR Outreach emails / month via Gmail SMTP',
                'Verified DevScore™ Badge on public profile',
                'Custom QR code badge download',
                'Recruiter view & profile click analytics',
                'Remove DevDash branding'
            ],
            missing: []
        },
        {
            name: 'Recruiter & Team',
            tagline: 'Direct talent sourcing with verified candidate metrics.',
            price: annual ? '$39' : '$49',
            period: 'per month',
            popular: false,
            cta: 'Start Recruiter Trial',
            features: [
                'Search 10,000+ verified developers',
                'Filter candidates by DevScore & languages',
                'Batch export candidate skill dossiers',
                'Direct candidate messaging pipeline',
                'REST API read access for internal ATS',
                'Dedicated account manager'
            ],
            missing: []
        }
    ];

    const faqs = [
        {
            q: 'Is DevDash really free to use?',
            a: 'Yes! The Hobbyist plan is 100% free forever with no credit card required. You can connect your LeetCode, GitHub, and Codeforces profiles and share your devdash.me link without paying a dime.'
        },
        {
            q: 'How does the automated HR outreach work?',
            a: 'On the Pro tier, you can link your personal Gmail App Password. DevDash sends personalized cold emails with your verified DevScore portfolio directly through your SMTP relay, ensuring maximum deliverability without landing in spam.'
        },
        {
            q: 'Can I cancel or switch my plan at any time?',
            a: 'Yes, absolutely. You can upgrade, downgrade, or cancel your subscription at any time with a single click from your Account Settings. If you cancel, you will retain your Pro benefits until the end of your billing cycle.'
        },
        {
            q: 'How is DevScore™ protected from cheating?',
            a: 'DevDash cross-verifies commit histories, problem difficulty ratings, and contest percentiles using anti-cheat normalization. Irregular spikes or duplicated repositories are filtered out.'
        },
        {
            q: 'Do you offer student discounts?',
            a: 'Yes! Verified university students get 50% off the Pro plan. Simply contact our support team from your .edu email address.'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white overflow-x-hidden w-full transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5"
                    >
                        <Zap size={14} />
                        Transparent Pricing
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        Invest In Your <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Engineering Career
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        Simple, fair pricing with zero hidden fees. Upgrade when you are ready to accelerate your tech job search.
                    </motion.p>

                    {/* Annual Billing Toggle */}
                    <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-full">
                        <button
                            onClick={() => setAnnual(false)}
                            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                                !annual ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                                annual ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <span className="whitespace-nowrap">Annual Billing</span>
                            <span className="px-1.5 sm:px-2 py-0.5 text-[10px] font-black rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
                                Save 25%
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards Grid */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {tiers.map((t, idx) => (
                        <div
                            key={t.name}
                            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                                t.popular
                                    ? 'bg-white dark:bg-slate-900 border-2 border-indigo-600 shadow-2xl shadow-indigo-500/10 scale-100 lg:-translate-y-2'
                                    : 'bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                            {t.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                                    ★ Most Popular
                                </div>
                            )}

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-[900] text-slate-900 dark:text-white">{t.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[220px]">
                                            {t.tagline}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-1 my-6">
                                    <span className="text-5xl font-[900] text-slate-900 dark:text-white">{t.price}</span>
                                    <span className="text-xs font-semibold text-slate-400">/{t.period}</span>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                                    {t.features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            <Check size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                    {t.missing && t.missing.map((m, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-400 dark:text-slate-600 line-through">
                                            <span className="w-4 shrink-0 text-center">•</span>
                                            <span>{m}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 mt-6">
                                <button
                                    onClick={() => setAuthModal('signup')}
                                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                                        t.popular
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white'
                                    }`}
                                >
                                    <span>{t.cta}</span>
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Guarantee Callout */}
            <section className="py-10 px-6 max-w-4xl mx-auto">
                <div className="bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <HeartHandshake size={28} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            14-Day Money Back Guarantee on Pro
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                            If DevDash Pro doesn't save you hours managing portfolios and applying to companies, let us know within 14 days for a full refund. No questions asked.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="py-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tight mt-1">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
                        >
                            <button
                                onClick={() => toggleFaq(i)}
                                className="w-full p-5 text-left flex justify-between items-center font-bold text-sm text-slate-900 dark:text-white cursor-pointer"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown
                                    size={18}
                                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                                    {faq.a}
                                </div>
                            )}
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

export default PricingPage;
