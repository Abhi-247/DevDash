import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import {
    Heart,
    Target,
    Zap,
} from 'lucide-react';

const AboutPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-650 selection:text-white overflow-x-hidden transition-colors duration-300">
            {/* Navbar */}
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-indigo-650 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-4"
                    >
                        About DevDash
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[36px] md:text-[56px] font-[900] text-slate-850 dark:text-white leading-[1.1] tracking-tight mb-6"
                    >
                        We're building the <span className="text-indigo-600 dark:text-indigo-400">developer identity</span> layer
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 font-bold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                    >
                        DevDash brings all your coding profiles, stats, and achievements into one unified dashboard — so you can focus on building, not managing links.
                    </motion.p>
                </div>
            </section>

            {/* Mission / Values */}
            <section className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Target,
                            title: "Our Mission",
                            desc: "To give every developer a single source of truth for their coding journey — one link, one dashboard, one identity.",
                            color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20"
                        },
                        {
                            icon: Heart,
                            title: "Why We Care",
                            desc: "We've been developers juggling 10+ profiles. We know the pain. DevDash exists because we built what we wished existed.",
                            color: "text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20"
                        },
                        {
                            icon: Zap,
                            title: "Our Approach",
                            desc: "Fast, minimal, and developer-first. No bloat. Just clean data, beautiful presentation, and zero friction.",
                            color: "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20"
                        },
                    ].map(({ icon: Icon, title, desc, color }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/85 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`p-3 rounded-xl w-fit mb-5 ${color}`}>
                                <Icon size={24} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-[900] text-slate-800 dark:text-white mb-3">{title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* The Story */}
            <section className="py-16 px-6 bg-[#F8FAFC] dark:bg-slate-900/30 transition-colors duration-300">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-emerald-500 dark:text-emerald-450 font-black uppercase tracking-widest text-xs mb-3">Our Story</p>
                        <h2 className="text-3xl md:text-[40px] font-[900] text-slate-800 dark:text-white tracking-tight">
                            From side project to <span className="text-indigo-650 dark:text-indigo-400">platform</span>
                        </h2>
                    </div>
                    <div className="space-y-8">
                        {[
                            {
                                year: "2024",
                                title: "The Problem",
                                text: "As students applying for internships, we realized we were constantly copy-pasting LeetCode stats, GitHub links, and CF ratings into resumes and forms. There had to be a better way."
                            },
                            {
                                year: "2025",
                                title: "The Prototype",
                                text: "We built a simple dashboard that pulled data from GitHub and LeetCode APIs. Friends loved it, and word spread fast within our college coding community."
                            },
                            {
                                year: "2026",
                                title: "DevDash Today",
                                text: "Now supporting 10+ platforms, AI-powered summaries, resume generation, and used by thousands of developers to land interviews and showcase their skills."
                            },
                        ].map(({ year, title, text }, i) => (
                            <motion.div
                                key={year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white text-xs font-[900] flex-shrink-0">
                                        {year.slice(2)}
                                    </div>
                                    {i < 2 && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-805 mt-2"></div>}
                                </div>
                                <div className="pb-8">
                                    <p className="text-[10px] font-black text-indigo-655 dark:text-indigo-400 uppercase tracking-widest mb-1">{year}</p>
                                    <h3 className="text-lg font-[900] text-slate-850 dark:text-white mb-2">{title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-indigo-650 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Team</p>
                        <h2 className="text-3xl md:text-[40px] font-[900] text-slate-800 dark:text-white tracking-tight">
                            Built by <span className="text-indigo-600 dark:text-indigo-400">developers</span>, for developers
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { name: "Abhishek Verma", role: "Founder & Full Stack Developer", avatar: 12, bio: "Passionate about developer tools and clean code." },
                            { name: "Open Position", role: "Frontend Engineer", avatar: 28, bio: "We're looking for someone who loves building beautiful UIs." },
                            { name: "Open Position", role: "Backend Engineer", avatar: 55, bio: "Help us scale DevDash to millions of developers." },
                        ].map(({ name, role, avatar, bio }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#F8FAFC] dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <img 
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`} 
                                    alt={name} 
                                    className="w-16 h-16 rounded-full mx-auto mb-4 border border-slate-200/50 dark:border-slate-800 bg-indigo-50 dark:bg-indigo-900/20" 
                                />
                                <h3 className="text-[16px] font-[900] text-slate-800 dark:text-white mb-1">{name}</h3>
                                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3">{role}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-16 px-6 bg-[#F8FAFC] dark:bg-slate-900/30 transition-colors duration-300">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-indigo-650 dark:text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">Tech Stack</p>
                    <h2 className="text-3xl md:text-[40px] font-[900] text-slate-800 dark:text-white tracking-tight mb-10">
                        What powers <span className="text-indigo-600 dark:text-indigo-400">DevDash</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 
                            'Framer Motion', 'GitHub API', 'LeetCode API', 'Codeforces API',
                            'Vercel', 'JWT Auth', 'REST APIs'
                        ].map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                                className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-650 dark:hover:border-indigo-400 hover:shadow-md transition-all cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Numbers */}
            <section className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: "10+", label: "Platforms Supported" },
                        { value: "10K+", label: "Developers" },
                        { value: "99.9%", label: "Uptime" },
                        { value: "< 2s", label: "Avg Load Time" },
                    ].map(({ value, label }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="text-center p-6"
                        >
                            <p className="text-4xl md:text-5xl font-[900] text-indigo-600 dark:text-indigo-400 mb-2">{value}</p>
                            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 bg-[#F8FAFC] dark:bg-slate-900/30 transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-[40px] font-[900] text-slate-800 dark:text-white tracking-tight mb-4">
                        Want to join the journey?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-base mb-8 max-w-lg mx-auto">
                        Whether you're a developer looking to showcase your work, or you want to contribute to the platform — we'd love to have you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAuthModal('signup')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-[900] text-base shadow-lg shadow-indigo-600/10 cursor-pointer"
                        >
                            Get Started — It's Free
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-8 py-3.5 rounded-xl font-[900] text-base border-2 border-slate-200 dark:border-slate-850 cursor-pointer"
                        >
                            View on GitHub
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <PublicFooter />

            {/* Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default AboutPage;
