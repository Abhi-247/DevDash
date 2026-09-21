import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FolderKanban, Plus, ExternalLink, Github, Trash2, Edit, Star, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const Projects = () => {
    const { isRecruiterMode, mockData } = useRecruiter();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: '',
        featured: false
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProjects(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const technologies = formData.technologies.split(',').map(t => t.trim()).filter(t => t);

        try {
            if (editingProject) {
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/projects/${editingProject._id}`, {
                    ...formData,
                    technologies
                }, {
                    withCredentials: true
                });
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/projects`, {
                    ...formData,
                    technologies
                }, {
                    withCredentials: true
                });
            }
            await fetchProjects();
            setShowModal(false);
            setEditingProject(null);
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Error saving project');
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            technologies: (project.technologies || []).join(', '),
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            imageUrl: project.imageUrl || '',
            featured: project.featured || false
        });
        setShowModal(true);
    };

    const handleDelete = async (projectId) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/projects/${projectId}`, {
                withCredentials: true
            });
            await fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    };

    const handleSeedSample = async () => {
        try {
            const sample = {
                title: 'Distributed Event-Driven Ingestion Pipeline',
                description: 'High-throughput telemetry ingestion service processing real-time developer statistics with sub-50ms p99 latency.',
                technologies: ['Node.js', 'Redis', 'WebSockets', 'MongoDB', 'Docker'],
                githubUrl: 'https://github.com',
                liveUrl: 'https://devdash.live',
                featured: true
            };
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/projects`, sample, {
                withCredentials: true
            });
            await fetchProjects();
        } catch (err) {
            console.error('Failed to seed sample project:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            technologies: '',
            githubUrl: '',
            liveUrl: '',
            imageUrl: '',
            featured: false
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProject(null);
        resetForm();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const activeProjects = isRecruiterMode ? mockData.projects : projects;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Projects & Systems</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your full-stack applications and system architectures</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-xs font-semibold shadow-sm cursor-pointer"
                    >
                        <Plus size={16} />
                        <span>Add Project</span>
                    </button>
                </div>
            </div>

            {/* Recruiter Demo Banner if simulated */}
            {isRecruiterMode && (
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-xs text-indigo-700 dark:text-indigo-300">
                        <Sparkles size={16} className="text-indigo-500 flex-shrink-0" />
                        <span><strong>Recruiter Demo Mode:</strong> Viewing pre-loaded distributed architectures with live metrics. Toggle demo mode in the top navbar to view your live projects.</span>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {activeProjects.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                        <FolderKanban size={28} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Projects Added Yet</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                            Add your projects with GitHub links, live URLs, and tech tags to showcase your technical capability.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all text-xs font-bold shadow-sm"
                        >
                            <Plus size={16} />
                            <span>Create Your First Project</span>
                        </button>
                        <button
                            onClick={handleSeedSample}
                            className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-semibold"
                        >
                            <Sparkles size={16} className="text-indigo-500" />
                            <span>Add Sample Architecture Project</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeProjects.map((project, idx) => (
                        <div
                            key={project._id || idx}
                            className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border ${
                                project.featured 
                                    ? 'border-indigo-300 dark:border-indigo-600/80 ring-2 ring-indigo-100 dark:ring-indigo-900/20' 
                                    : 'border-slate-200 dark:border-slate-800'
                            } p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all group`}
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
                                        {project.title}
                                    </h3>
                                    {project.featured && (
                                        <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded-full text-xs font-semibold flex items-center gap-1 flex-shrink-0">
                                            <Star size={12} /> Featured
                                        </span>
                                    )}
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {project.metrics && (
                                    <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                        <Zap size={14} className="flex-shrink-0" />
                                        <span>{project.metrics}</span>
                                    </div>
                                )}

                                {project.architecture && (
                                    <div className="mb-4 text-[11px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                                        <span className="text-indigo-400 font-bold block mb-0.5">Pipeline:</span>
                                        {project.architecture}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {(project.technologies || []).map((tech, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold"
                                        >
                                            <Github size={15} />
                                            Source Code
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors text-xs font-semibold shadow-xs"
                                        >
                                            <ExternalLink size={15} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>

                                {!isRecruiterMode && project._id && (
                                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium cursor-pointer"
                                        >
                                            <Edit size={14} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors text-xs font-medium cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. Distributed Telemetry Pipeline"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Explain the architectural choices, problem solved, and technical challenges overcome..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                    Technologies (comma separated) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                                    placeholder="React, Node.js, Express, MongoDB, Redis, Docker"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        GitHub Repository URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.githubUrl}
                                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="https://github.com/username/project"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Live Deployment URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.liveUrl}
                                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="https://myproject.vercel.app"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="featured" className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                                    Pin as Featured Project (displayed prominently in dashboard & public showcase)
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-xs font-bold shadow-md shadow-indigo-600/20 cursor-pointer"
                                >
                                    {editingProject ? 'Save Changes' : 'Publish Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
