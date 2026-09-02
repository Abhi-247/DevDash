import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Sparkles, Send } from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const DevTerminal = () => {
    const { isTerminalOpen, setIsTerminalOpen, mockData, setIsArchModalOpen } = useRecruiter();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: 'DevDash Interactive Telemetry Terminal v2.4' },
        { type: 'system', text: 'Type "help" to view available developer commands, or "sudo hire" to initiate recruiter contact.' }
    ]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyPointer, setHistoryPointer] = useState(-1);
    const [isMaximized, setIsMaximized] = useState(false);

    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Toggle with ~ / ` key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                setIsTerminalOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setIsTerminalOpen]);

    useEffect(() => {
        if (isTerminalOpen) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [isTerminalOpen, history]);

    if (!isTerminalOpen) return null;

    const executeCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: 'prompt', text: `$ ${cmd}` }];

        if (!trimmed) {
            setHistory(newHistory);
            return;
        }

        switch (trimmed) {
            case 'help':
                newHistory.push({
                    type: 'output',
                    text: `Available commands:
  • whoami       : Developer identity, philosophy & current status
  • skills       : Core tech stack & categorized engineering proficiencies
  • projects     : Production-grade systems, live metrics & architectures
  • stats        : Real-time DSA & multi-platform sync telemetry
  • arch         : Open interactive System Architecture visualizer
  • sudo hire    : [RECRUITER PRIORITY] Direct pipeline to hire this developer
  • clear        : Clear the terminal screen
  • exit         : Close the terminal`
                });
                break;

            case 'whoami':
                newHistory.push({
                    type: 'output',
                    text: `[ENGINEERING PROFILE]
Name      : ${mockData.fullName}
Role      : ${mockData.role}
Location  : ${mockData.location}
Status    : ${mockData.status}
DevScore  : ${mockData.devScore} (${mockData.percentile})
GitHub    : ${mockData.githubUrl}
Email     : ${mockData.email}`
                });
                break;

            case 'skills':
                newHistory.push({
                    type: 'output',
                    text: `[CORE PROFICIENCIES]
Frontend  : ${mockData.skillCategories.frontend.join(' • ')}
Backend   : ${mockData.skillCategories.backend.join(' • ')}
Cloud/DB  : ${mockData.skillCategories.dataAndCloud.join(' • ')}
Core DSA  : ${mockData.skillCategories.dsaAndCore.join(' • ')}`
                });
                break;

            case 'projects':
                newHistory.push({
                    type: 'output',
                    text: `[FEATURED PRODUCTION SYSTEMS]
1. ${mockData.projects[0].title}
   ↳ Tech: ${mockData.projects[0].technologies.join(', ')}
   ↳ Metric: ${mockData.projects[0].metrics}

2. ${mockData.projects[1].title}
   ↳ Tech: ${mockData.projects[1].technologies.join(', ')}
   ↳ Metric: ${mockData.projects[1].metrics}

3. ${mockData.projects[2].title}
   ↳ Tech: ${mockData.projects[2].technologies.join(', ')}
   ↳ Metric: ${mockData.projects[2].metrics}`
                });
                break;

            case 'stats':
                newHistory.push({
                    type: 'output',
                    text: `[LIVE ALGORITHMIC & TELEMETRY STATS]
LeetCode    : ${mockData.connectedProfiles.leetcode.totalSolved} Solved (Hard: ${mockData.connectedProfiles.leetcode.hardSolved}, Med: ${mockData.connectedProfiles.leetcode.mediumSolved})
Rating      : ${mockData.connectedProfiles.leetcode.contestRating} [${mockData.connectedProfiles.leetcode.badge}]
GitHub      : ${mockData.connectedProfiles.github.totalCommits} Commits, ${mockData.connectedProfiles.github.streakDays}-Day Active Streak
Codeforces  : Rating ${mockData.connectedProfiles.codeforces.rating} (${mockData.connectedProfiles.codeforces.rank})
DevScore™   : ${mockData.devScore} (Top 3.2% Global Engineering Percentile)`
                });
                break;

            case 'arch':
                newHistory.push({
                    type: 'output',
                    text: `Opening System Architecture Visualizer diagram...`
                });
                setIsArchModalOpen(true);
                break;

            case 'sudo hire':
                newHistory.push({
                    type: 'success',
                    text: `🎉 ACCESS GRANTED!
=====================================================
Thank you for recognizing top-tier engineering talent!
Candidate is ready to make immediate impact on your team.

Contact Channels:
  • Direct Email : ${mockData.email}
  • LinkedIn     : ${mockData.linkedinUrl}
  • Resume Link  : /resume

"Looking forward to engineering high-scale distributed systems together!"
=====================================================`
                });
                break;

            case 'clear':
                setHistory([]);
                return;

            case 'exit':
                setIsTerminalOpen(false);
                return;

            default:
                newHistory.push({
                    type: 'error',
                    text: `zsh: command not found: "${cmd}". Type "help" for a list of valid commands.`
                });
                break;
        }

        setHistory(newHistory);
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryPointer(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
                setHistoryPointer(nextPointer);
                setInput(commandHistory[nextPointer]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyPointer !== -1) {
                const nextPointer = historyPointer + 1;
                if (nextPointer >= commandHistory.length) {
                    setHistoryPointer(-1);
                    setInput('');
                } else {
                    setHistoryPointer(nextPointer);
                    setInput(commandHistory[nextPointer]);
                }
            }
        }
    };

    return (
        <div className={`fixed z-50 transition-all duration-300 ${
            isMaximized 
                ? 'inset-4' 
                : 'bottom-6 right-6 w-full max-w-2xl h-96'
        }`}>
            <div className="h-full w-full bg-slate-950/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-emerald-400 font-mono-code glow-cyan">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-300 select-none">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 mr-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsTerminalOpen(false)} />
                            <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
                            <span className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
                        </div>
                        <TerminalIcon size={14} className="text-cyan-400" />
                        <span className="text-xs font-semibold text-slate-200">devdash-shell — 80x24</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Toggle: ~</span>
                        <button 
                            onClick={() => setIsMaximized(!isMaximized)} 
                            className="hover:text-white p-1 rounded transition-colors"
                        >
                            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                        </button>
                        <button 
                            onClick={() => setIsTerminalOpen(false)} 
                            className="hover:text-white p-1 rounded transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs leading-relaxed selection:bg-cyan-900 selection:text-white">
                    {history.map((item, idx) => (
                        <div key={idx} className={`whitespace-pre-wrap ${
                            item.type === 'prompt' ? 'text-slate-200 font-bold' :
                            item.type === 'system' ? 'text-cyan-400/90' :
                            item.type === 'success' ? 'text-emerald-300 font-bold' :
                            item.type === 'error' ? 'text-rose-400' :
                            'text-slate-300'
                        }`}>
                            {item.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input Prompt */}
                <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2 text-xs">
                    <span className="text-cyan-400 font-bold">devdash@guest:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type 'help' or 'sudo hire'..."
                        className="flex-1 bg-transparent text-emerald-300 placeholder-slate-600 outline-none font-mono-code text-xs"
                    />
                    <button 
                        onClick={() => { executeCommand(input); setInput(''); }}
                        className="text-slate-400 hover:text-cyan-400 p-1 transition-colors"
                    >
                        <Send size={13} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DevTerminal;
