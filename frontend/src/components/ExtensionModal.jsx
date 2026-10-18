import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, CheckCircle2, Copy, ExternalLink, ArrowRight, Laptop } from 'lucide-react';

const ExtensionModal = ({ isOpen, onClose, onOpenOutreach }) => {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen) return null;

    const copyUrl = () => {
        navigator.clipboard.writeText('chrome://extensions');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-left z-10"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                                <Zap size={20} className="fill-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                    DevDash Chrome Extension
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    1-Click Cold Email HR Outreach Companion
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Highlights row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
                                <span className="text-xl">⚡</span>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">10-Second Apply</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Directly on LinkedIn & Indeed</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
                                <span className="text-xl">📄</span>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Vault Resumes</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Attached straight from DevDash</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
                                <span className="text-xl">📊</span>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">CRM Auto-Logged</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Real-time status tracking</p>
                            </div>
                        </div>

                        {/* Installation Steps */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Quick 3-Step Setup (Developer Mode)
                            </h4>

                            <div className="space-y-3">
                                {/* Step 1 */}
                                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <div className="flex-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                        <p className="font-bold text-slate-900 dark:text-white">Locate the extension directory</p>
                                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                                            The extension code is already built and located in the <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">/extension</code> folder in this project.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <div className="flex-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-slate-900 dark:text-white">Open Chrome Extensions</p>
                                            <button
                                                onClick={copyUrl}
                                                className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                            >
                                                {copied ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                                <span>{copied ? 'Copied URL!' : 'Copy URL'}</span>
                                            </button>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                                            Type <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">chrome://extensions</code> in your Chrome URL bar and switch on <strong>"Developer mode"</strong> in the top-right corner.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <div className="flex-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                        <p className="font-bold text-slate-900 dark:text-white">Load Unpacked</p>
                                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                                            Click the <strong>"Load unpacked"</strong> button in the top-left and select the <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">DevDash/extension</code> folder. DevDash is ready!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Auto-syncs with your DevDash account</span>
                        </span>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={onClose}
                                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    if (onOpenOutreach) onOpenOutreach();
                                }}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                            >
                                <span>Open DevDash CRM</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ExtensionModal;
