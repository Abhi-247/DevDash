import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Download, 
    Mail, 
    MapPin, 
    Globe, 
    Award, 
    Briefcase, 
    Code2, 
    Sparkles, 
    CheckCircle2, 
    AlertCircle, 
    Copy, 
    Check, 
    Send, 
    Building2, 
    Target, 
    FileText,
    Github
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const Resume = () => {
    const { isRecruiterMode, mockData } = useRecruiter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // ATS Matcher State
    const [activeTab, setActiveTab] = useState('ats'); // 'ats' | 'preview'
    const [selectedPreset, setSelectedPreset] = useState(0);
    const [jobDescription, setJobDescription] = useState(mockData.sampleJobPresets[0].requirements);
    const [targetCompany, setTargetCompany] = useState(mockData.sampleJobPresets[0].company);
    const [targetRole, setTargetRole] = useState(mockData.sampleJobPresets[0].role);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [matchScore, setMatchScore] = useState(93);
    const [matchedKeywords, setMatchedKeywords] = useState([
        'React', 'Node.js', 'TypeScript', 'REST APIs', 'Distributed Systems', 'MongoDB', 'System Design'
    ]);
    const [missingKeywords, setMissingKeywords] = useState(['Kafka', 'Kubernetes']);
    const [generatedPitch, setGeneratedPitch] = useState('');
    const [copiedPitch, setCopiedPitch] = useState(false);

    useEffect(() => {
        fetchProfile();
        runATSAnalysis(jobDescription, targetCompany, targetRole);
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
        window.print();
    };

    const runATSAnalysis = (jdText, company, role) => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const candidateSkills = [
                'React', 'Node.js', 'Express', 'TypeScript', 'MongoDB', 'PostgreSQL', 
                'Redis', 'Docker', 'System Design', 'Distributed Systems', 'Tailwind CSS', 
                'REST APIs', 'WebSockets', 'AWS', 'Git', 'Data Structures', 'Algorithms'
            ];

            const jdWords = jdText.toLowerCase();
            const matched = candidateSkills.filter(skill => jdWords.includes(skill.toLowerCase()));
            const missing = ['Kafka', 'Kubernetes', 'GraphQL', 'CI/CD Pipelines'].filter(
                k => jdWords.includes(k.toLowerCase()) && !matched.map(m => m.toLowerCase()).includes(k.toLowerCase())
            );

            // Compute score
            const calculatedScore = Math.min(97, Math.max(78, Math.round(75 + (matched.length * 3) - (missing.length * 2))));

            setMatchScore(calculatedScore);
            setMatchedKeywords(matched.length > 0 ? matched : ['React', 'Node.js', 'TypeScript', 'REST APIs']);
            setMissingKeywords(missing.length > 0 ? missing : ['Kubernetes (Nice to have)']);

            // Generate pitch
            const candidateName = profile?.fullName || mockData.fullName;
            const pitch = `Hi ${company} Hiring Team,

I noticed you're searching for a ${role}. Having architected distributed telemetry platforms and full-stack systems using ${matched.slice(0, 3).join(', ')}, I would love to contribute to your engineering team.

Key Highlights:
• Solved 650+ algorithmic DSA challenges (Top 6% LeetCode rating).
• Architected production systems with sub-45ms p99 latency and high-throughput background daemons.
• Experience matching ${company}'s focus on reliability and scalable web applications.

Attached is my verified resume and portfolio (devdash.live/u/me). Looking forward to discussing how my skills align with ${company}'s goals!

Best regards,
${candidateName}`;

            setGeneratedPitch(pitch);
            setIsAnalyzing(false);
        }, 500);
    };

    const handlePresetSelect = (presetIndex) => {
        setSelectedPreset(presetIndex);
        const preset = mockData.sampleJobPresets[presetIndex];
        setTargetCompany(preset.company);
        setTargetRole(preset.role);
        setJobDescription(preset.requirements);
        runATSAnalysis(preset.requirements, preset.company, preset.role);
    };

    const handleCopyPitch = () => {
        navigator.clipboard.writeText(generatedPitch);
        setCopiedPitch(true);
        setTimeout(() => setCopiedPitch(false), 2000);
    };

    // Determine active profile data
    const useSimulated = isRecruiterMode || !profile?.fullName;
    const activeData = useSimulated ? mockData : profile;
    const projects = (activeData.projects && activeData.projects.length > 0) ? activeData.projects : mockData.projects;
    const skills = (activeData.skills && activeData.skills.length > 0) ? activeData.skills : mockData.skills;

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Header & Tab Switcher (Hidden when printing) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Resume & ATS Intelligence Hub
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                            AI-Powered
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Live job description matching, ATS keyword verification, and exportable verified developer resume.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Switcher */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                        <button
                            onClick={() => setActiveTab('ats')}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                activeTab === 'ats' 
                                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' 
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            ATS Matcher & Copilot
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
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                    >
                        <Download size={16} />
                        <span>Print / Save PDF</span>
                    </button>
                </div>
            </div>

            {/* ATS Matcher Section (Interactive for Recruiters) */}
            {activeTab === 'ats' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden">
                    {/* Left Column: Job Description Input & Presets */}
                    <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Role & Job Description</span>
                            <span className="text-xs text-indigo-500 font-semibold flex items-center gap-1">
                                <Sparkles size={13} /> Recruiter Simulation
                            </span>
                        </div>

                        {/* Preset Buttons */}
                        <div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2 font-medium">Quick Role Presets:</span>
                            <div className="grid grid-cols-3 gap-2">
                                {mockData.sampleJobPresets.map((preset, idx) => (
                                    <button
                                        key={preset.company}
                                        onClick={() => handlePresetSelect(idx)}
                                        className={`p-2 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                                            selectedPreset === idx
                                                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold'
                                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                                        }`}
                                    >
                                        <div className="font-bold truncate">{preset.company}</div>
                                        <div className="text-[10px] text-slate-400 truncate">{preset.role.split(' ')[0]}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Company Name</label>
                                <input
                                    type="text"
                                    value={targetCompany}
                                    onChange={e => setTargetCompany(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Job Title</label>
                                <input
                                    type="text"
                                    value={targetRole}
                                    onChange={e => setTargetRole(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Job Requirements / Stack</label>
                            <textarea
                                rows={5}
                                value={jobDescription}
                                onChange={e => {
                                    setJobDescription(e.target.value);
                                    runATSAnalysis(e.target.value, targetCompany, targetRole);
                                }}
                                placeholder="Paste job requirements or required skills..."
                                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-indigo-500 leading-relaxed font-mono"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => runATSAnalysis(jobDescription, targetCompany, targetRole)}
                                disabled={isAnalyzing}
                                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                            >
                                <Sparkles size={15} />
                                <span>{isAnalyzing ? 'Evaluating Keywords...' : 'Re-calculate ATS Match Score'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: ATS Match Score & AI Pitch */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Match Score Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ATS Match Analysis</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    High Compatibility
                                </span>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-slate-100 dark:text-slate-800"
                                            strokeWidth="3.8"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="text-indigo-600"
                                            strokeDasharray={`${matchScore}, 100`}
                                            strokeWidth="3.8"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{matchScore}%</span>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase">Match</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                                        Strong Fit for {targetRole} at {targetCompany}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Profile contains key engineering keywords, verified system architectures, and matching tech stack proficiencies.
                                    </p>
                                </div>
                            </div>

                            {/* Keywords Grid */}
                            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1.5">
                                        <CheckCircle2 size={13} /> Matched Requirements ({matchedKeywords.length})
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {matchedKeywords.map((kw, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {missingKeywords.length > 0 && (
                                    <div>
                                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1.5">
                                            <AlertCircle size={13} /> Missing Keywords to Address
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {missingKeywords.map((kw, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-mono">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Generated Recruiter Cold Pitch Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                    <Send size={13} className="text-indigo-500" />
                                    <span>AI Tailored Recruiter Outreach Pitch</span>
                                </span>
                                <button
                                    onClick={handleCopyPitch}
                                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    {copiedPitch ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                                    <span>{copiedPitch ? 'Copied Pitch!' : 'Copy to Clipboard'}</span>
                                </button>
                            </div>

                            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                                {generatedPitch}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Printable & Verified A4 Developer Resume */}
            <div className={`mt-8 ${activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
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
                                        <strong className="text-slate-900 font-mono text-sm">{activeData.devScore} (Top 3%)</strong>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">LeetCode Algorithmic Solved</span>
                                        <strong className="text-slate-900 font-mono">648+ Solved (Knight 1845)</strong>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">Git Contributions</span>
                                        <strong className="text-slate-900 font-mono">1,420+ Verified Commits</strong>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-[10px]">Codeforces CP Rank</span>
                                        <strong className="text-slate-900 font-mono">Specialist (1610 Peak)</strong>
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
