import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Mail, 
    Lock, 
    User, 
    Code2, 
    X, 
    ArrowRight, 
    Sparkles, 
    ArrowLeft, 
    ShieldCheck, 
    Terminal, 
    CheckCircle2, 
    Flame, 
    Award 
} from 'lucide-react';
import logoImg from '../assets/logodevdash.png';
import Loader from '../components/Loader';

const Signup = ({ isModal = false, onClose, onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/signup`, {
                username: username,
                email: email,
                password: password
            });

            if (isModal) {
                onSwitchToLogin();
            } else {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => (
        <div className="w-full max-w-md space-y-6">
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Create Developer Account
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
                    Start tracking your coding telemetry & ATS match scores
                </p>
            </div>

            {error && (
                <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-center animate-fade-in">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Username
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            placeholder="alexdeveloper"
                            required
                        />
                    </div>
                </div>

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
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Password
                    </label>
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
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-indigo-600/20 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                    {loading ? <Loader /> : (
                        <>
                            <span>Create Free Account</span>
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </form>

            <div className="pt-2 text-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Already have an account? </span>
                {isModal ? (
                    <button
                        onClick={onSwitchToLogin}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold ml-1 cursor-pointer"
                    >
                        Sign in
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold ml-1"
                    >
                        Sign in
                    </Link>
                )}
            </div>
        </div>
    );

    // Main Full-Page Split Screen View (Used for both route and full-screen modal)
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

            {/* Left Half: Feature Showcase & Engineering Highlights */}
            <div className="lg:col-span-6 xl:col-span-7 relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/60 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800/80">
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

                {/* Middle Content */}
                <div className="relative z-10 my-10 lg:my-0 space-y-6 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                        <Sparkles size={12} className="text-amber-400" />
                        <span>Accelerate Your Technical Career</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.15]">
                        Build a Developer Portfolio That Closes Interviews.
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                        Stop sharing generic resume PDFs. DevDash lets you connect LeetCode, GitHub, and Codeforces to prove your engineering depth with verified live metrics.
                    </p>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                            <span>1-Click Live Platform Sync for LeetCode, GitHub & Codeforces</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                            <span>AI ATS Resume Matcher & Instant Tailored Outreach Pitches</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                            <span>Shareable Developer Public Profile (`devdash.live/u/yourname`)</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Quote */}
                <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 text-slate-400">
                        <ShieldCheck size={14} className="text-indigo-400" />
                        <span>Enterprise Grade Security & Encryption</span>
                    </div>
                    <span>© 2026 DevDash</span>
                </div>
            </div>

            {/* Right Half: Form Container */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-white dark:bg-slate-950 relative">
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

export default Signup;
