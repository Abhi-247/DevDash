import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Mail, MapPin, Globe, Award, Briefcase, Code2 } from 'lucide-react';

const Resume = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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
        window.print();
    };

    const connected = profile?.connectedProfiles || {};
    const projects = profile?.projects || [];
    const skills = profile?.skills || ["React", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "Express"];
    const devScore = profile?.devScore || 1450;

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fade-in">
            {/* Header Controls (Hidden when printing) */}
            <div className="flex justify-between items-center mb-8 print:hidden">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Resume Builder</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Export your verified developer resume generated from your connected platforms.
                    </p>
                </div>
                <button
                    onClick={handleDownloadPDF}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                >
                    <Download size={18} />
                    <span>Download PDF</span>
                </button>
            </div>

            {/* Printable A4 Resume Container */}
            <div id="resume-container" className="bg-white text-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 max-w-[210mm] mx-auto min-h-[297mm]">
                {/* Resume Header */}
                <div className="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                            {profile?.fullName || profile?.username || "Developer"}
                        </h1>
                        <p className="text-lg text-indigo-600 font-semibold">Full Stack Developer</p>
                    </div>
                    <div className="text-right space-y-1 text-sm text-slate-600 font-medium">
                        {profile?.email && (
                            <div className="flex items-center justify-end gap-1.5">
                                <span>{profile.email}</span>
                                <Mail size={14} className="text-slate-400" />
                            </div>
                        )}
                        {profile?.location && (
                            <div className="flex items-center justify-end gap-1.5">
                                <span>{profile.location}</span>
                                <MapPin size={14} className="text-slate-400" />
                            </div>
                        )}
                        {profile?.website && (
                            <div className="flex items-center justify-end gap-1.5">
                                <span>{profile.website.replace(/^https?:\/\//, '')}</span>
                                <Globe size={14} className="text-slate-400" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Resume Content Layout */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Main Left Column (2 Cols) */}
                    <div className="col-span-2 space-y-6">
                        {/* Bio / Summary */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                                Summary
                            </h3>
                            <p className="text-slate-700 text-sm leading-relaxed">
                                {profile?.bio || "Passionate Full Stack Developer with experience in building responsive web applications, REST APIs, and developer platforms. Skilled in problem solving and system architecture."}
                            </p>
                        </section>

                        {/* Projects */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                                Key Projects
                            </h3>
                            {projects.length > 0 ? (
                                <div className="space-y-4">
                                    {projects.slice(0, 3).map((proj, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                                                {proj.technologies && proj.technologies.length > 0 && (
                                                    <span className="text-xs text-indigo-600 font-mono font-medium">
                                                        {proj.technologies.slice(0, 3).join(', ')}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-600 text-xs leading-normal">{proj.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-slate-900 text-sm">DevDash - Developer Portfolio Hub</h4>
                                            <span className="text-xs text-indigo-600 font-mono">React, Node.js, MongoDB</span>
                                        </div>
                                        <p className="text-slate-600 text-xs">Unified developer dashboard aggregating coding stats across LeetCode, Codeforces, and GitHub with automated DevScore computation.</p>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Technical Experience */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                                Engineering Focus
                            </h3>
                            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1.5">
                                <li>Designed modular frontend UI architecture using React and Tailwind CSS.</li>
                                <li>Integrated REST & GraphQL APIs to fetch live platform metrics asynchronously.</li>
                                <li>Implemented secure JWT user authentication with HTTP-only cookie persistence.</li>
                            </ul>
                        </section>
                    </div>

                    {/* Right Column (1 Col) */}
                    <div className="space-y-6">
                        {/* Verified Coding Stats */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                                Verified Metrics
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                                    <div className="flex justify-between font-bold text-slate-900 mb-1">
                                        <span>DevScore™</span>
                                        <span className="text-indigo-600">{devScore}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500">Calculated rank across connected platforms</p>
                                </div>

                                {connected.leetcode?.connected && (
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                                        <div className="flex justify-between font-semibold text-slate-800">
                                            <span>LeetCode Solved</span>
                                            <span className="text-amber-600 font-bold">{connected.leetcode.totalSolved || 0}</span>
                                        </div>
                                    </div>
                                )}

                                {connected.codeforces?.connected && (
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                                        <div className="flex justify-between font-semibold text-slate-800">
                                            <span>Codeforces Rating</span>
                                            <span className="text-blue-600 font-bold">{connected.codeforces.rating || 'Unrated'}</span>
                                        </div>
                                    </div>
                                )}

                                {connected.github?.connected && (
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                                        <div className="flex justify-between font-semibold text-slate-800">
                                            <span>GitHub Repos</span>
                                            <span className="text-slate-900 font-bold">{connected.github.publicRepos || 0}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
