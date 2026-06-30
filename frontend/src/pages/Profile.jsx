import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, MapPin, Globe, Save, Camera } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        bio: '',
        location: '',
        website: '',
        skills: []
    });
    const [skillInput, setSkillInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, {
                withCredentials: true
            });
            setProfile({
                fullName: response.data.fullName || '',
                bio: response.data.bio || '',
                location: response.data.location || '',
                website: response.data.website || '',
                skills: response.data.skills || []
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/profile/profile`, profile, {
                withCredentials: true
            });
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error updating profile');
            console.error('Error updating profile:', error);
        } finally {
            setSaving(false);
        }
    };

    const addSkill = () => {
        if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
            setProfile({
                ...profile,
                skills: [...profile.skills, skillInput.trim()]
            });
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter(skill => skill !== skillToRemove)
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Profile</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your personal information and skills</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                    {message}
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
                
                <div className="px-8 pb-8">
                    <div className="flex items-end -mt-16 mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-white dark:bg-slate-700 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                                <User size={48} className="text-slate-400" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="ml-6 mb-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {profile.fullName || 'Your Name'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Developer</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                        placeholder="San Francisco, CA"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Website
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="url"
                                        value={profile.website}
                                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Bio
                            </label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Skills
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                    className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                                    placeholder="Add a skill (e.g., JavaScript)"
                                />
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="hover:text-indigo-900 dark:hover:text-indigo-100"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={20} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
