import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Code2, X, ArrowRight, Sparkles } from 'lucide-react';
import logoImg from '../assets/logodevdash.png';
import Loader from '../components/Loader';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

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

    const FormCard = (
        <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-md p-8 sm:p-10 border border-slate-100 dark:border-slate-800/80 relative transition-all duration-300">
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
                <img src={logoImg} alt="DevDash Logo" className="h-12 w-auto object-contain" />
            </div>

            <h2 className="text-2xl font-[900] text-center text-slate-800 dark:text-white tracking-tight mb-1.5">Create Account</h2>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Join DevDash and build your developer showcase</p>

            {error && (
                <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-bold p-3.5 rounded-xl mb-6 text-center border border-rose-100 dark:border-rose-900/30">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Username</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4.5 w-4.5" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                            placeholder="alexdeveloper"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4.5 w-4.5" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                            placeholder="developer@email.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4.5 w-4.5" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                            placeholder="At least 6 characters"
                            required
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-600/20 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading ? <Loader /> : (
                            <>
                                Create Free Account
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Already have an account? </span>
                {isModal ? (
                    <button 
                        onClick={onSwitchToLogin} 
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold transition-colors ml-1 cursor-pointer"
                    >
                        Sign in
                    </button>
                ) : (
                    <Link 
                        to="/login" 
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold transition-colors ml-1"
                    >
                        Sign in
                    </Link>
                )}
            </div>
        </div>
    );

    if (isModal) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-md p-4 animate-fade-in">
                {FormCard}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans relative selection:bg-indigo-500 selection:text-white">
            {/* Ambient Blur Circles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
            </div>

            <PublicNavbar />

            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
                {FormCard}
            </main>

            <PublicFooter />
        </div>
    );
};

export default Signup;
