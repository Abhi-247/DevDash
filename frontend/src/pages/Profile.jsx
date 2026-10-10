import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    User, 
    Mail, 
    MapPin, 
    Globe, 
    Save, 
    Camera, 
    CheckCircle2, 
    AlertCircle, 
    Sparkles, 
    ExternalLink, 
    Trash2, 
    RotateCcw, 
    ShieldCheck, 
    Award, 
    Code2, 
    Github, 
    Linkedin, 
    Twitter, 
    Plus, 
    X, 
    Briefcase,
    Zap,
    Layers,
    ArrowRight,
    UploadCloud
} from 'lucide-react';

const POPULAR_SKILLS = [
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Next.js', 
    'Python', 'MongoDB', 'Tailwind CSS', 'Docker', 'Express', 
    'PostgreSQL', 'Git', 'AWS', 'GraphQL', 'Redis', 'C++', 'Java'
];

const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState({
        fullName: '',
        username: '',
        email: '',
        role: 'Full Stack Developer',
        bio: '',
        location: '',
        website: '',
        githubUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        skills: [],
        avatar: '',
        googleAvatar: '',
        authProvider: 'local',
        devScore: 500,
        connectedProfiles: {}
    });

    const [skillInput, setSkillInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            const data = response.data || {};
            const localUser = JSON.parse(localStorage.getItem('user') || '{}');

            const loadedAvatar = data.avatar || localUser.avatar || '';
            const detectedGoogleAvatar = data.googleAvatar || 
                (loadedAvatar.includes('googleusercontent.com') ? loadedAvatar : '') || 
                (localUser.avatar?.includes('googleusercontent.com') ? localUser.avatar : '');

            setProfile({
                fullName: data.fullName || localUser.name || localUser.fullName || '',
                username: data.username || localUser.username || '',
                email: data.email || localUser.email || '',
                role: data.role || 'Full Stack Developer',
                bio: data.bio || '',
                location: data.location || '',
                website: data.website || '',
                githubUrl: data.githubUrl || '',
                linkedinUrl: data.linkedinUrl || '',
                twitterUrl: data.twitterUrl || '',
                skills: data.skills || [],
                avatar: loadedAvatar,
                googleAvatar: detectedGoogleAvatar,
                authProvider: data.authProvider || (data.googleId ? 'google' : localUser.authProvider || 'local'),
                devScore: data.devScore || 500,
                connectedProfiles: data.connectedProfiles || {}
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage({ type: 'error', text: 'Failed to load profile data.' });
        } finally {
            setLoading(false);
        }
    };

    // Handle Image file selection & compression
    const handleImageFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please select a valid image file (PNG, JPG, WEBP).' });
            return;
        }

        if (file.size > 8 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Image file is too large. Max size is 8MB.' });
            return;
        }

        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
            const img = new Image();
            img.onload = () => {
                // Resize if needed using HTML5 Canvas (max 600x600 for crisp quality with minimal payload)
                const canvas = document.createElement('canvas');
                const MAX_DIM = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_DIM) {
                        height = Math.round((height * MAX_DIM) / width);
                        width = MAX_DIM;
                    }
                } else {
                    if (height > MAX_DIM) {
                        width = Math.round((width * MAX_DIM) / height);
                        height = MAX_DIM;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);
                setProfile(prev => ({
                    ...prev,
                    avatar: compressedBase64
                }));
                setIsDirty(true);
                setMessage({ type: 'info', text: 'New photo selected! Click "Save Changes" to apply across DevDash.' });
            };
            img.src = uploadEvent.target.result;
        };
        reader.readAsDataURL(file);
    };

    // Revert to Google or Email avatar
    const handleRevertToGoogleAvatar = () => {
        if (!profile.googleAvatar) return;
        setProfile(prev => ({
            ...prev,
            avatar: profile.googleAvatar
        }));
        setIsDirty(true);
        setMessage({ type: 'info', text: 'Switched back to your Google/Email avatar. Click "Save Changes" to persist.' });
    };

    // Reset photo to default initials
    const handleRemoveAvatar = () => {
        setProfile(prev => ({
            ...prev,
            avatar: ''
        }));
        setIsDirty(true);
        setMessage({ type: 'info', text: 'Avatar reset to default initials. Click "Save Changes" to save.' });
    };

    // Add skill
    const addSkill = (newSkill) => {
        const skillToAdd = (newSkill || skillInput).trim();
        if (skillToAdd && !profile.skills.includes(skillToAdd)) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, skillToAdd]
            }));
            setSkillInput('');
            setIsDirty(true);
        }
    };

    // Remove skill
    const removeSkill = (skillToRemove) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
        setIsDirty(true);
    };

    // Submit changes
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const payload = {
                fullName: profile.fullName,
                role: profile.role,
                bio: profile.bio,
                location: profile.location,
                website: profile.website,
                skills: profile.skills,
                avatar: profile.avatar,
                googleAvatar: profile.googleAvatar,
                githubUrl: profile.githubUrl,
                linkedinUrl: profile.linkedinUrl,
                twitterUrl: profile.twitterUrl
            };

            await axios.put(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`,
                payload,
                { withCredentials: true }
            );

            // Sync with localStorage user
            const localUserStr = localStorage.getItem('user');
            if (localUserStr) {
                try {
                    const localUser = JSON.parse(localUserStr);
                    localUser.name = profile.fullName || localUser.name;
                    localUser.fullName = profile.fullName || localUser.fullName;
                    localUser.avatar = profile.avatar;
                    localUser.role = profile.role;
                    localStorage.setItem('user', JSON.stringify(localUser));
                    // Notify other components (Navbar, Sidebar)
                    window.dispatchEvent(new Event('userUpdated'));
                } catch (err) {
                    console.error('Failed to sync localStorage user:', err);
                }
            }

            setIsDirty(false);
            setMessage({ type: 'success', text: 'Profile updated successfully! All changes are live.' });
            setTimeout(() => {
                setMessage(prev => prev.type === 'success' ? { type: '', text: '' } : prev);
            }, 4000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error updating profile. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Loading Profile...</p>
            </div>
        );
    }

    // Avatar identification logic
    const isGoogleAvatar = Boolean(
        profile.avatar && (
            profile.avatar.includes('googleusercontent.com') ||
            (profile.googleAvatar && profile.avatar === profile.googleAvatar)
        )
    );
    const isCustomUpload = Boolean(
        profile.avatar && (
            profile.avatar.startsWith('data:image/') ||
            (!isGoogleAvatar && !profile.avatar.includes('ui-avatars.com'))
        )
    );
    const displayAvatar = profile.avatar || 
        profile.googleAvatar || 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || profile.username || 'Developer')}&background=2563eb&color=ffffff&bold=true`;

    const connectedCount = Object.values(profile.connectedProfiles || {}).filter(p => p?.connected).length;

    return (
        <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-6">
            {/* Hidden native file input */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageFileChange} 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                className="hidden" 
            />

            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Profile & Identity
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your personal developer details, image avatar, and public showcases
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(`/u/${profile.username || 'me'}`)}
                        className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <ExternalLink size={15} />
                        <span>Public Showcase</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saving}
                        className={`px-5 py-2 text-xs sm:text-sm font-semibold text-white rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                            isDirty 
                                ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25 ring-2 ring-blue-500/30' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {saving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Alert / Notification Banner */}
            {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-medium border ${
                    message.type === 'success' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : message.type === 'error'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                        : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                }`}>
                    {message.type === 'success' ? (
                        <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : message.type === 'error' ? (
                        <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0" />
                    ) : (
                        <Sparkles size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    )}
                    <span className="flex-1">{message.text}</span>
                    <button 
                        onClick={() => setMessage({ type: '', text: '' })}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Hero Profile Banner Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                {/* Modern subtle blue gradient accent banner matching Dashboard */}
                <div className="relative h-36 sm:h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 overflow-hidden">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-md border border-white/25 flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck size={13} />
                            Verified Developer
                        </span>
                    </div>
                </div>

                {/* Avatar and Overview info */}
                <div className="px-5 sm:px-8 pb-6 pt-0">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-16 sm:-mt-20">
                        {/* Avatar + Main Title */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                            <div className="relative group shrink-0">
                                <img
                                    src={displayAvatar}
                                    alt={profile.fullName || 'User'}
                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-lg bg-white dark:bg-slate-800"
                                />
                                
                                {/* Camera Upload Button */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    title="Upload new profile photo"
                                    className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center border-2 border-white dark:border-slate-900"
                                >
                                    <Camera size={16} />
                                </button>
                            </div>

                            <div className="text-center sm:text-left space-y-1">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                                        {profile.fullName || 'Abhishek Verma'}
                                    </h2>
                                    {profile.username && (
                                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                            @{profile.username}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    {profile.role || 'Full Stack Developer'}
                                </p>

                                {/* Avatar Origin Badge */}
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                                    {isGoogleAvatar ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                                            <Mail size={12} />
                                            Imported from Google / Email account
                                        </span>
                                    ) : isCustomUpload ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50">
                                            <Sparkles size={12} />
                                            Custom uploaded photo
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            <User size={12} />
                                            Default avatar initials
                                        </span>
                                    )}

                                    {profile.location && (
                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                            <MapPin size={12} />
                                            {profile.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Metric Highlights Pill matching Dashboard */}
                        <div className="flex items-center justify-center sm:justify-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="px-3 py-1 text-center border-r border-slate-200 dark:border-slate-700">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DevScore</p>
                                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                                    <Zap size={13} fill="currentColor" />
                                    {profile.devScore || 1088}
                                </p>
                            </div>
                            <div className="px-3 py-1 text-center border-r border-slate-200 dark:border-slate-700">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skills</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    {profile.skills.length}
                                </p>
                            </div>
                            <div className="px-3 py-1 text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Connected</p>
                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    {connectedCount} platforms
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Profile Form Grid */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Personal Information & Bio (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* 1. Basic Information Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <User size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Personal & Professional Information
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Your public identity and primary contact information
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) => {
                                            setProfile({ ...profile, fullName: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="e.g. Abhishek Verma"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Headline / Role */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Headline / Professional Role
                                </label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        value={profile.role}
                                        onChange={(e) => {
                                            setProfile({ ...profile, role: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="e.g. Full Stack Developer"
                                    />
                                </div>
                            </div>

                            {/* Email (Read-only + Verified Badge) */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Email Address
                                    </label>
                                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 size={11} /> Verified
                                    </span>
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                        placeholder="you@domain.com"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => {
                                            setProfile({ ...profile, location: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="e.g. Sitapur, India"
                                    />
                                </div>
                            </div>

                            {/* Website / Portfolio */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Personal Portfolio / Website
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="url"
                                        value={profile.website}
                                        onChange={(e) => {
                                            setProfile({ ...profile, website: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="https://abhishekverma2473.vercel.app"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Developer Bio & Summary Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        About & Developer Bio
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Summarize your experience, tech focus, and passions
                                    </p>
                                </div>
                            </div>
                            <span className="text-[11px] font-medium text-slate-400">
                                {profile.bio.length} / 600 characters
                            </span>
                        </div>

                        <div>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => {
                                    setProfile({ ...profile, bio: e.target.value });
                                    setIsDirty(true);
                                }}
                                rows={4}
                                maxLength={600}
                                className="w-full p-3.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed"
                                placeholder="Final year Computer Science student and Full Stack Developer with experience delivering modern web solutions. Skilled in React, Next.js, Node.js, MongoDB..."
                            />
                            <p className="text-[11px] text-slate-400 mt-1.5">
                                This bio appears on your public portfolio showcase, generated resumes, and recruiter outreach emails.
                            </p>
                        </div>
                    </div>

                    {/* 3. Social & Developer Links Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                                <Globe size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Social & Developer Profiles
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Direct links to your external code and professional profiles
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3.5">
                            {/* GitHub URL */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    GitHub Profile URL
                                </label>
                                <div className="relative">
                                    <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="url"
                                        value={profile.githubUrl}
                                        onChange={(e) => {
                                            setProfile({ ...profile, githubUrl: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="https://github.com/Abhi-247"
                                    />
                                </div>
                            </div>

                            {/* LinkedIn URL */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    LinkedIn Profile URL
                                </label>
                                <div className="relative">
                                    <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="url"
                                        value={profile.linkedinUrl}
                                        onChange={(e) => {
                                            setProfile({ ...profile, linkedinUrl: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="https://linkedin.com/in/abhishek-verma"
                                    />
                                </div>
                            </div>

                            {/* Twitter / X URL */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                    Twitter / X Profile URL
                                </label>
                                <div className="relative">
                                    <Twitter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="url"
                                        value={profile.twitterUrl}
                                        onChange={(e) => {
                                            setProfile({ ...profile, twitterUrl: e.target.value });
                                            setIsDirty(true);
                                        }}
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="https://twitter.com/abhishek"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Avatar Controls & Skills (5 cols) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* 4. Image Upload & Avatar Origin Management Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <Camera size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Profile Picture & Avatar
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Upload a custom image or sync with email
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                            <img
                                src={displayAvatar}
                                alt="Avatar Preview"
                                className="w-16 h-16 rounded-xl object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                            />
                            <div className="space-y-1 min-w-0 flex-1">
                                <p className="text-xs font-bold text-slate-900 dark:text-white">
                                    {isGoogleAvatar ? 'Google / Email Photo' : isCustomUpload ? 'Custom Uploaded Photo' : 'Default Initials'}
                                </p>
                                <p className="text-[11px] text-slate-400 leading-tight">
                                    {isGoogleAvatar
                                        ? 'Imported from your Google Sign-In profile.'
                                        : isCustomUpload
                                        ? 'Custom photo uploaded directly.'
                                        : 'Currently displaying auto-generated initials.'}
                                </p>
                            </div>
                        </div>

                        {/* Image Action Buttons */}
                        <div className="space-y-2 pt-1">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                            >
                                <UploadCloud size={16} />
                                <span>Upload New Photo</span>
                            </button>

                            {/* Revert to Google avatar if available and not currently active */}
                            {profile.googleAvatar && profile.avatar !== profile.googleAvatar && (
                                <button
                                    type="button"
                                    onClick={handleRevertToGoogleAvatar}
                                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-blue-600 dark:text-blue-400 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                                >
                                    <RotateCcw size={14} />
                                    <span>Use Google / Email Avatar</span>
                                </button>
                            )}

                            {profile.avatar && (
                                <button
                                    type="button"
                                    onClick={handleRemoveAvatar}
                                    className="w-full py-2 px-3 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                >
                                    <Trash2 size={13} />
                                    <span>Reset to Default Initials</span>
                                </button>
                            )}
                        </div>

                        <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
                            💡 <strong>Tip:</strong> Square images (PNG, JPG, WEBP) work best. The image will be compressed automatically to guarantee lightning-fast loading across DevDash.
                        </div>
                    </div>

                    {/* 5. Skills & Tech Stack Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <Code2 size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Skills & Tech Stack
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Tag languages, frameworks, and tools
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                                {profile.skills.length} active
                            </span>
                        </div>

                        {/* Add Skill Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSkill();
                                    }
                                }}
                                className="flex-1 px-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="e.g. Next.js, Docker"
                            />
                            <button
                                type="button"
                                onClick={() => addSkill()}
                                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                            >
                                <Plus size={15} />
                                <span>Add</span>
                            </button>
                        </div>

                        {/* Active Skills Matrix */}
                        <div className="flex flex-wrap gap-2 min-h-[50px] p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                            {profile.skills.length === 0 ? (
                                <p className="text-xs text-slate-400 italic py-2">
                                    No skills added yet. Pick from the suggestions below or type a skill above.
                                </p>
                            ) : (
                                profile.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 rounded-lg text-xs font-semibold shadow-xs"
                                    >
                                        <span>{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                            title={`Remove ${skill}`}
                                        >
                                            <X size={13} />
                                        </button>
                                    </span>
                                ))
                            )}
                        </div>

                        {/* Quick Add Suggestions */}
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Quick Suggestions:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {POPULAR_SKILLS.filter(s => !profile.skills.includes(s)).slice(0, 10).map((suggestedSkill) => (
                                    <button
                                        key={suggestedSkill}
                                        type="button"
                                        onClick={() => addSkill(suggestedSkill)}
                                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                        <Plus size={11} />
                                        <span>{suggestedSkill}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. Connected Platforms Quick Overview */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <Layers size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Connected Coding Accounts
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Platforms synced with DevDash telemetry
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {['leetcode', 'github', 'codeforces', 'gfg', 'hackerrank'].map((platformKey) => {
                                const profileData = profile.connectedProfiles?.[platformKey];
                                const isConnected = profileData?.connected;
                                const platformName = platformKey === 'leetcode' ? 'LeetCode' :
                                    platformKey === 'github' ? 'GitHub' :
                                    platformKey === 'codeforces' ? 'Codeforces' :
                                    platformKey === 'gfg' ? 'GeeksforGeeks' : 'HackerRank';

                                return (
                                    <div
                                        key={platformKey}
                                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
                                    >
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                                            {platformName}
                                        </span>
                                        {isConnected ? (
                                            <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">
                                                <CheckCircle2 size={12} /> {profileData.username || 'Connected'}
                                            </span>
                                        ) : (
                                            <span className="text-[11px] text-slate-400">
                                                Not linked
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/accounts')}
                            className="w-full py-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <span>Manage Accounts & API Sync</span>
                            <ArrowRight size={13} />
                        </button>
                    </div>

                </div>

                {/* Bottom Sticky Action Bar */}
                <div className="lg:col-span-12 sticky bottom-4 z-20">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            {isDirty ? (
                                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    You have unsaved changes
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                                    <CheckCircle2 size={14} />
                                    All changes up to date
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <button
                                type="button"
                                onClick={fetchProfile}
                                disabled={saving || !isDirty}
                                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Discard
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving Profile...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Profile;
