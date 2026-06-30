import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, ExternalLink, Github, Star, Share2, Download } from 'lucide-react';

const Portfolio = () => {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolioData();
    }, []);

    const fetchPortfolioData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProfile(response.data);
            setProjects(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
        } finally {
            setLoading(false);
        }
    };

    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Portfolio</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Your public portfolio showcase</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => window.open(`/u/${profile?.username}`, '_blank')}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <ExternalLink size={18} />
                        View Public
                    </button>
                    <button
                        onClick={() => window.location.href = '/projects'}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Briefcase size={18} />
                        Manage Projects
                    </button>
                </div>
            </div>

            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 mb-8 text-white">
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                        {profile?.fullName?.charAt(0) || profile?.username?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{profile?.fullName || profile?.username}</h2>
                        <p className="text-white/80 mb-4">{profile?.bio || 'Full Stack Developer'}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            {profile?.location && (
                                <span className="flex items-center gap-1">
                                    📍 {profile.location}
                                </span>
                            )}
                            {profile?.website && (
                                <a
                                    href={profile.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:underline"
                                >
                                    🔗 {profile.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills */}
            {profile?.skills && profile.skills.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <Star className="text-yellow-500" size={24} />
                        Featured Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredProjects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {project.imageUrl && (
                                    <div className="h-48 bg-slate-100 dark:bg-slate-700">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                        {project.title}
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                            >
                                                <Github size={18} />
                                                Code
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                <ExternalLink size={18} />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">All Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
                            >
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    {project.title}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                                        >
                                            <Github size={16} />
                                            Code
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm"
                                        >
                                            <ExternalLink size={16} />
                                            Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {projects.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Briefcase size={48} className="mx-auto text-slate-400 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No projects yet</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Add projects to build your portfolio</p>
                    <button
                        onClick={() => window.location.href = '/projects'}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Briefcase size={20} />
                        Add Projects
                    </button>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
