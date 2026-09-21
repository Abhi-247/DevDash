import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X, Key, ExternalLink, ShieldCheck } from 'lucide-react';
import Loader from './Loader';

const GoogleAuthButton = ({
    text = "Continue with Google",
    onError,
    onSuccess,
    className = ""
}) => {
    const [loading, setLoading] = useState(false);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [tempClientId, setTempClientId] = useState('');
    const googleBtnContainerRef = useRef(null);
    const tokenClientRef = useRef(null);
    const navigate = useNavigate();

    // Check environment variable or runtime custom client id
    const activeClientId = tempClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

    // Handle token from Google verification endpoint
    const handleGoogleAuthPayload = async (payload) => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const res = await axios.post(
                `${apiUrl}/user/google-auth`,
                payload,
                { withCredentials: true }
            );

            if (res.data?.jwtToken) {
                localStorage.setItem('token', res.data.jwtToken);
            }
            if (res.data?.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }
            localStorage.setItem('recruiter_demo_mode', 'false');

            if (onSuccess) {
                onSuccess(res.data);
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Google auth backend error:', err);
            const msg = err.response?.data?.message || 'Google authentication failed. Please try again.';
            if (onError) onError(msg);
        } finally {
            setLoading(false);
        }
    };

    // Initialize Google Identity Services (GIS)
    useEffect(() => {
        if (!activeClientId) return;

        const setupGoogle = () => {
            if (!window.google?.accounts) return;

            try {
                // 1. Initialize ID Token client (One Tap & rendered button)
                window.google.accounts.id.initialize({
                    client_id: activeClientId,
                    callback: (credentialResponse) => {
                        if (credentialResponse?.credential) {
                            handleGoogleAuthPayload({ credential: credentialResponse.credential });
                        }
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                // Render official Google button into container
                if (googleBtnContainerRef.current) {
                    googleBtnContainerRef.current.innerHTML = '';
                    window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
                        type: 'standard',
                        theme: 'outline',
                        size: 'large',
                        width: 380,
                        text: 'continue_with',
                        shape: 'rectangular',
                        logo_alignment: 'left',
                    });
                }

                // 2. Initialize OAuth2 Token Client (opens real Google Account popup on custom click)
                if (window.google?.accounts?.oauth2) {
                    tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
                        client_id: activeClientId,
                        scope: 'email profile openid',
                        callback: (tokenResponse) => {
                            if (tokenResponse?.access_token) {
                                handleGoogleAuthPayload({ accessToken: tokenResponse.access_token });
                            }
                        },
                    });
                }
            } catch (err) {
                console.warn('Google Identity Services init failed:', err);
            }
        };

        if (window.google?.accounts) {
            setupGoogle();
        } else {
            const timer = setInterval(() => {
                if (window.google?.accounts) {
                    clearInterval(timer);
                    setupGoogle();
                }
            }, 300);
            return () => clearInterval(timer);
        }
    }, [activeClientId]);

    const handleButtonClick = () => {
        if (!activeClientId) {
            setShowConfigModal(true);
            return;
        }

        // Trigger real Google OAuth popup
        if (tokenClientRef.current) {
            tokenClientRef.current.requestAccessToken({ prompt: 'select_account' });
            return;
        }

        // Fallback to rendered button click or prompt
        if (googleBtnContainerRef.current) {
            const btn = googleBtnContainerRef.current.querySelector('div[role="button"]') || googleBtnContainerRef.current.querySelector('button');
            if (btn) {
                btn.click();
                return;
            }
        }

        if (window.google?.accounts?.id) {
            window.google.accounts.id.prompt();
        } else {
            setShowConfigModal(true);
        }
    };

    return (
        <>
            {/* Hidden container for official Google Identity Services button */}
            <div ref={googleBtnContainerRef} className="hidden" aria-hidden="true" />

            {/* Custom DevDash Styled Google Button */}
            <button
                type="button"
                onClick={handleButtonClick}
                disabled={loading}
                className={`w-full relative flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer border bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-sm hover:shadow dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-100 dark:border-slate-700 disabled:opacity-60 ${className}`}
            >
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span>{text}</span>
                    </>
                )}
            </button>

            {/* Modal shown if Google Client ID is missing */}
            {showConfigModal && (
                <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                                        Google Client ID Required
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Google requires a registered OAuth Client ID to authenticate
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowConfigModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            To open the real Google account picker, enter your Google OAuth Client ID below or add it to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono">frontend/.env</code> as <code className="font-mono">VITE_GOOGLE_CLIENT_ID</code>.
                        </p>

                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <Key size={14} className="text-slate-400" />
                                Google OAuth Client ID
                            </label>
                            <input
                                type="text"
                                value={tempClientId}
                                onChange={(e) => setTempClientId(e.target.value.trim())}
                                placeholder="xxxx-xxxx.apps.googleusercontent.com"
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    if (tempClientId) {
                                        setShowConfigModal(false);
                                    }
                                }}
                                disabled={!tempClientId}
                                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                            >
                                Connect & Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowConfigModal(false)}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GoogleAuthButton;
