import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, X, ArrowRight, ArrowLeft } from 'lucide-react';
import logoImg from '../assets/logodevdash.png';
import Loader from '../components/Loader';
import GoogleAuthButton from '../components/GoogleAuthButton';

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

    return (
        <div className={`${isModal ? 'fixed inset-0 z-[100]' : 'min-h-screen'} w-full bg-gradient-to-b from-purple-50/50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 flex flex-col items-center justify-center px-4 py-12 transition-colors`}>

            {/* Close button for modal */}
            {isModal && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>
            )}

            {/* Top Nav */}
            <div className="w-full max-w-md flex items-center justify-between mb-10">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <img src={logoImg} alt="DevDash" className="h-8 w-auto object-contain" />
                    <span className="text-xl font-[800] text-slate-900 dark:text-white tracking-tight">
                        Dev<span style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dash</span>
                    </span>
                </Link>
                <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center gap-1.5 transition-colors">
                    <ArrowLeft size={15} />
                    Back to Home
                </Link>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/[0.03] dark:shadow-black/20 p-8 sm:p-10 space-y-6">
                    <div>
                        <h1 className="text-2xl font-[800] text-slate-900 dark:text-white tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
                            Sign in to your developer dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-medium p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-center">
                            {error}
                        </div>
                    )}

                    {/* Quick & Social Login Options */}
                    <div className="space-y-3">
                        <GoogleAuthButton
                            text="Continue with Google"
                            onError={(msg) => setError(msg)}
                            onSuccess={() => {
                                if (isModal && onClose) onClose();
                                navigate('/dashboard');
                            }}
                        />

                        {/* Demo Login */}
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/15 transition-all cursor-pointer"
                        >
                            ⚡ Try Demo Account
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">or sign in with email</span>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-[18px] w-[18px]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 transition-all"
                                    placeholder="developer@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => alert("Demo credentials are: demo@devdash.com / demo12345")}
                                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-[18px] w-[18px]" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                            {loading ? <Loader /> : (
                                <>
                                    <span>Sign In to Account</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-6">
                    Don't have an account?{' '}
                    {isModal ? (
                        <button onClick={onSwitchToSignup} className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer">
                            Sign up free
                        </button>
                    ) : (
                        <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                            Sign up free
                        </Link>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Login;
