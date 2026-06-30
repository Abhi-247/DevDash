import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PublicNavbar = ({ onOpenAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isAboutPage = location.pathname === '/about';

    const navItems = [
        { label: 'Features', path: isAboutPage ? '/#features' : '#features' },
        { label: 'About', path: '/about', active: isAboutPage },
        { label: 'Blog', path: isAboutPage ? '/#blog' : '#blog' }
    ];

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled 
                ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 shadow-sm py-4' 
                : 'bg-transparent py-6 border-b border-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
                {/* Logo */}
                <div 
                    onClick={handleLogoClick}
                    className="flex items-center gap-2.5 cursor-pointer group"
                >
                    <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-300">
                        <Code2 size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-2xl font-[900] tracking-tight text-slate-805 dark:text-white">
                        Dev<span className="text-indigo-600 dark:text-indigo-400">Dash</span>
                    </span>
                </div>
                
                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <a 
                            key={item.label} 
                            href={item.path} 
                            className={`relative text-[15px] font-bold tracking-wide transition-colors duration-300 py-1.5 ${
                                item.active 
                                ? 'text-indigo-600 dark:text-indigo-400' 
                                : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            {item.label}
                            {item.active && (
                                <motion.span 
                                    layoutId="activeNavIndicator" 
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" 
                                />
                            )}
                        </a>
                    ))}
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-5">
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300"
                        title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    <button 
                        onClick={() => onOpenAuth('login')}
                        className="text-[15px] font-bold text-slate-600 hover:text-indigo-600 dark:text-slate-305 dark:hover:text-white transition-colors py-2 px-3"
                    >
                        Sign in
                    </button>
                    <button 
                        onClick={() => onOpenAuth('signup')}
                        className="group flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-300 hover:shadow-lg hover:shadow-indigo-600/25 active:scale-95 cursor-pointer"
                    >
                        Get Started
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-2">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-all"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 shadow-xl overflow-hidden md:hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-5">
                            {navItems.map((item) => (
                                <a 
                                    key={item.label} 
                                    href={item.path} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-lg font-bold transition-colors py-1 ${
                                        item.active 
                                        ? 'text-indigo-600 dark:text-indigo-400' 
                                        : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <hr className="border-slate-100 dark:border-slate-800" />
                            <div className="flex flex-col gap-3 pt-2">
                                <button 
                                    onClick={() => { setIsMenuOpen(false); onOpenAuth('login'); }}
                                    className="w-full text-center py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Sign in
                                </button>
                                <button 
                                    onClick={() => { setIsMenuOpen(false); onOpenAuth('signup'); }}
                                    className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/10 transition-colors"
                                >
                                    Create Free Account
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default PublicNavbar;
