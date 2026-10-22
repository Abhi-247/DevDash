import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    BookOpen, Clock, User, ArrowRight, Sparkles, Tag,
    ThumbsUp, Bookmark, Share2, X, Send, CheckCircle2
} from 'lucide-react';

const BlogPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [category, setCategory] = useState('all');
    const [selectedPost, setSelectedPost] = useState(null);
    const [claps, setClaps] = useState(42);

    const categories = [
        { id: 'all', label: 'All Articles' },
        { id: 'engineering', label: 'Engineering & Architecture' },
        { id: 'careers', label: 'Tech Careers' },
        { id: 'devscore', label: 'DevScore™ Insights' },
        { id: 'cp', label: 'Competitive Programming' }
    ];

    const posts = [
        {
            id: 1,
            title: 'How DevScore 2.0 Calculates Algorithmic Developer Credibility',
            category: 'devscore',
            tag: 'Algorithm',
            readTime: '6 min read',
            date: 'Oct 14, 2026',
            author: 'Abhishek Verma',
            authorRole: 'Founder @ DevDash',
            authorAvatar: 'Abhishek',
            summary: 'A deep dive into our multi-platform credit scoring model: how we weight hard LeetCode problems against GitHub PR reviews and contest ratings.',
            content: `### The Problem with Single-Platform Metrics

For years, recruiters have judged developers by one of two flawed metrics: either their GitHub contribution graph (which can be easily automated with dummy commits) or raw LeetCode problem counts (which ignores code quality and architecture).

DevScore was engineered to synthesize multiple independent signals into a normalized 2,000-point credit rating.

#### The Core Formula Pillars

1. **Difficulty-Adjusted Problem Solved (35%)**: Solving 50 Hard dynamic programming problems yields higher weight than 300 Easy arrays.
2. **Commit Continuity & PR Velocity (30%)**: We evaluate repository stars, active merge requests, and continuous streak length while stripping out synthetic commits.
3. **Contest Percentile Ratings (25%)**: Real-time performance under time constraints on Codeforces and LeetCode Biweekly contests.
4. **Verified Breadth & Documentation (10%)**: Tech stack versatility across frontend, backend, and cloud deployments.

\`\`\`javascript
// DevScore Normalization snippet
function computeDevScore({ hardProblems, cfRating, activeStreak, stars }) {
  const problemWeight = Math.min(650, hardProblems * 5.2);
  const contestWeight = Math.min(600, (cfRating - 1000) * 0.75);
  const repoWeight = Math.min(500, stars * 12 + activeStreak * 8);
  return Math.round(problemWeight + contestWeight + repoWeight + 250);
}
\`\`\`

The result is a trustworthy, tamper-resistant score that top engineering teams and recruiters can rely on with confidence.`
        },
        {
            id: 2,
            title: 'The Cold Outreach Strategy That Got 14 Tech Screen Calls in 30 Days',
            category: 'careers',
            tag: 'Job Search',
            readTime: '5 min read',
            date: 'Oct 08, 2026',
            author: 'Sarah Chen',
            authorRole: 'Senior SWE @ Stripe',
            authorAvatar: 'Sarah',
            summary: 'Stop applying to black-hole job boards. Here is the exact template and DevDash verified portfolio link flow that 5x our response rate.',
            content: `Tech recruiters receive hundreds of identical LinkedIn applications every morning. When everyone attaches the same standard PDF resume, standing out requires proof of competence before they even open the file.

### The 3-Sentence Hook Framework

Instead of a 4-paragraph cover letter, send a crisp message directly to engineering directors and technical talent partners:

1. **Specific Value Proposition**: Mention a recent feature or repo they shipped.
2. **Verified Competence Link**: Include your \`devdash.me/u/handle\` showing your live DevScore and top 3 relevant repos.
3. **Low-friction Call-to-Action**: "Open to a 10-minute chat on Tuesday?"

DevDash's HR Outreach integration uses your personal Gmail SMTP so your emails avoid the automated promotional tab entirely.`
        },
        {
            id: 3,
            title: 'Scaling our MongoDB Cluster to 10M Profile Queries with Redis Edge Caching',
            category: 'engineering',
            tag: 'System Design',
            readTime: '8 min read',
            date: 'Sep 29, 2026',
            author: 'DevDash Infra Team',
            authorRole: 'Infrastructure',
            authorAvatar: 'InfraTeam',
            summary: 'How we reduced public portfolio TTFB from 680ms to under 45ms across 18 geographic edge locations.',
            content: `When a developer's DevDash portfolio went viral on Hacker News and Reddit, our origin servers experienced an 80x traffic spike. Here is how we redesigned our caching architecture to handle millions of reads without breaking the database.

### Edge Caching Strategy

We placed Cloudflare Workers in front of our API gateway with stale-while-revalidate policies:

- Cached public profiles expire every 15 minutes.
- When an account syncs new LeetCode stats, we emit an invalidation event via Redis Pub/Sub.
- Fast local memory lookups ensure response times stay under 50ms globally.`
        },
        {
            id: 4,
            title: 'Why LaTeX Resumes Consistently Beat Fancy Figma PDF Templates in ATS',
            category: 'careers',
            tag: 'Resume Prep',
            readTime: '4 min read',
            date: 'Sep 18, 2026',
            author: 'Marcus Vance',
            authorRole: 'Former Tech Recruiter',
            authorAvatar: 'Marcus',
            summary: 'We ran 1,000 resume designs through Greenhouse and Workday ATS parsers. The plain LaTeX structure scored 98.4% readability.',
            content: `Many designers and engineers make the mistake of creating multi-column resume templates with SVG skill bars and icons. 

### Why ATS Parsers Fail on Multi-Column Layouts

Workday and Taleo read left-to-right across the horizontal plane. When a resume has two columns, the parser frequently mashes the company name in column 1 with the technical skill in column 2, creating unreadable garbage text.

DevDash's AI Resume Builder compiles clean, single-column LaTeX code that parses with 98%+ precision.`
        },
        {
            id: 5,
            title: 'From 0 to 4★ on CodeChef: A Practical Roadmap for College Students',
            category: 'cp',
            tag: 'Competitive',
            readTime: '7 min read',
            date: 'Sep 05, 2026',
            author: 'Rohan Sharma',
            authorRole: 'Candidate Master',
            authorAvatar: 'Rohan',
            summary: 'The structured topic progression that got me past the 1800 rating barrier without burnout.',
            content: `Many students get stuck at 2 stars because they jump straight into complex tree algorithms without mastering modular arithmetic and two-pointer techniques.

Start with binary search and prefix sums, then progress into dynamic programming transitions. Tracking your daily solving streak on DevDash will keep you accountable through the plateau.`
        }
    ];

    const filteredPosts = category === 'all'
        ? posts
        : posts.filter(p => p.category === category);

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
                        <BookOpen size={14} />
                        Engineering & Career Journal
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-[900] tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
                    >
                        DevDash <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Developer Blog</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                    >
                        Technical deep-dives, DevScore algorithms, cold outreach strategies, and engineering insights from our team and community.
                    </motion.p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
                        {categories.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setCategory(c.id)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
            </section>

            {/* Articles Grid */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                                        {post.tag}
                                    </span>
                                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                        <Clock size={12} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-3">
                                    {post.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6">
                                    {post.summary}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorAvatar}`}
                                        alt={post.author}
                                        className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{post.author}</p>
                                        <p className="text-[10px] text-slate-400">{post.date}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Read →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reading Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X size={22} />
                            </button>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                    {selectedPost.tag}
                                </span>
                                <span className="text-xs text-slate-400">• {selectedPost.readTime} • {selectedPost.date}</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white leading-tight mb-4">
                                {selectedPost.title}
                            </h2>

                            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPost.authorAvatar}`}
                                    alt={selectedPost.author}
                                    className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950"
                                />
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPost.author}</p>
                                    <p className="text-xs text-slate-400">{selectedPost.authorRole}</p>
                                </div>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
                                {selectedPost.content}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <button
                                    onClick={() => setClaps(claps + 1)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                                >
                                    <ThumbsUp size={15} className="text-indigo-600 dark:text-indigo-400" />
                                    <span>{claps} Claps</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedPost(null);
                                        setAuthModal('signup');
                                    }}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
                                >
                                    Join DevDash Free
                                </button>
                            </div>
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

export default BlogPage;
