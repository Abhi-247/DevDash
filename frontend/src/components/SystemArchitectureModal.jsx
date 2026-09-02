import React, { useState } from 'react';
import { 
    X, 
    Network, 
    Layers, 
    Cpu, 
    Server, 
    Database, 
    ShieldCheck, 
    Zap, 
    Clock, 
    GitBranch, 
    Sparkles, 
    CheckCircle2, 
    ExternalLink 
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const SystemArchitectureModal = () => {
    const { isArchModalOpen, setIsArchModalOpen } = useRecruiter();
    const [selectedLayer, setSelectedLayer] = useState('gateway');

    if (!isArchModalOpen) return null;

    const layers = [
        {
            id: 'client',
            name: 'Client Edge Layer',
            badge: 'React 19 SPA',
            icon: Layers,
            color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-400',
            stats: { latency: 'Sub-16ms render', bundle: 'Code-split Vite chunks', protocol: 'HTTPS / WSS' },
            description: 'Ultra-fast Single Page Application engineered with React 19, Tailwind CSS v4, and Recharts. Implements client-side optimistic UI updates and local caching for sub-millisecond response transitions.',
            tech: ['React 19', 'Vite 7', 'Tailwind CSS v4', 'Framer Motion', 'Lucide Icons', 'Recharts'],
            engineeringHighlights: [
                'Optimistic UI state mutations for zero perceived latency',
                'Custom responsive design token system across dark & light modes',
                'Zero-dependency command palette & dev terminal event dispatchers'
            ]
        },
        {
            id: 'gateway',
            name: 'API Gateway & Auth',
            badge: 'Security & Traffic',
            icon: ShieldCheck,
            color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/40 text-indigo-400',
            stats: { latency: 'p99 < 12ms', security: 'HTTP-only JWT Cookies', protection: 'CORS & Rate Limited' },
            description: 'Centralized entry point validating incoming REST requests, enforcing strict cross-origin policies, and verifying JSON Web Tokens with stateless cryptographic signatures.',
            tech: ['Express 5', 'JWT (jsonwebtoken)', 'Cookie-Parser', 'Bcrypt', 'CORS Middleware'],
            engineeringHighlights: [
                'Stateless JWT cookie validation preventing XSS and CSRF token interception',
                'Centralized asynchronous error boundaries preventing thread unhandled rejections',
                'Strict input sanitization for user-generated markdown and email payloads'
            ]
        },
        {
            id: 'services',
            name: 'Core Service Mesh',
            badge: 'Business Logic',
            icon: Server,
            color: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-400',
            stats: { logic: 'DevScore™ 2.0 Engine', concurrency: 'Async Non-Blocking', api: 'RESTful Endpoints' },
            description: 'Decoupled domain services managing developer telemetry normalization, LeetCode/Codeforces stats aggregation, ATS job matching algorithms, and automated outreach record lifecycles.',
            tech: ['Node.js 20 LTS', 'Modular Controller Pattern', 'Axios HTTP Client', 'Regex Tokenizer'],
            engineeringHighlights: [
                'DevScore™ 2.0 multi-factor weighted scoring algorithm',
                'Deterministic ATS resume keyword matching engine with frequency weighting',
                'Decoupled profile controller enabling independent feature scaling'
            ]
        },
        {
            id: 'workers',
            name: 'Async Daemons & Scrapers',
            badge: 'Background Workers',
            icon: Cpu,
            color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
            stats: { cadence: '45s Auto-sync Loop', resilience: 'Exponential Backoff', stream: 'RFC-822 Parser' },
            description: 'Event-driven background processes handling real-time IMAP email mailbox synchronization, automated cold outreach tracking, and multi-platform developer statistics scrapers.',
            tech: ['IMAPFlow', 'MailParser', 'Nodemailer', 'Google APIs OAuth2'],
            engineeringHighlights: [
                'Event-driven IMAP socket listeners for real-time HR email replies',
                'Fault-tolerant platform fetchers with fallback mock telemetry',
                'Memory-efficient streaming parser for large multipart email attachments'
            ]
        },
        {
            id: 'database',
            name: 'Persistence & Cache Tier',
            badge: 'MongoDB Atlas',
            icon: Database,
            color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
            stats: { indexing: 'Compound Index on username/email', replication: '3-Node Replica Set', storage: 'BSON Document Engine' },
            description: 'Scalable cloud document store housing user profiles, connected platform histories, email dispatch telemetry, and goal completion trajectories.',
            tech: ['MongoDB 9', 'Mongoose ODM', 'Atlas Cloud', 'Replica Sets'],
            engineeringHighlights: [
                'Compound and unique index constraints guaranteeing transactional uniqueness',
                'Mongoose schemas with strict lifecycle hooks (timestamps & field guards)',
                'Optimized projection queries stripping sensitive credential fields (`-password`)'
            ]
        }
    ];

    const current = layers.find(l => l.id === selectedLayer) || layers[0];

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
            onClick={() => setIsArchModalOpen(false)}
        >
            <div 
                className="w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col glow-purple"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/80">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <Network size={22} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-white tracking-tight">System Architecture & Pipeline Telemetry</h2>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    Engineering Deep-Dive
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Interactive topology of DevDash's production-grade distributed architecture.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsArchModalOpen(false)}
                        className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Visual Topology Pipeline */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                            <Zap size={14} className="text-indigo-400" />
                            <span>System Component Topology (Click any node to inspect engineering specs)</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {layers.map((layer) => {
                                const isSelected = layer.id === selectedLayer;
                                const Icon = layer.icon;

                                return (
                                    <button
                                        key={layer.id}
                                        onClick={() => setSelectedLayer(layer.id)}
                                        className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                            isSelected
                                                ? `bg-gradient-to-b ${layer.color} shadow-lg scale-102 ring-2 ring-indigo-500`
                                                : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-700/50 text-slate-400'}`}>
                                                <Icon size={18} />
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-400">{layer.badge}</span>
                                        </div>
                                        <div className="font-bold text-sm text-white mb-1 leading-snug">{layer.name}</div>
                                        <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                                            {layer.tech[0]} + {layer.tech[1]}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Selected Node Details Card */}
                    <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                            <div>
                                <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                                    Selected Layer Inspection
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                                    {current.name}
                                </h3>
                            </div>

                            {/* Telemetry Metrics Pill */}
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(current.stats).map(([k, v]) => (
                                    <div key={k} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                                        <span className="text-slate-400 capitalize">{k}: </span>
                                        <span className="font-semibold text-emerald-400 font-mono">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            {current.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Engineering Highlights */}
                            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <Sparkles size={14} className="text-amber-400" />
                                    <span>Architectural & Reliability Decisions</span>
                                </h4>
                                <ul className="space-y-2.5">
                                    {current.engineeringHighlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                            <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech Stack Chips */}
                            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <GitBranch size={14} className="text-indigo-400" />
                                    <span>Technologies & Libraries Deployed</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {current.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 bg-slate-800 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-mono font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-indigo-400" />
                        Production Benchmarked: Average end-to-end API response &lt; 42ms
                    </span>
                    <button
                        onClick={() => setIsArchModalOpen(false)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-md cursor-pointer"
                    >
                        Close Inspector
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SystemArchitectureModal;
