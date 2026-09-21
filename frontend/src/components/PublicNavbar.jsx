import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Menu, X, ArrowRight, Sun, Moon, Sparkles, ChevronRight, ChevronDown,
    Link2, BarChart3, FileText, Mail, FolderKanban, Target, Globe, Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logodevdash.png';

/* ── Feature items for the mega dropdown ── */
const featureItems = [
    {
        icon: Link2,
        label: 'Coding Profile Sync',
        desc: 'Connect LeetCode, GitHub, Codeforces & more in one click',
        color: '#6366f1',
        bg: 'rgba(99,102,241,0.08)',
    },
    {
        icon: Zap,
        label: 'DevScore™ Algorithm',
        desc: 'Auto-calculated developer ranking out of 2,000',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.08)',
    },
    {
        icon: FileText,
        label: 'AI Resume & ATS Builder',
        desc: 'Generate optimized, recruiter-ready resumes instantly',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.08)',
    },
    {
        icon: Mail,
        label: 'HR Outreach CRM',
        desc: 'Automate cold emails with Gmail SMTP & track responses',
        color: '#ec4899',
        bg: 'rgba(236,72,153,0.08)',
    },
    {
        icon: FolderKanban,
        label: 'Projects & Systems',
        desc: 'Showcase repositories with live tech stack detection',
        color: '#14b8a6',
        bg: 'rgba(20,184,166,0.08)',
    },
    {
        icon: BarChart3,
        label: 'Developer Analytics',
        desc: 'Track growth, contributions & coding activity over time',
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.08)',
    },
    {
        icon: Globe,
        label: 'Public Portfolio',
        desc: 'Shareable developer profile with a single link',
        color: '#10b981',
        bg: 'rgba(16,185,129,0.08)',
    },
    {
        icon: Target,
        label: 'Goals & Milestones',
        desc: 'Set targets and track your progress to stay on track',
        color: '#f97316',
        bg: 'rgba(249,115,22,0.08)',
    },
];

