import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import Login from './Login';
import Signup from './Signup';
import {
    BookOpen, Search, Code2, Terminal, Check, Copy,
    ChevronRight, ExternalLink, ThumbsUp, ThumbsDown,
    Layers, Cpu, FileText, Send, ShieldCheck, Zap
} from 'lucide-react';

const DocsPage = () => {
    const navigate = useNavigate();
    const [authModal, setAuthModal] = useState(null);
    const [activeSection, setActiveSection] = useState('quickstart');
    const [codeLang, setCodeLang] = useState('javascript');
    const [copied, setCopied] = useState(false);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const docSections = [
        { id: 'quickstart', label: '1. Quickstart Guide', icon: Zap },
        { id: 'accounts', label: '2. Connecting Accounts', icon: Layers },
        { id: 'devscore', label: '3. DevScore™ Algorithm', icon: Cpu },
        { id: 'resume', label: '4. AI Resume Builder', icon: FileText },
        { id: 'outreach', label: '5. Gmail SMTP Outreach', icon: Send },
        { id: 'api', label: '6. REST API & Webhooks', icon: Terminal }
    ];

    const codeExamples = {
        javascript: `// Fetch verified developer profile via DevDash API
const response = await fetch('https://api.devdash.me/v1/u/alexdev', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const { devScore, platforms, verified } = await response.json();
console.log(\`DevScore: \${devScore} | Verified: \${verified}\`);`,
        curl: `# Direct cURL request for developer credentials
curl -X GET "https://api.devdash.me/v1/u/alexdev" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`,
        python: `# Python SDK / requests example
import requests

url = "https://api.devdash.me/v1/u/alexdev"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

res = requests.get(url, headers=headers)
profile = res.json()

print(f"DevScore: {profile['devScore']} - Rank: {profile['tier']}")`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(codeExamples[codeLang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-600 selection:text-white overflow-x-hidden w-full transition-colors duration-300">
            <PublicNavbar onOpenAuth={setAuthModal} />

            {/* Header */}
            <section className="pt-32 pb-8 px-6 text-center border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <BookOpen size={14} /> Documentation &amp; Reference
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-[900] text-slate-900 dark:text-white tracking-tight mb-3">
                        DevDash Documentation
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        Learn how to configure profile sync, customize your devdash.me URL, build LaTeX resumes, and integrate our REST APIs.
                    </p>
                </div>
            </section>

            {/* Docs Main Content with Sidebar */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8 items-start">
                {/* Sticky Left Navigation */}
                <div className="lg:col-span-3 lg:sticky lg:top-28 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 py-1">
                        Table of Contents
                    </p>
                    {docSections.map((sec) => (
                        <button
                            key={sec.id}
                            onClick={() => {
                                setActiveSection(sec.id);
                                window.scrollTo({ top: 220, behavior: 'smooth' });
                            }}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                                activeSection === sec.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                            }`}
                        >
                            <sec.icon size={15} />
                            <span>{sec.label}</span>
                        </button>
                    ))}
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
                    {activeSection === 'quickstart' && (
                        <div className="space-y-6">
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Section 1
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight">
                                Quickstart Guide
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Welcome to DevDash. Getting your developer identity operational takes less than two minutes:
                            </p>

                            <ol className="list-decimal pl-5 space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                                <li>
                                    <strong>Create an account:</strong> Sign up with your email or connect via GitHub OAuth.
                                </li>
                                <li>
                                    <strong>Link your coding handles:</strong> Go to the Accounts section and enter your public handles for LeetCode, GitHub, Codeforces, and LinkedIn.
                                </li>
                                <li>
                                    <strong>Compute DevScore™:</strong> Our background workers will query the APIs and calculate your unified developer score.
                                </li>
                                <li>
                                    <strong>Share your profile:</strong> Claim your customized link at <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400">devdash.me/u/yourhandle</code>.
                                </li>
                            </ol>
                        </div>
                    )}

                    {activeSection === 'accounts' && (
                        <div className="space-y-6">
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Section 2
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight">
                                Connecting Accounts &amp; Privacy
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                DevDash connects to platforms using public APIs and read-only token handshakes. We never ask for your account passwords.
                            </p>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 text-xs text-slate-700 dark:text-slate-300">
                                <strong>💡 Pro Tip:</strong> Ensure your LeetCode and Codeforces profile privacy is set to "Public" so our GraphQL scraper can query your contest ratings.
                            </div>
                        </div>
                    )}

                    {activeSection === 'devscore' && (
                        <div className="space-y-6">
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Section 3
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight">
                                DevScore™ Algorithmic Specification
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                DevScore is rated on a scale of 0 to 2,000 points. The algorithm normalizes different platform scales into an unbiased composite rating:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                                <li><strong>Problem Solving (35%):</strong> Hard problems carry 3x the weight of Easy problems.</li>
                                <li><strong>Repository Consistency (30%):</strong> Commit velocity, stars, and pull requests over 12 rolling months.</li>
                                <li><strong>Contest Ratings (25%):</strong> Codeforces / LeetCode contest percentiles.</li>
                                <li><strong>Stack Diversity (10%):</strong> Polyglot versatility across languages and deployment platforms.</li>
                            </ul>
                        </div>
                    )}

                    {activeSection === 'resume' && (
                        <div className="space-y-6">
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Section 4
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight">
                                AI Resume Builder &amp; LaTeX Export
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                DevDash includes a clean single-column LaTeX template engineered specifically to achieve a 98%+ pass rate through modern Applicant Tracking Systems (ATS).
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Our LLM prompt engine rewrites passive job descriptions into action-oriented statements following Google's "Accomplished [X], as measured by [Y], by doing [Z]" framework.
                            </p>
                        </div>
                    )}

                    {activeSection === 'outreach' && (
                        <div className="space-y-6">
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Section 5
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight">
                                Gmail SMTP Relay &amp; HR Outreach
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                To protect your domain reputation, DevDash sends outreach emails directly through your own Gmail account using a 16-character Google App Password.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                                SMTP Host: smtp.gmail.com<br />
                                Port: 465 (SSL) / 587 (TLS)<br />
                                Security: AES-256 encrypted credential vault
                            </div>
                        </div>
                    )}

                    {activeSection === 'api' && (
                        <div className="space-y-6">
                            <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                Section 6
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white tracking-tight">
                                REST API &amp; Webhooks
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Query verified developer credentials directly into your company ATS or custom portfolio using our public REST endpoints.
                            </p>

                            {/* Code Snippet Box */}
                            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-white">
                                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                                    <div className="flex gap-2">
                                        {['javascript', 'curl', 'python'].map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setCodeLang(lang)}
                                                className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                                                    codeLang === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                                    >
                                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                        <span>{copied ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                                <pre className="p-4 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
                                    {codeExamples[codeLang]}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Feedback Footer */}
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500">
                            Did this documentation page help you?
                        </div>
                        {feedbackSent ? (
                            <span className="text-xs font-bold text-emerald-500">
                                Thanks for your feedback! 🙌
                            </span>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setFeedbackSent(true)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                                >
                                    <ThumbsUp size={13} /> Yes
                                </button>
                                <button
                                    onClick={() => setFeedbackSent(true)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                                >
                                    <ThumbsDown size={13} /> No
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PublicFooter />

            {/* Auth Modals */}
            {authModal === 'login' && <Login isModal onClose={() => setAuthModal(null)} onSwitchToSignup={() => setAuthModal('signup')} />}
            {authModal === 'signup' && <Signup isModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal('login')} />}
        </div>
    );
};

export default DocsPage;
