import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    Award, 
    ExternalLink, 
    Github, 
    Globe, 
    MapPin, 
    Share2, 
    Code2, 
    CheckCircle2, 
    Briefcase, 
    Layers, 
    Copy, 
    Check, 
    FileText,
    Trophy,
    Terminal,
    Sparkles
} from 'lucide-react';
import logoImg from '../assets/logodevdash.png';

const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        fetchPublicProfile();
    }, [username]);

    const fetchPublicProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            let endpoint = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/public/${username}`;
            let config = {};

            // If path is /u/me, fetch authenticated profile
            if (username === 'me' || !username) {
                endpoint = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`;
                config = { withCredentials: true };
            }

            const response = await axios.get(endpoint, config);
            setProfile(response.data);
        } catch (err) {
            console.error('Error fetching public profile:', err);
            setError(err.response?.data?.message || 'Profile not found');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyShareLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-slate-100">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-400 font-medium animate-pulse">Loading Developer Profile...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-slate-100 px-4 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mb-4 border border-red-500/20">
                    <Terminal size={32} />
                </div>
                <h1 className="text-2xl font-bold mb-2">Developer Profile Not Found</h1>
                <p className="text-slate-400 max-w-md mb-6">{error || "The developer profile you are looking for does not exist or is private."}</p>
                <Link to="/" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/25">
                    Return to DevDash
                </Link>
            </div>
        );
    }

    const connected = profile.connectedProfiles || {};
    const projects = profile.projects || [];
    const skills = profile.skills || ["React", "Node.js", "TypeScript", "Python", "Tailwind CSS"];
    const devScore = profile.devScore || 1450;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
            {/* Ambient background blur circles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
                {/* Navbar Header for Public View */}
                <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800/80">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={logoImg} alt="DevDash Logo" className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
                        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            DevDash
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowShareModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Share2 size={16} />
                            <span>Share Profile</span>
                        </button>
                        <Link
                            to="/resume"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
                        >
                            <FileText size={16} />
                            <span>View Resume</span>
                        </Link>
                    </div>
                </header>

                {/* Hero Profile Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-10 mb-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="relative">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || profile.username)}&background=6366f1&color=fff&size=128`}
                                    alt={profile.username}
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover ring-4 ring-slate-800 shadow-xl"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white rounded-full p-1.5 shadow-md border-2 border-slate-900" title="Verified Developer">
                                    <CheckCircle2 size={16} />
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                        {profile.fullName || profile.username}
                                    </h1>
                                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-mono border border-slate-700">
                                        @{profile.username}
                                    </span>
                                </div>

                                <p className="text-indigo-400 font-medium text-lg mb-3">
                                    {profile.bio || "Full Stack Developer building modern web applications & platforms."}
                                </p>

                                <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-400">
                                    {profile.location && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={15} className="text-slate-500" />
                                            <span>{profile.location}</span>
                                        </div>
                                    )}
                                    {profile.website && (
                                        <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-indigo-400 transition-colors">
                                            <Globe size={15} className="text-slate-500" />
                                            <span>{profile.website.replace(/^https?:\/\//, '')}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* DevScore Pill */}
                        <div className="w-full md:w-auto bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 p-5 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative group">
                            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                                <Sparkles size={14} className="animate-spin-slow text-amber-400" />
                                <span>DevScore™</span>
                            </div>
                            <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                                {devScore}
                            </div>
                            <span className="text-[11px] text-slate-500 mt-1">Unified Developer Rank</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Connected Coding Platform Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                            <Trophy className="text-amber-400" size={20} />
                            <h2>Coding Platform Cards</h2>
                        </div>

                        {/* LeetCode Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400 font-bold text-xs">
                                        LC
                                    </div>
                                    <span className="font-semibold text-slate-200">LeetCode</span>
                                </div>
                                {connected.leetcode?.connected ? (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Verified</span>
                                ) : (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-500">Not Linked</span>
                                )}
                            </div>

                            {connected.leetcode?.connected ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Total Solved</span>
                                        <span className="font-bold text-white">{connected.leetcode.totalSolved || 345}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
                                        <div className="bg-emerald-500 h-full" style={{ width: '45%' }} title="Easy"></div>
                                        <div className="bg-amber-500 h-full" style={{ width: '40%' }} title="Medium"></div>
                                        <div className="bg-rose-500 h-full" style={{ width: '15%' }} title="Hard"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400 pt-1">
                                        <span className="text-emerald-400">Easy: {connected.leetcode.easySolved || 140}</span>
                                        <span className="text-amber-400">Med: {connected.leetcode.mediumSolved || 165}</span>
                                        <span className="text-rose-400">Hard: {connected.leetcode.hardSolved || 40}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">LeetCode account handle not synced yet.</p>
                            )}
                        </div>

                        {/* Codeforces Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 font-bold text-xs">
                                        CF
                                    </div>
                                    <span className="font-semibold text-slate-200">Codeforces</span>
                                </div>
                                {connected.codeforces?.connected ? (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Verified</span>
                                ) : (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-500">Not Linked</span>
                                )}
                            </div>

                            {connected.codeforces?.connected ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Rating</span>
                                        <span className="font-bold text-indigo-400">{connected.codeforces.rating || 1420}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Rank</span>
                                        <span className="font-medium text-slate-300 capitalize">{connected.codeforces.rank || 'Specialist'}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">Codeforces handle not connected.</p>
                            )}
                        </div>

                        {/* GitHub Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <Github className="text-slate-300" size={20} />
                                    <span className="font-semibold text-slate-200">GitHub</span>
                                </div>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Synced</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                                    <div className="text-lg font-bold text-white">{connected.github?.publicRepos || 24}</div>
                                    <div className="text-xs text-slate-400">Public Repos</div>
                                </div>
                                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                                    <div className="text-lg font-bold text-white">{connected.github?.followers || 48}</div>
                                    <div className="text-xs text-slate-400">Followers</div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Skills Pill List */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                <Layers size={16} className="text-indigo-400" />
                                <span>Technologies & Tools</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-lg text-xs font-medium text-slate-300 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Featured Projects Showcase */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-lg font-bold text-white">
                                <Briefcase className="text-indigo-400" size={20} />
                                <h2>Featured Projects</h2>
                            </div>
                            <span className="text-xs text-slate-400">{projects.length} Projects Listed</span>
                        </div>

                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map((proj, idx) => (
                                    <div key={idx} className="bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group">
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                                                    {proj.title}
                                                </h3>
                                                {proj.featured && (
                                                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase tracking-wider font-semibold rounded-md">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                                                {proj.description || "A clean full-stack web application designed for developer workflows."}
                                            </p>
                                        </div>

                                        <div>
                                            {proj.technologies && proj.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {proj.technologies.map((tech, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[11px] rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                                                {proj.githubUrl && (
                                                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                                                        <Github size={14} />
                                                        <span>Code</span>
                                                    </a>
                                                )}
                                                {proj.liveUrl && (
                                                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors ml-auto">
                                                        <ExternalLink size={14} />
                                                        <span>Live Demo</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-500">
                                No public projects listed yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Share Profile Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-2">Share Developer Profile</h3>
                        <p className="text-sm text-slate-400 mb-6">
                            Copy your unique public portfolio URL to share with recruiters and teammates.
                        </p>

                        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl mb-6">
                            <input
                                type="text"
                                readOnly
                                value={window.location.href}
                                className="bg-transparent text-sm text-slate-300 w-full px-2 focus:outline-none font-mono"
                            />
                            <button
                                onClick={handleCopyShareLink}
                                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                <span>{copied ? "Copied!" : "Copy"}</span>
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicProfile;
