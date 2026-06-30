import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Target, Plus, Trash2, Edit, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetDate: '',
        status: 'pending',
        progress: 0
    });

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setGoals(response.data.goals || []);
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingGoal) {
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/goals/${editingGoal._id}`, formData, {
                    withCredentials: true
                });
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/goals`, formData, {
                    withCredentials: true
                });
            }
            await fetchGoals();
            setShowModal(false);
            setEditingGoal(null);
            resetForm();
        } catch (error) {
            console.error('Error saving goal:', error);
            alert('Error saving goal');
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setFormData({
            title: goal.title,
            description: goal.description,
            targetDate: goal.targetDate ? goal.targetDate.split('T')[0] : '',
            status: goal.status,
            progress: goal.progress
        });
        setShowModal(true);
    };

    const handleDelete = async (goalId) => {
        if (!confirm('Are you sure you want to delete this goal?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/goals/${goalId}`, {
                withCredentials: true
            });
            await fetchGoals();
        } catch (error) {
            console.error('Error deleting goal:', error);
            alert('Error deleting goal');
        }
    };

    const handleProgressUpdate = async (goalId, newProgress) => {
        try {
            const goal = goals.find(g => g._id === goalId);
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/goals/${goalId}`, {
                ...goal,
                progress: newProgress,
                status: newProgress === 100 ? 'completed' : goal.status
            }, {
                withCredentials: true
            });
            await fetchGoals();
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            targetDate: '',
            status: 'pending',
            progress: 0
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingGoal(null);
        resetForm();
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircle2,
                    color: 'text-green-600 dark:text-green-400',
                    bgColor: 'bg-green-100 dark:bg-green-900/30',
                    borderColor: 'border-green-300 dark:border-green-600'
                };
            case 'in-progress':
                return {
                    icon: Clock,
                    color: 'text-blue-600 dark:text-blue-400',
                    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                    borderColor: 'border-blue-300 dark:border-blue-600'
                };
            default:
                return {
                    icon: AlertCircle,
                    color: 'text-yellow-600 dark:text-yellow-400',
                    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
                    borderColor: 'border-yellow-300 dark:border-yellow-600'
                };
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const completedGoals = goals.filter(g => g.status === 'completed');
    const inProgressGoals = goals.filter(g => g.status === 'in-progress');
    const pendingGoals = goals.filter(g => g.status === 'pending');

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Goals</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Track your learning and development goals</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    <Plus size={20} />
                    Add Goal
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                            <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pendingGoals.length}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Pending Goals</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{inProgressGoals.length}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">In Progress</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{completedGoals.length}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Completed</p>
                </div>
            </div>

            {goals.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Target size={48} className="mx-auto text-slate-400 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No goals yet</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Set your first goal to track your progress</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus size={20} />
                        Add Your First Goal
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* In Progress */}
                    {inProgressGoals.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">In Progress</h3>
                            <div className="space-y-4">
                                {inProgressGoals.map((goal) => (
                                    <GoalCard
                                        key={goal._id}
                                        goal={goal}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onProgressUpdate={handleProgressUpdate}
                                        getStatusConfig={getStatusConfig}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pending */}
                    {pendingGoals.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Pending</h3>
                            <div className="space-y-4">
                                {pendingGoals.map((goal) => (
                                    <GoalCard
                                        key={goal._id}
                                        goal={goal}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onProgressUpdate={handleProgressUpdate}
                                        getStatusConfig={getStatusConfig}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed */}
                    {completedGoals.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Completed</h3>
                            <div className="space-y-4">
                                {completedGoals.map((goal) => (
                                    <GoalCard
                                        key={goal._id}
                                        goal={goal}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onProgressUpdate={handleProgressUpdate}
                                        getStatusConfig={getStatusConfig}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
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
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Target Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.targetDate}
                                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Progress: {formData.progress}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                    className="w-full"
                                />
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
                                    {editingGoal ? 'Update' : 'Add'} Goal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const GoalCard = ({ goal, onEdit, onDelete, onProgressUpdate, getStatusConfig }) => {
    const statusConfig = getStatusConfig(goal.status);
    const StatusIcon = statusConfig.icon;

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${statusConfig.borderColor} p-6`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${statusConfig.bgColor} rounded-lg flex items-center justify-center`}>
                        <StatusIcon size={20} className={statusConfig.color} />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{goal.title}</h4>
                        {goal.targetDate && (
                            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <Calendar size={14} />
                                {new Date(goal.targetDate).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(goal)}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(goal._id)}
                        className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {goal.description && (
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{goal.description}</p>
            )}

            <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                    />
                </div>
            </div>

            {goal.status !== 'completed' && (
                <div className="flex gap-2">
                    {[0, 25, 50, 75, 100].map((value) => (
                        <button
                            key={value}
                            onClick={() => onProgressUpdate(goal._id, value)}
                            className={`flex-1 py-1 text-xs rounded transition-colors ${
                                goal.progress === value
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            {value}%
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Goals;