const PublicNavbar = ({ onOpenAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);
    const [mobileShowFeatures, setMobileShowFeatures] = useState(false);
    const featuresRef = useRef(null);
    const featuresTimer = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    // Close features dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (featuresRef.current && !featuresRef.current.contains(e.target)) {
                setShowFeatures(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFeaturesEnter = () => {
        clearTimeout(featuresTimer.current);
        setShowFeatures(true);
    };
    const handleFeaturesLeave = () => {
        featuresTimer.current = setTimeout(() => setShowFeatures(false), 200);
    };

    const isAboutPage = location.pathname === '/about';

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <style>{`
                /* ── PUBLIC NAVBAR ──────────────────────────────────── */
                .pub-navbar-wrap {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 50;
                    padding: 16px 20px;
                    transition: padding 0.5s cubic-bezier(0.22,1,0.36,1);
                }
                .pub-navbar-wrap.scrolled { padding: 10px 20px; }
                @media (min-width: 640px) {
                    .pub-navbar-wrap { padding: 20px 32px; }
                    .pub-navbar-wrap.scrolled { padding: 10px 32px; }
                }

                .pub-navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 1200px;
                    margin: 0 auto;
                    height: 56px;
                    padding: 0 24px;
                    border-radius: 100px;
                    background: rgba(255,255,255, 0.92);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(0,0,0,0.04);
                    box-shadow: 0 2px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02);
                    transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
                }
                .dark .pub-navbar {
                    background: rgba(15,18,30,0.88);
                    border-color: rgba(255,255,255,0.06);
                    box-shadow: 0 2px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04);
                }
                .pub-navbar-wrap.scrolled .pub-navbar {
                    box-shadow: 0 4px 30px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03);
                }
                .dark .pub-navbar-wrap.scrolled .pub-navbar {
                    box-shadow: 0 4px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05);
                }

                /* Logo */
                .pub-nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    cursor: pointer;
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .pub-nav-logo img {
                    height: 30px;
                    width: auto;
                    object-fit: contain;
                    transition: transform 0.4s ease;
                }
                .pub-nav-logo:hover img { transform: rotate(6deg) scale(1.05); }
                .pub-nav-logo-text {
                    font-size: 20px;
                    font-weight: 900;
                    letter-spacing: -0.5px;
                    color: #1e293b;
                }
                .dark .pub-nav-logo-text { color: #f1f5f9; }
                .pub-nav-logo-accent {
                    background: linear-gradient(135deg, #6366f1, #7c3aed);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* Center pill nav */
                .pub-nav-pill {
                    display: none;
                    align-items: center;
                    gap: 0;
                    background: transparent;
                    border: none;
                    border-radius: 100px;
                    padding: 4px 5px;
                }
                .dark .pub-nav-pill {
                    background: transparent;
                    border-color: transparent;
                }
                @media (min-width: 768px) {
                    .pub-nav-pill { display: inline-flex; }
                }
                .pub-nav-pill-link {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 8px 20px;
                    border-radius: 100px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #475569;
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                    background: transparent;
                    border: none;
                    white-space: nowrap;
                }
                .pub-nav-pill-link:hover { color: #1e293b; }
                .pub-nav-pill-link.active { color: #6366f1; }
                .dark .pub-nav-pill-link { color: #94a3b8; }
                .dark .pub-nav-pill-link:hover { color: #e2e8f0; }
                .dark .pub-nav-pill-link.active { color: #a5b4fc; }
                .pub-nav-pill-link .chevron-icon {
                    transition: transform 0.25s ease;
                }
                .pub-nav-pill-link.features-open .chevron-icon {
                    transform: rotate(180deg);
                }

                /* ── FEATURES MEGA DROPDOWN ──────────────────────────── */
                .pub-features-anchor {
                    position: relative;
                }
                .pub-features-dropdown {
                    position: absolute;
                    top: calc(100% + 20px);
                    left: 50%;
                    transform: translateX(-50%);
                    width: 620px;
                    background: white;
                    border: 1px solid #ebebef;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02);
                    padding: 10px;
                    z-index: 100;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4px;
                }
                .dark .pub-features-dropdown {
                    background: #141625;
                    border-color: rgba(255,255,255,0.06);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
                }
                /* Arrow pointer centered under Features */
                .pub-features-dropdown::before {
                    content: '';
                    position: absolute;
                    top: -6px;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-left: 1px solid #ebebef;
                    border-top: 1px solid #ebebef;
                    border-radius: 3px 0 0 0;
                }
                .dark .pub-features-dropdown::before {
                    background: #141625;
                    border-color: rgba(255,255,255,0.06);
                }
                /* Invisible hover bridge to prevent flickering */
                .pub-features-dropdown::after {
                    content: '';
                    position: absolute;
                    top: -24px;
                    left: 0;
                    right: 0;
                    height: 24px;
                }

                .pub-feature-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 14px 16px;
                    border-radius: 14px;
                    text-decoration: none;
                    transition: background 0.2s;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    text-align: left;
                    width: 100%;
                }
                .pub-feature-item:hover {
                    background: #f8f7ff;
                }
                .dark .pub-feature-item:hover {
                    background: rgba(99,102,241,0.06);
                }
                .pub-feature-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .pub-feature-label {
                    font-size: 13px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 2px;
                    line-height: 1.3;
                }
                .dark .pub-feature-label { color: #e2e8f0; }
                .pub-feature-desc {
                    font-size: 11.5px;
                    font-weight: 500;
                    color: #94a3b8;
                    line-height: 1.4;
                }
                .dark .pub-feature-desc { color: #64748b; }

                /* Right section */
                .pub-nav-right {
                    display: none;
                    align-items: center;
                    gap: 6px;
                }
                @media (min-width: 768px) {
                    .pub-nav-right { display: flex; }
                }

                .pub-nav-theme-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 9px;
                    border-radius: 50%;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pub-nav-theme-btn:hover { color: #6366f1; background: #f5f5f7; }
                .dark .pub-nav-theme-btn { color: #94a3b8; }
                .dark .pub-nav-theme-btn:hover { color: #a5b4fc; background: rgba(30,34,52,0.6); }

                .pub-nav-signin {
                    padding: 8px 18px;
                    border-radius: 100px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #475569;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pub-nav-signin:hover { color: #1e293b; background: #f5f5f7; }
                .dark .pub-nav-signin { color: #94a3b8; }
                .dark .pub-nav-signin:hover { color: #e2e8f0; background: rgba(30,34,52,0.6); }

                .pub-nav-cta {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 9px 22px;
                    border-radius: 100px;
                    font-size: 13.5px;
                    font-weight: 700;
                    color: white;
                    border: none;
                    cursor: pointer;
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.3s;
                    box-shadow: 0 2px 12px rgba(124,58,237,0.25);
                }
                .pub-nav-cta:hover {
                    transform: scale(1.03);
                    box-shadow: 0 4px 20px rgba(124,58,237,0.35);
                }
                .pub-nav-cta:active { transform: scale(0.97); }
                .pub-nav-cta-bg {
                    position: absolute;
                    inset: 0;
                    border-radius: 100px;
                    background: linear-gradient(135deg, #6366f1, #7c3aed, #6366f1);
                    background-size: 200% 100%;
                    animation: shimmer-cta 3s ease-in-out infinite;
                }
                @keyframes shimmer-cta {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .pub-nav-cta span,
                .pub-nav-cta svg {
                    position: relative;
                    z-index: 1;
                }
                .pub-nav-cta:hover svg { transform: translateX(2px); }
                .pub-nav-cta svg { transition: transform 0.2s; }

                /* Mobile controls */
                .pub-nav-mobile-controls {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                @media (min-width: 768px) {
                    .pub-nav-mobile-controls { display: none; }
                }
                .pub-nav-mobile-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 9px;
                    border-radius: 12px;
                    border: none;
                    background: transparent;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pub-nav-mobile-btn:hover { background: #f1f5f9; color: #1e293b; }
                .dark .pub-nav-mobile-btn { color: #94a3b8; }
                .dark .pub-nav-mobile-btn:hover { background: rgba(30,34,52,0.6); color: #e2e8f0; }

                /* ── MOBILE DRAWER ───────────────────────────────────── */
                .pub-nav-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 40;
                    background: rgba(0,0,0,0.18);
                    backdrop-filter: blur(4px);
                }
                .dark .pub-nav-backdrop { background: rgba(0,0,0,0.4); }

                .pub-nav-drawer {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 85%;
                    max-width: 360px;
                    height: 100%;
                    z-index: 50;
                    background: white;
                    border-left: 1px solid #e8e8ef;
                    box-shadow: -8px 0 30px rgba(0,0,0,0.08);
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }
                .dark .pub-nav-drawer {
                    background: #0c0e1a;
                    border-left-color: rgba(255,255,255,0.05);
                    box-shadow: -8px 0 30px rgba(0,0,0,0.4);
                }

                .pub-nav-drawer-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px;
                    border-bottom: 1px solid #f1f5f9;
                }
                .dark .pub-nav-drawer-header { border-bottom-color: rgba(255,255,255,0.05); }

                .pub-nav-drawer-links {
                    padding: 16px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .pub-nav-drawer-link {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 14px 16px;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 600;
                    color: #334155;
                    text-decoration: none;
                    transition: all 0.2s;
                    cursor: pointer;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                }
                .pub-nav-drawer-link:hover { color: #6366f1; background: #f8fafc; }
                .pub-nav-drawer-link.active { color: #6366f1; background: #eef2ff; }
                .dark .pub-nav-drawer-link { color: #cbd5e1; }
                .dark .pub-nav-drawer-link:hover { color: #a5b4fc; background: rgba(255,255,255,0.03); }
                .dark .pub-nav-drawer-link.active { color: #a5b4fc; background: rgba(99,102,241,0.08); }
                .pub-nav-drawer-link svg { color: #cbd5e1; transition: all 0.2s; }
                .pub-nav-drawer-link:hover svg { color: #6366f1; transform: translateX(2px); }

                /* Mobile features sub-items */
                .pub-nav-mobile-features {
                    padding: 0 20px 12px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .pub-nav-mobile-feature-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border-radius: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s;
                    border: none;
                    background: none;
                    text-align: left;
                    width: 100%;
                }
                .pub-nav-mobile-feature-item:hover { background: #f8f7ff; }
                .dark .pub-nav-mobile-feature-item:hover { background: rgba(99,102,241,0.06); }
                .pub-nav-mobile-feature-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .pub-nav-mobile-feature-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #334155;
                }
                .dark .pub-nav-mobile-feature-label { color: #cbd5e1; }

                .pub-nav-drawer-cta-area {
                    padding: 8px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .pub-nav-drawer-signin-btn {
                    width: 100%;
                    text-align: center;
                    padding: 14px;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #334155;
                    background: transparent;
                    border: 1px solid #e2e8f0;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pub-nav-drawer-signin-btn:hover { background: #f8fafc; }
                .dark .pub-nav-drawer-signin-btn { color: #cbd5e1; border-color: rgba(255,255,255,0.08); }
                .dark .pub-nav-drawer-signin-btn:hover { background: rgba(255,255,255,0.03); }

                .pub-nav-drawer-signup-btn {
                    width: 100%;
                    text-align: center;
                    padding: 14px;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                    background: linear-gradient(135deg, #6366f1, #7c3aed);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    box-shadow: 0 4px 16px rgba(124,58,237,0.2);
                    transition: all 0.2s;
                }
                .pub-nav-drawer-signup-btn:hover { opacity: 0.92; }

                .pub-nav-drawer-footer {
                    margin-top: auto;
                    padding: 20px;
                    text-align: center;
                    font-size: 11px;
                    color: #94a3b8;
                    font-weight: 500;
                }
                .dark .pub-nav-drawer-footer { color: #475569; }

                @media (min-width: 768px) {
                    .pub-nav-backdrop,
                    .pub-nav-drawer { display: none !important; }
                }
            `}</style>

            {/* ===== NAVBAR ===== */}
            <header className={`pub-navbar-wrap ${scrolled ? 'scrolled' : ''}`}>
                <div className="pub-navbar">
                    {/* Logo */}
                    <div className="pub-nav-logo" onClick={handleLogoClick}>
                        <img src={logoImg} alt="DevDash Logo" />
                        <span className="pub-nav-logo-text">
                            Dev<span className="pub-nav-logo-accent">Dash</span>
                        </span>
                    </div>

                    {/* Center Pill Navigation */}
                    <nav className="pub-nav-pill">
                        {/* Features with dropdown */}
                        <div
                            ref={featuresRef}
                            className="pub-features-anchor"
                            onMouseEnter={handleFeaturesEnter}
                            onMouseLeave={handleFeaturesLeave}
                        >
                            <button
                                className={`pub-nav-pill-link ${showFeatures ? 'features-open' : ''}`}
                                onClick={() => setShowFeatures(!showFeatures)}
                            >
                                Features
                                <ChevronDown size={13} className="chevron-icon" />
                            </button>

                            <AnimatePresence>
                                {showFeatures && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                                        transition={{ duration: 0.18, ease: 'easeOut' }}
                                        className="pub-features-dropdown"
                                        onMouseEnter={handleFeaturesEnter}
                                        onMouseLeave={handleFeaturesLeave}
                                    >
                                        {featureItems.map((feat, idx) => (
                                            <a
                                                key={idx}
                                                href="#features"
                                                className="pub-feature-item"
                                                onClick={() => setShowFeatures(false)}
                                            >
                                                <div
                                                    className="pub-feature-icon"
                                                    style={{ background: feat.bg, color: feat.color }}
                                                >
                                                    <feat.icon size={18} />
                                                </div>
                                                <div>
                                                    <div className="pub-feature-label">{feat.label}</div>
                                                    <div className="pub-feature-desc">{feat.desc}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* About */}
                        <a
                            href="/about"
                            className={`pub-nav-pill-link ${isAboutPage ? 'active' : ''}`}
                        >
                            About
                        </a>

                        {/* Blog */}
                        <a
                            href={isAboutPage ? '/#blog' : '#blog'}
                            className="pub-nav-pill-link"
                        >
                            Blog
                        </a>
                    </nav>

                    {/* Right Actions */}
                    <div className="pub-nav-right">
                        <button
                            onClick={toggleTheme}
                            className="pub-nav-theme-btn"
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div key="sun" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                                        <Sun size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="moon" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                                        <Moon size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        <button onClick={() => navigate('/login')} className="pub-nav-signin">
                            Sign in
                        </button>

                        <button onClick={() => navigate('/signup')} className="pub-nav-cta">
                            <div className="pub-nav-cta-bg" />
                            <span>Get Started</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="pub-nav-mobile-controls">
                        <button onClick={toggleTheme} className="pub-nav-mobile-btn">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="pub-nav-mobile-btn" aria-label="Toggle menu">
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={22} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={22} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            {/* ===== MOBILE DRAWER ===== */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="pub-nav-backdrop"
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="pub-nav-drawer"
                        >
                            <div className="pub-nav-drawer-header">
                                <div className="pub-nav-logo">
                                    <img src={logoImg} alt="DevDash" style={{ height: '26px' }} />
                                    <span className="pub-nav-logo-text" style={{ fontSize: '18px' }}>
                                        Dev<span className="pub-nav-logo-accent">Dash</span>
                                    </span>
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="pub-nav-mobile-btn">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="pub-nav-drawer-links">
                                {/* Features accordion on mobile */}
                                <button
                                    className="pub-nav-drawer-link"
                                    onClick={() => setMobileShowFeatures(!mobileShowFeatures)}
                                >
                                    <span>Features</span>
                                    <ChevronDown
                                        size={16}
                                        style={{
                                            transition: 'transform 0.25s',
                                            transform: mobileShowFeatures ? 'rotate(180deg)' : 'none',
                                            color: '#94a3b8'
                                        }}
                                    />
                                </button>

                                <AnimatePresence>
                                    {mobileShowFeatures && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div className="pub-nav-mobile-features">
                                                {featureItems.map((feat, idx) => (
                                                    <a
                                                        key={idx}
                                                        href="#features"
                                                        className="pub-nav-mobile-feature-item"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <div
                                                            className="pub-nav-mobile-feature-icon"
                                                            style={{ background: feat.bg, color: feat.color }}
                                                        >
                                                            <feat.icon size={15} />
                                                        </div>
                                                        <span className="pub-nav-mobile-feature-label">{feat.label}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* About */}
                                <motion.a
                                    href="/about"
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.17 }}
                                    className={`pub-nav-drawer-link ${isAboutPage ? 'active' : ''}`}
                                >
                                    <span>About</span>
                                    <ChevronRight size={16} />
                                </motion.a>

                                {/* Blog */}
                                <motion.a
                                    href={isAboutPage ? '/#blog' : '#blog'}
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.24 }}
                                    className="pub-nav-drawer-link"
                                >
                                    <span>Blog</span>
                                    <ChevronRight size={16} />
                                </motion.a>
                            </div>

                            <div className="pub-nav-drawer-cta-area">
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                                    onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
                                    className="pub-nav-drawer-signin-btn"
                                >
                                    Sign in
                                </motion.button>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                                    onClick={() => { setIsMenuOpen(false); navigate('/signup'); }}
                                    className="pub-nav-drawer-signup-btn"
                                >
                                    <Sparkles size={16} />
                                    Create Free Account
                                </motion.button>
                            </div>

                            <div className="pub-nav-drawer-footer">
                                Built for developers who ship
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default PublicNavbar;
