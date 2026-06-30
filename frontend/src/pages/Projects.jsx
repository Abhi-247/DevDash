import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FolderKanban, Plus, ExternalLink, Github, Trash2, Edit, Star } from 'lucide-react';

const Projects = () => {
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
            technologies: project.technologies.join(', '),
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

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Projects</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your portfolio projects</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    <Plus size={20} />
                    Add Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <FolderKanban size={48} className="mx-auto text-slate-400 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No projects yet</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Start by adding your first project to showcase your work</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        <Plus size={20} />
                        Add Your First Project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${
                                project.featured 
                                    ? 'border-indigo-300 dark:border-indigo-600 ring-2 ring-indigo-100 dark:ring-indigo-900/30' 
                                    : 'border-slate-200 dark:border-slate-700'
                            } overflow-hidden hover:shadow-md transition-shadow`}
                        >
                            {project.imageUrl && (
                                <div className="h-48 bg-slate-100 dark:bg-slate-700 relative">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {project.featured && (
                                        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                            <Star size={12} />
                                            Featured
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
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
                                <div className="flex items-center gap-2">
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
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Technologies (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    placeholder="React, Node.js, MongoDB"
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    placeholder="https://github.com/username/repo"
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Live URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.liveUrl}
                                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                    placeholder="https://your-project.com"
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://example.com/image.png"
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="featured" className="text-sm text-slate-700 dark:text-slate-300">
                                    Mark as featured
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    {editingProject ? 'Update' : 'Add'} Project
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
