import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon, Sparkles, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logodevdash.png';

const PublicNavbar = ({ onOpenAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const isAboutPage = location.pathname === '/about';

    const navItems = [
        { label: 'Features', path: isAboutPage ? '/#features' : '#features', id: 'features' },
        { label: 'About', path: '/about', active: isAboutPage, id: 'about' },
        { label: 'Blog', path: isAboutPage ? '/#blog' : '#blog', id: 'blog' }
    ];

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
                    scrolled
                        ? 'py-2.5'
                        : 'py-4 sm:py-5'
                }`}
            >
                {/* Animated gradient top-line accent on scroll */}
                <motion.div
                    initial={false}
                    animate={{ opacity: scrolled ? 1 : 0, scaleX: scrolled ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-center"
                />

                {/* Glassmorphism background */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: scrolled ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white/70 dark:bg-slate-950/75 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/40 shadow-[0_4px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-10 flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        onClick={handleLogoClick}
                        className="flex items-center gap-2.5 cursor-pointer group select-none"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className="relative">
                            <img
                                src={logoImg}
                                alt="DevDash Logo"
                                className="h-9 w-auto object-contain transition-transform duration-500 group-hover:rotate-[8deg]"
                            />
                            {/* Soft glow behind logo on hover */}
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150" />
                        </div>
                        <span className="text-[22px] font-[900] tracking-tight text-slate-800 dark:text-white">
                            Dev<span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Dash</span>
                        </span>
                    </motion.div>

                    {/* Desktop Navigation Links */}
                    <nav ref={navRef} className="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-800/30 rounded-2xl px-2 py-1.5 border border-slate-200/40 dark:border-slate-700/30 backdrop-blur-sm">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.path}
                                onMouseEnter={() => setHoveredNav(item.id)}
                                onMouseLeave={() => setHoveredNav(null)}
                                className={`relative text-[13.5px] font-semibold tracking-wide transition-colors duration-300 px-5 py-2 rounded-xl z-10 ${
                                    item.active
                                        ? 'text-indigo-700 dark:text-indigo-300'
                                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                {/* Animated hover pill background */}
                                {hoveredNav === item.id && (
                                    <motion.span
                                        layoutId="navHoverPill"
                                        className="absolute inset-0 bg-white dark:bg-slate-700/60 rounded-xl shadow-sm"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    />
                                )}

                                {/* Active indicator dot */}
                                {item.active && (
                                    <motion.span
                                        layoutId="activeNavDot"
                                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                                    />
                                )}

                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Right Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle - Animated */}
                        <motion.button
                            onClick={toggleTheme}
                            className="relative p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 transition-all duration-300 overflow-hidden"
                            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.9, rotate: 180 }}
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Sun size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, scale: 0, opacity: 0 }}
                                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                        exit={{ rotate: -90, scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Moon size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Sign In */}
                        <button
                            onClick={() => onOpenAuth('login')}
                            className="text-[13.5px] font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                        >
                            Sign in
                        </button>

                        {/* Get Started CTA - Premium animated gradient button */}
                        <motion.button
                            onClick={() => onOpenAuth('signup')}
                            className="group relative flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-[13.5px] transition-all duration-300 overflow-hidden cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-xl" />

                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 blur-xl -z-10 scale-110" />

                            <span className="relative z-10">Get Started</span>
                            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </motion.button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-1.5">
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-all"
                            whileTap={{ scale: 0.9, rotate: 180 }}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>

                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={22} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={22} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Mobile Fullscreen Overlay Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed top-0 right-0 w-[85%] max-w-sm h-full z-50 bg-white dark:bg-slate-950 border-l border-slate-200/60 dark:border-slate-800/60 shadow-2xl md:hidden overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/60">
                                <div className="flex items-center gap-2">
                                    <img src={logoImg} alt="DevDash" className="h-8 w-auto" />
                                    <span className="text-lg font-[900] text-slate-800 dark:text-white">
                                        Dev<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dash</span>
                                    </span>
                                </div>
                                <motion.button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>

                            {/* Drawer Nav Links */}
                            <div className="p-5 space-y-1">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.07 }}
                                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 group ${
                                            item.active
                                                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30'
                                                : 'text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                                    </motion.a>
                                ))}
                            </div>

                            {/* Drawer CTA Section */}
                            <div className="px-5 pt-4 space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <button
                                        onClick={() => { setIsMenuOpen(false); onOpenAuth('login'); }}
                                        className="w-full text-center py-3.5 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Sign in
                                    </button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.42 }}
                                >
                                    <button
                                        onClick={() => { setIsMenuOpen(false); onOpenAuth('signup'); }}
                                        className="w-full text-center py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={16} />
                                        Create Free Account
                                    </button>
                                </motion.div>
                            </div>

                            {/* Drawer Footer Decoration */}
                            <div className="absolute bottom-0 left-0 w-full p-5">
                                <div className="text-center text-[11px] text-slate-400 dark:text-slate-600 font-medium">
                                    Built for developers who ship
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default PublicNavbar;
