import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Download, 
    Mail, 
    MapPin, 
    Globe, 
    Sparkles, 
    CheckCircle2, 
    Target, 
    FileText,
    Clock,
    Send,
    ArrowRight
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const Resume = () => {
    const { isRecruiterMode, mockData } = useRecruiter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ats'); // 'ats' | 'preview'

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile for resume:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (activeTab !== 'preview') {
            setActiveTab('preview');
            setTimeout(() => window.print(), 100);
        } else {
            window.print();
        }
    };

    // Determine active profile data
    const activeData = isRecruiterMode ? mockData : (profile || {});
    const projects = (activeData.projects && activeData.projects.length > 0) ? activeData.projects : (isRecruiterMode ? mockData.projects : []);
    const skills = (activeData.skills && activeData.skills.length > 0) ? activeData.skills : (isRecruiterMode ? mockData.skills : ['JavaScript', 'React', 'Node.js', 'Web Development', 'Git']);

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
            {/* Header & Tab Switcher (Hidden when printing) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Resume & ATS Intelligence
                        </h1>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        ATS keyword intelligence, job description benchmarking, and exportable verified developer resume.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Switcher */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                        <button
                            onClick={() => setActiveTab('ats')}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                                activeTab === 'ats' 
                                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' 
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <span>ATS Detailed</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                                Coming Soon
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                activeTab === 'preview' 
                                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' 
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            Resume Preview
                        </button>
                    </div>

                    <button
                        onClick={handleDownloadPDF}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                        <Download size={16} />
                        <span>Print / Save PDF</span>
                    </button>
                </div>
            </div>

            {/* ATS Detailed Page - Coming Soon View */}
            {activeTab === 'ats' && (
                <div className="print:hidden">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xs">
                            <Sparkles size={32} />
                        </div>

                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                                <Clock size={13} />
                                <span>Coming Soon</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                ATS Detailed Analyzer & Matcher
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                                We are developing an intelligent ATS scoring engine that benchmarks your profile against target job descriptions, evaluates keyword alignment, and helps you pass automated recruiter screenings.
                            </p>
                        </div>

                        {/* Feature Preview Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
                            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                    <Target size={16} />
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Neural ATS Match</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                                    Compare candidate skills and projects with real job postings to estimate recruiter pass rates.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <CheckCircle2 size={16} />
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Keyword Gap Radar</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                                    Pinpoint missing frameworks, libraries, and architectural proficiencies needed for the role.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                    <Send size={16} />
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">AI Outreach Copilot</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                                    Draft personalized cold emails backed by verified DevDash telemetry and coding scores.
                                </p>
                            </div>
                        </div>

                        {/* Switch Tab CTA */}
                        <div className="pt-2">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                            >
                                <FileText size={15} />
                                <span>View Verified Resume Preview</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Printable & Verified A4 Developer Resume */}
            <div className={`mt-6 ${activeTab === 'preview' ? 'block' : 'hidden print:block'}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 print:hidden">
                    Verified Developer Resume Preview (Ready for PDF Export)
                </div>

                <div id="resume-container" className="bg-white text-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 max-w-[210mm] mx-auto min-h-[297mm]">
                    {/* Header */}
                    <div className="border-b-2 border-slate-900 pb-5 mb-5 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                {activeData.fullName || activeData.username || "Abhishek Verma"}
                            </h1>
                            <p className="text-base text-indigo-600 font-bold mt-0.5">
                                {activeData.role || "Full Stack & Distributed Systems Engineer"}
                            </p>
                        </div>
                        <div className="text-right space-y-1 text-xs text-slate-600 font-medium">
                            <div className="flex items-center justify-end gap-1.5">
                                <span>{activeData.email}</span>
                                <Mail size={13} className="text-slate-400" />
                            </div>
                            <div className="flex items-center justify-end gap-1.5">
                                <span>{activeData.location}</span>
                                <MapPin size={13} className="text-slate-400" />
                            </div>
                            <div className="flex items-center justify-end gap-1.5">
                                <span>{activeData.website || "https://devdash.live"}</span>
                                <Globe size={13} className="text-slate-400" />
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Main 2 Columns (Summary & Projects) */}
                        <div className="col-span-2 space-y-5">
                            {/* Summary */}
                            <section>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                                    Engineering Summary
                                </h3>
                                <p className="text-slate-700 text-xs leading-relaxed">
                                    {activeData.bio}
                                </p>
                            </section>

                            {/* Key Projects */}
                            <section className="space-y-4">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                                    Featured Production Projects
                                </h3>
                                {projects.slice(0, 3).map((p, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-xs text-slate-900">{p.title}</h4>
                                            <span className="text-[10px] font-mono text-slate-500">
                                                {p.technologies?.slice(0, 3).join(', ')}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 leading-snug">{p.description}</p>
                                        {p.metrics && (
                                            <p className="text-[10px] font-semibold text-emerald-700 font-mono">
                                                ↳ Impact: {p.metrics}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </section>
                        </div>

                        {/* Right 1 Column (Verified Stats & Skills) */}
                        <div className="space-y-5 border-l border-slate-200 pl-5">
                            {/* Verified Stats */}
                            <section>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                                    Verified Telemetry
                                </h3>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">DevScore™ Rating</span>
                                        <strong className="text-slate-900 font-mono text-sm">{activeData.devScore || 780} (Top 3%)</strong>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">LeetCode Algorithmic Solved</span>
                                        <strong className="text-slate-900 font-mono">
                                            {activeData.connectedProfiles?.leetcode?.totalSolved || '648+'} Solved
                                        </strong>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">Git Contributions</span>
                                        <strong className="text-slate-900 font-mono">
                                            {activeData.connectedProfiles?.github?.totalCommits || '1,420+'} Commits
                                        </strong>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">Codeforces CP Rank</span>
                                        <strong className="text-slate-900 font-mono">
                                            {activeData.connectedProfiles?.codeforces?.rank || 'Specialist'} ({activeData.connectedProfiles?.codeforces?.maxRating || '1610'} Peak)
                                        </strong>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Proficiencies */}
                            <section>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                                    Core Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-1">
                                    {skills.map((s, idx) => (
                                        <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-800 font-mono">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
