import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    Search, Layers, CheckCircle2, ArrowRight, ExternalLink,
    Clock, Shield, Sparkles, RefreshCw, X, Code2, PlusCircle
} from 'lucide-react';

const IntegrationsPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const categories = [
        { id: 'all', label: 'All Platforms' },
        { id: 'cp', label: 'Competitive Programming' },
        { id: 'vcs', label: 'Version Control' },
        { id: 'interview', label: 'Interview Prep' },
        { id: 'deploy', label: 'Cloud & Deployments' }
    ];

    const platforms = [
        {
            id: 'leetcode',
            name: 'LeetCode',
            category: 'cp',
            color: '#FFA116',
            bg: 'bg-amber-500/10 text-amber-500',
            badge: 'Verified API',
            syncSpeed: 'Real-time Webhook',
            desc: 'Automatically syncs easy/medium/hard problem breakdown, global contest rating, contest rank, and active calendar heatmaps.',
            metrics: ['Total Problems Solved', 'Contest Rating & Percentile', 'Active Solving Streak', 'Skill Badges Earned'],
            howTo: 'Enter your public LeetCode username. No password or session token required.',
            sampleJson: `{
  "platform": "leetcode",
  "username": "alex_dev",
  "totalSolved": 482,
  "ranking": 14205,
  "contestRating": 1845.2,
  "badge": "Guardian"
}`
        },
        {
            id: 'github',
            name: 'GitHub',
            category: 'vcs',
            color: '#24292F',
            bg: 'bg-slate-800/10 text-slate-800 dark:text-slate-200',
            badge: 'Official OAuth',
            syncSpeed: 'Instant Webhook',
            desc: 'Pulls commit consistency, repository stars, pull request reviews, pinned projects, and primary coding language distribution.',
            metrics: ['Total Commits (Annual)', 'Total Stargazers', 'PRs Merged', 'Top Languages (Byte normalized)'],
            howTo: 'Authorize read-only access to public repositories via GitHub OAuth.',
            sampleJson: `{
  "platform": "github",
  "totalCommits": 1284,
  "totalStars": 342,
  "primaryLanguages": ["TypeScript", "Python", "Go"],
  "streakDays": 42
}`
        },
        {
            id: 'codeforces',
            name: 'Codeforces',
            category: 'cp',
            color: '#1F8ACB',
            bg: 'bg-sky-500/10 text-sky-500',
            badge: 'Direct REST API',
            syncSpeed: 'Every 4 Hours',
            desc: 'Tracks contest rating, max rating, division title (Expert/Candidate Master), and historical rating progression charts.',
            metrics: ['Current Rating', 'Max Rating', 'Global Rank', 'Contest Submissions'],
            howTo: 'Provide your Codeforces handle. DevDash connects to the official Codeforces API.',
            sampleJson: `{
  "platform": "codeforces",
  "handle": "tourist_fan",
  "rating": 1640,
  "maxRating": 1720,
  "rank": "expert"
}`
        },
        {
            id: 'hackerrank',
            name: 'HackerRank',
            category: 'interview',
            color: '#2EC866',
            bg: 'bg-emerald-500/10 text-emerald-500',
            badge: 'Public Scraper v2',
            syncSpeed: 'Every 6 Hours',
            desc: 'Syncs domain stars (Algorithms, Data Structures, Python, SQL) and certified skill verification badges.',
            metrics: ['Gold Badges (5 Stars)', 'Verified Skill Certifications', 'Problem Count'],
            howTo: 'Provide your public HackerRank profile handle.',
            sampleJson: `{
  "platform": "hackerrank",
  "stars": {"problem_solving": 5, "python": 5, "sql": 4},
  "certifications": ["Problem Solving (Advanced)", "Rest API"]
}`
        },
        {
            id: 'geeksforgeeks',
            name: 'GeeksforGeeks',
            category: 'interview',
            color: '#2F8D46',
            bg: 'bg-green-600/10 text-green-600',
            badge: 'Public API',
            syncSpeed: 'Every 12 Hours',
            desc: 'Imports your GfG overall coding score, monthly college ranking, and technical articles contributed.',
            metrics: ['Overall Coding Score', 'Institute Rank', 'Articles Authored'],
            howTo: 'Enter your GfG user profile identifier.',
            sampleJson: `{
  "platform": "geeksforgeeks",
  "codingScore": 1420,
  "instituteRank": 12,
  "problemsSolved": 310
}`
        },
        {
            id: 'codechef',
            name: 'CodeChef',
            category: 'cp',
            color: '#5B4638',
            bg: 'bg-amber-900/10 text-amber-900 dark:text-amber-200',
            badge: 'Official API',
            syncSpeed: 'Every 6 Hours',
            desc: 'Imports CodeChef star tier (1★ to 7★), division, country rank, and Long/Starters challenge stats.',
            metrics: ['Star Rating (e.g. 4★)', 'Current Rating', 'Global & Country Rank'],
            howTo: 'Enter your CodeChef handle to sync ratings.',
            sampleJson: `{
  "platform": "codechef",
  "stars": "4★",
  "rating": 1824,
  "countryRank": 340
}`
        },
        {
            id: 'vercel',
            name: 'Vercel',
            category: 'deploy',
            color: '#000000',
            bg: 'bg-slate-900/10 text-slate-900 dark:text-white',
            badge: 'OAuth Token',
            syncSpeed: 'Instant Webhook',
            desc: 'Showcase live deployed production URLs with speed scores and deployment status badges on your portfolio.',
            metrics: ['Live Production URLs', 'Fast PageSpeed Status', 'Last Deployment Time'],
            howTo: 'Connect with read-only Vercel integrations.',
            sampleJson: `{
  "platform": "vercel",
  "deployments": 18,
  "topProject": "ai-portfolio-builder.vercel.app"
}`
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            category: 'vcs',
            color: '#0A66C2',
            bg: 'bg-blue-600/10 text-blue-600',
            badge: 'Verified OAuth',
            syncSpeed: 'On Demand',
            desc: 'Showcase verified company experience and recommendations directly in your DevDash profile link.',
            metrics: ['Current Role', 'Experience Years', 'Verified Credentials'],
            howTo: 'Connect with one-click LinkedIn authorization.',
            sampleJson: `{
  "platform": "linkedin",
  "title": "Senior Software Engineer",
  "verifiedStatus": true
}`
        }
    ];

    const filteredPlatforms = platforms.filter(p => {
        const matchesCategory = category === 'all' || p.category === category;
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white overflow-x-hidden w-full transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Hero Header */}
            <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5"
                    >
                        <Layers size={14} />
                        10+ Native Connectors
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        Connect All Your Coding Hubs <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            In Under 60 Seconds
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                    >
                        DevDash aggregates verified metrics across competitive programming, code repositories, and cloud hosting into one authoritative developer profile.
                    </motion.p>

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
                        <div className="relative w-full sm:w-72">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search integrations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>

                        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                            {categories.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setCategory(c.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        category === c.id
                                            ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Grid */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlatforms.map((plat) => (
                        <div
                            key={plat.id}
                            onClick={() => setSelectedPlatform(plat)}
                            className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl ${plat.bg} flex items-center justify-center font-black text-xl shadow-sm`}>
                                            {plat.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {plat.name}
                                            </h3>
                                            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                                <Clock size={11} /> {plat.syncSpeed}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50">
                                        {plat.badge}
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
                                    {plat.desc}
                                </p>

                                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    {plat.metrics.slice(0, 3).map((m, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                                            <span>{m}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                                <span>View Sync Details</span>
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}

                    {/* Suggest Integration Card */}
                    <div 
                        onClick={() => navigate('/contact')}
                        className="bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-dashed border-indigo-200 dark:border-indigo-800/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md">
                            <PlusCircle size={24} />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                            Missing your favorite platform?
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
                            We add new developer platform connectors every month based on community votes.
                        </p>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline">
                            Request an Integration →
                        </span>
                    </div>
                </div>
            </section>

            {/* Platform Detail Modal */}
            <AnimatePresence>
                {selectedPlatform && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedPlatform(null)}
                                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${selectedPlatform.bg} flex items-center justify-center font-black text-xl`}>
                                    {selectedPlatform.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                                        {selectedPlatform.name} Integration
                                    </h3>
                                    <span className="text-xs text-emerald-500 font-bold">{selectedPlatform.badge}</span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                {selectedPlatform.desc}
                            </p>

                            <div className="mb-4">
                                <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                                    How it connects
                                </h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                                    {selectedPlatform.howTo}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                                    Normalized Payload Example
                                </h5>
                                <pre className="p-3 bg-slate-950 text-indigo-300 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800">
                                    {selectedPlatform.sampleJson}
                                </pre>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedPlatform(null);
                                    setAuthModal('signup');
                                }}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Connect {selectedPlatform.name}</span>
                                <ArrowRight size={15} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default IntegrationsPage;
