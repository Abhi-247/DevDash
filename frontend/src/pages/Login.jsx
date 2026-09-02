import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Mail, 
    Lock, 
    Code2, 
    X, 
    ArrowRight, 
    Sparkles, 
    ArrowLeft, 
    CheckCircle2, 
    Terminal, 
    Zap, 
    ShieldCheck, 
    Flame,
    Award
} from 'lucide-react';
import logoImg from '../assets/logodevdash.png';
import Loader from '../components/Loader';

const Login = ({ isModal = false, onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDemoLogin = async () => {
        setEmail('demo@devdash.com');
        setPassword('demo12345');
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/login`, {
                email: 'demo@devdash.com',
                password: 'demo12345'
            }, {
                withCredentials: true
            });

            if (response.data.jwtToken) {
                localStorage.setItem('token', response.data.jwtToken);
            }
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('recruiter_demo_mode', 'true');
            navigate('/dashboard');
        } catch (err) {
            console.warn('Demo login API returned error, proceeding with instant recruiter demo session:', err);
            const demoUser = {
                name: 'Abhishek Verma',
                username: 'abhishek_dev',
                email: 'abhishek.verma.dev@gmail.com',
                role: 'Full Stack & Systems Engineer'
            };
            localStorage.setItem('user', JSON.stringify(demoUser));
            localStorage.setItem('recruiter_demo_mode', 'true');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError("Please fill out all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

            if (response.data.jwtToken) {
                localStorage.setItem('token', response.data.jwtToken);
            }
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Reusable Form Element
    const renderForm = () => (
        <div className="w-full max-w-md space-y-6">
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
                    Sign in to manage your engineering telemetry & applications
                </p>
            </div>

            {error && (
                <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-center animate-fade-in">
                    {error}
                </div>
            )}

            {/* 1-Click Recruiter Demo Login Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/30 space-y-2">
                <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer group"
                >
                    <Sparkles className="group-hover:rotate-12 transition-transform text-amber-300" size={16} />
                    <span>⚡ One-Click Recruiter Demo Login</span>
                </button>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
                    <span>Email: <strong className="text-slate-200">demo@devdash.com</strong></span>
                    <span>Pass: <strong className="text-slate-200">demo12345</strong></span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Or sign in with email</span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            placeholder="developer@email.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => alert("Demo credentials are: demo@devdash.com / demo12345")}
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-indigo-600/20 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                    {loading ? <Loader /> : (
                        <>
                            <span>Sign In to Account</span>
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </form>

            <div className="pt-2 text-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Don't have an account? </span>
                {isModal ? (
                    <button
                        onClick={onSwitchToSignup}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold ml-1 cursor-pointer"
                    >
                        Sign up free
                    </button>
                ) : (
                    <Link
                        to="/signup"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold ml-1"
                    >
                        Sign up free
                    </Link>
                )}
            </div>
        </div>
    );

    // Main Full-Page Split Screen View (Used for both full route and full-screen modal takeover)
    return (
        <div className={`${isModal ? 'fixed inset-0 z-[100] overflow-y-auto' : 'min-h-screen'} w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white animate-fade-in`}>
            {/* Close button if rendered as modal */}
            {isModal && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            )}

            {/* Left Half: Engineering Brand Showcase & Telemetry */}
            <div className="lg:col-span-6 xl:col-span-7 relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/60 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800/80">
                {/* Ambient Mesh Glows */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-32 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

                {/* Top Nav Brand */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={logoImg} alt="DevDash Logo" className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
                        <span className="text-2xl font-black text-white tracking-tight">DevDash</span>
                    </Link>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Middle Content: Hero Statement & Live Telemetry Card */}
                <div className="relative z-10 my-10 lg:my-0 space-y-6 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                        <Sparkles size={12} className="text-amber-400" />
                        <span>Built for Top-Tier Software Engineers & Recruiters</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.15]">
                        The Unified Command Center for Elite Developers.
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                        Synchronize verified algorithmic challenges from LeetCode, track Git contribution velocity, generate AI-optimized ATS resumes, and automate cold outreach in one sleek platform.
                    </p>

                    {/* Mini Terminal / Telemetry Box */}
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl font-mono-code text-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                            <div className="flex items-center gap-2">
                                <Terminal size={13} className="text-indigo-400" />
                                <span>devdash telemetry status</span>
                            </div>
                            <span className="text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                systems nominal
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <div className="text-slate-400 text-[10px]">ALGORITHMIC DSA</div>
                                <div className="text-emerald-400 font-bold text-sm mt-0.5">648+ Solved</div>
                                <div className="text-[10px] text-slate-500">Knight Rank (1845)</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <div className="text-slate-400 text-[10px]">DEVSCORE™ INDEX</div>
                                <div className="text-amber-400 font-bold text-sm mt-0.5">1,740 / 2,000</div>
                                <div className="text-[10px] text-slate-500">Top 3.2% Global</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <div className="text-slate-400 text-[10px]">GIT CADENCE</div>
                                <div className="text-indigo-400 font-bold text-sm mt-0.5">1,420 Commits</div>
                                <div className="text-[10px] text-slate-500">48-Day Active Streak</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <div className="text-slate-400 text-[10px]">API LATENCY</div>
                                <div className="text-cyan-400 font-bold text-sm mt-0.5">p99 &lt; 45ms</div>
                                <div className="text-[10px] text-slate-500">IMAP Event Worker Active</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Quote */}
                <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 text-slate-400">
                        <ShieldCheck size={14} className="text-indigo-400" />
                        <span>Verified Engineering Portfolio Platform</span>
                    </div>
                    <span>© 2026 DevDash</span>
                </div>
            </div>

            {/* Right Half: Clean Authentication Form */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-white dark:bg-slate-950 relative">
                {/* Mobile brand back button */}
                <div className="w-full max-w-md mb-8 flex items-center justify-between lg:hidden">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logoImg} alt="DevDash Logo" className="h-7 w-auto" />
                        <span className="font-bold text-lg text-slate-900 dark:text-white">DevDash</span>
                    </Link>
                    <Link to="/" className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <ArrowLeft size={13} />
                        Home
                    </Link>
                </div>

                {renderForm()}
            </div>
        </div>
    );
};

export default Login;
