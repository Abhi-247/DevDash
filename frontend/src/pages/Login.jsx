import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Code2, X, ArrowRight } from 'lucide-react';
import Loader from '../components/Loader';

const Login = ({ isModal = false, onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={isModal ? "fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-md p-4" : "min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300"}>
            <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] w-full max-w-md p-8 sm:p-10 border border-slate-100 dark:border-slate-800/80 relative transition-colors duration-300">
                {isModal && (
                    <button 
                        onClick={onClose} 
                        className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                )}
                
                <div className="flex justify-center mb-6">
                    <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center text-indigo-650 dark:text-indigo-400 shadow-sm border border-indigo-100/20">
                        <Code2 size={24} strokeWidth={2.5} />
                    </div>
                </div>

                <h2 className="text-2xl font-[900] text-center text-slate-800 dark:text-white tracking-tight mb-1.5">Welcome Back</h2>
                <p className="text-center text-slate-505 dark:text-slate-405 text-sm font-semibold mb-8">Sign in to your DevDash account</p>

                {error && (
                    <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-400 text-xs font-bold p-3.5 rounded-xl mb-6 text-center border border-rose-100 dark:border-rose-900/30">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-black text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4.5 w-4.5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 text-sm font-medium transition-all"
                                placeholder="developer@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4.5 w-4.5" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 text-sm font-medium transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                                type="checkbox" 
                                className="rounded border-slate-350 dark:border-slate-800 text-indigo-650 focus:ring-indigo-500 h-4 w-4 bg-transparent cursor-pointer" 
                            />
                            <span className="text-slate-550 dark:text-slate-400 font-bold">Remember me</span>
                        </label>
                        <button 
                            type="button" 
                            className="text-indigo-650 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-5 cursor-pointer"
                    >
                        {loading ? <Loader /> : (
                            <>
                                Sign In
                                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400">Don't have an account? </span>
                    {isModal ? (
                        <button 
                            onClick={onSwitchToSignup} 
                            className="text-indigo-650 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-black transition-colors ml-1 cursor-pointer"
                        >
                            Sign up free
                        </button>
                    ) : (
                        <Link 
                            to="/signup" 
                            className="text-indigo-650 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-black transition-colors ml-1"
                        >
                            Sign up free
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
