import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Github, Star, Eye, RefreshCw, ExternalLink, GitFork, Calendar, Users } from 'lucide-react';

const GitHub = () => {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGitHubData();
    }, []);

    const fetchGitHubData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/github-data`, {
                withCredentials: true
            });
            setGithubData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            setError('GitHub is not connected or there was an error fetching data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchGitHubData();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 max-w-6xl mx-auto">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">GitHub Not Connected</h3>
                    <p className="text-yellow-700 dark:text-yellow-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.href = '/coding-profiles'}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Connect GitHub
                    </button>
                </div>
            </div>
        );
    }

    const { profile, repositories, events, analytics } = githubData;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">GitHub</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Your GitHub activity and repositories</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
                <div className="flex items-start gap-6">
                    <img
                        src={profile.avatar_url}
                        alt={profile.login}
                        className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profile.name || profile.login}</h2>
                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                                <ExternalLink size={18} />
                            </a>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">{profile.bio || 'No bio available'}</p>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Users size={18} />
                                <span><strong className="text-slate-900 dark:text-slate-100">{profile.followers}</strong> followers</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Users size={18} />
                                <span><strong className="text-slate-900 dark:text-slate-100">{profile.following}</strong> following</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <GitFork size={18} />
                                <span><strong className="text-slate-900 dark:text-slate-100">{repositories?.length || 0}</strong> repositories</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Calendar size={18} />
                                <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Language Stats */}
            {analytics?.languages && Object.keys(analytics.languages).length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Top Languages</h3>
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(analytics.languages)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 10)
                            .map(([language, count]) => (
                                <span
                                    key={language}
                                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                                >
                                    {language} ({count})
                                </span>
                            ))}
                    </div>
                </div>
            )}

            {/* Repositories */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Repositories</h3>
                {repositories && repositories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {repositories.slice(0, 12).map((repo) => (
                            <div
                                key={repo.id}
                                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400">
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.name}
                                        </a>
                                    </h4>
                                    {repo.fork && <GitFork size={16} className="text-slate-400" />}
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                                    {repo.description || 'No description'}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Star size={14} />
                                        {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Fork size={14} />
                                        {repo.forks_count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-600 dark:text-slate-400">No repositories found</p>
                )}
            </div>

            {/* Recent Activity */}
            {events && events.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mt-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {events.slice(0, 10).map((event, index) => (
                            <div key={index} className="flex items-start gap-3 text-sm">
                                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                                <div>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        <span className="font-medium">{event.type.replace('Event', '')}</span>
                                        {' on '}
                                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                            {event.repo?.name || 'unknown'}
                                        </span>
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                                        {new Date(event.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitHub;
