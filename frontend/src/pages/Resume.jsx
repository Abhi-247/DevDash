import React, { useRef } from 'react';
import { Download, Mail, MapPin, Globe, Github, Linkedin } from 'lucide-react';

const Resume = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    // Mock data for resume - ideally passed via context or props
    const experience = [
        { role: "Senior Frontend Engineer", company: "TechCorp Inc.", period: "2022 - Present", description: "Leading the frontend team, migrating legacy app to React." },
        { role: "Frontend Developer", company: "WebStudio", period: "2020 - 2022", description: "Built responsive websites for various clients using React and Tailwind." },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Resume</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                    <Download size={18} />
                    Download PDF
                </button>
            </div>

            <div className="bg-white p-12 rounded-xl shadow-lg border border-slate-100 max-w-[210mm] mx-auto min-h-[297mm]">
                {/* Header */}
                <div className="border-b-2 border-slate-800 pb-8 mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">{user?.name || "Alex Developer"}</h1>
                        <p className="text-xl text-indigo-600 font-medium">{user?.role || "Full Stack Developer"}</p>
                    </div>
                    <div className="text-right space-y-2 text-sm text-slate-600">
                        <div className="flex items-center justify-end gap-2">
                            <span>{user?.email}</span>
                            <Mail size={16} />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <span>{user?.location || "San Francisco, CA"}</span>
                            <MapPin size={16} />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <span>portfolio.dev</span>
                            <Globe size={16} />
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="col-span-2 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-indigo-200 pb-2 mb-4">Profile</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {user?.bio || "Passionate developer with 5+ years of experience building scalable web applications. Expert in React ecosystem and modern frontend architecture. Strong background in UI/UX design principles."}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-indigo-200 pb-2 mb-4">Experience</h3>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-slate-800">{exp.role}</h4>
                                            <span className="text-sm text-slate-500 italic">{exp.period}</span>
                                        </div>
                                        <p className="text-indigo-600 font-medium text-sm mb-2">{exp.company}</p>
                                        <p className="text-slate-600 text-sm">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-indigo-200 pb-2 mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {user?.skills?.map(skill => (
                                    <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">
                                        {skill}
                                    </span>
                                )) || (
                                        <>
                                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">React</span>
                                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm font-medium">JavaScript</span>
                                        </>
                                    )}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-b border-indigo-200 pb-2 mb-4">Stats</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-slate-700">LeetCode</span>
                                        <span className="font-bold text-indigo-600">450+</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-slate-700">GitHub Activity</span>
                                        <span className="font-bold text-indigo-600">High</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
