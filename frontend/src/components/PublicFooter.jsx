import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail, Send, Code2, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicFooter = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        }
    };

    const footerSections = [
        {
            title: 'Product',
            links: [
                { label: 'Features', href: '#features' },
                { label: 'Developer Link', href: '#' },
                { label: 'Integrations', href: '#' },
                { label: 'Pricing Plan', href: '#' }
            ]
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', onClick: () => navigate('/about') },
                { label: 'Developer Blog', href: '#blog' },
                { label: 'Careers', badge: 'Hiring', href: '#' },
                { label: 'Support & Contact', href: '#' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { label: 'Documentation', href: '#' },
                { label: 'Community Forum', href: '#' },
                { label: 'Open Source', href: '#' },
                { label: 'Status Updates', href: '#' }
            ]
        }
    ];

    const socials = [
        { Icon: Twitter, href: 'https://twitter.com', color: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/5' },
        { Icon: Github, href: 'https://github.com', color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50' },
        { Icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5' }
    ];

    return (
        <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80 pt-20 pb-10 transition-colors duration-300">
            {/* Top decorative gradient blur */}
            <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8 pb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div 
                            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); }}
                            className="flex items-center gap-2.5 cursor-pointer group w-fit"
                        >
                            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-600/10 group-hover:scale-105 transition-transform duration-300">
                                <Code2 size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-2xl font-[900] tracking-tight text-slate-800 dark:text-white">
                                Dev<span className="text-indigo-600 dark:text-indigo-400">Dash</span>
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed max-w-sm">
                            The ultimate hub for developers. Connect your profiles, compile your achievements, and share your validated coding portfolio with one single link.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {socials.map(({ Icon, href, color }, idx) => (
                                <a 
                                    key={idx} 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`h-10 w-10 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 transition-all duration-300 ${color}`}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {footerSections.map((section, index) => (
                            <div key={index} className="space-y-5">
                                <h4 className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3.5">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx} className="flex items-center">
                                            {link.onClick ? (
                                                <button 
                                                    onClick={link.onClick}
                                                    className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer text-left"
                                                >
                                                    {link.label}
                                                </button>
                                            ) : (
                                                <a 
                                                    href={link.href} 
                                                    className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            )}
                                            {link.badge && (
                                                <span className="ml-2.5 px-2 py-0.5 text-[10px] font-black bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md uppercase tracking-wider">
                                                    {link.badge}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter Column */}
                    <div className="lg:col-span-1 space-y-5">
                        <h4 className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Stay Updated
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                            Subscribe to get our weekly developer stats, articles, and product releases.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative mt-2">
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="developer@email.com"
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                            />
                            <button 
                                type="submit"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
                                aria-label="Subscribe"
                            >
                                <Send size={13} />
                            </button>
                        </form>
                        {subscribed && (
                            <motion.p 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[11px] font-bold text-green-500 dark:text-green-400 mt-1"
                            >
                                Thanks for subscribing! 🚀
                            </motion.p>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500">
                    <div className="flex items-center gap-2">
                        <span>© 2026 DevDash. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-slate-650 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-650 dark:hover:text-white transition-colors">Terms of Service</a>
                        <span className="flex items-center gap-1.5 select-none">
                            Made with 💙 for developers
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
