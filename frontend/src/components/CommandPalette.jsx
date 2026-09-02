import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Search, 
    LayoutDashboard, 
    User, 
    Link as LinkIcon, 
    FolderKanban, 
    FileText, 
    Mail, 
    Briefcase, 
    BarChart3, 
    Target, 
    Settings, 
    Terminal, 
    Network, 
    Copy, 
    Check, 
    Sparkles, 
    X,
    ArrowRight
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const CommandPalette = () => {
    const navigate = useNavigate();
    const { 
        isCommandPaletteOpen, 
        setIsCommandPaletteOpen, 
        isRecruiterMode, 
        toggleRecruiterMode,
        setIsArchModalOpen,
        setIsTerminalOpen
    } = useRecruiter();

    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);

    // Global keyboard shortcut listener (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(prev => !prev);
            } else if (e.key === 'Escape' && isCommandPaletteOpen) {
                setIsCommandPaletteOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

    // Auto-focus input when opened
    useEffect(() => {
        if (isCommandPaletteOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isCommandPaletteOpen]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/u/me`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const commands = [
        {
            category: 'Navigation',
            items: [
                { id: 'dash', label: 'Go to Dashboard', icon: LayoutDashboard, action: () => navigate('/dashboard') },
                { id: 'projects', label: 'Go to Projects & Systems', icon: FolderKanban, action: () => navigate('/projects') },
                { id: 'profiles', label: 'Go to Coding Platforms (LeetCode, GitHub)', icon: LinkIcon, action: () => navigate('/coding-profiles') },
                { id: 'resume', label: 'Go to Resume & ATS Matcher', icon: FileText, action: () => navigate('/resume') },
                { id: 'outreach', label: 'Go to HR Outreach & Cold Pitch', icon: Mail, action: () => navigate('/hr-outreach') },
                { id: 'showcase', label: 'Go to Public Showcase Profile', icon: Briefcase, action: () => navigate('/u/me') },
                { id: 'analytics', label: 'Go to Developer Analytics', icon: BarChart3, action: () => navigate('/analytics') },
                { id: 'goals', label: 'Go to Engineering Goals', icon: Target, action: () => navigate('/goals') },
                { id: 'settings', label: 'Go to Account Settings', icon: Settings, action: () => navigate('/settings') },
            ]
        },
        {
            category: 'Recruiter & Engineering Tools',
            items: [
                { 
                    id: 'toggle-recruiter', 
                    label: isRecruiterMode ? 'Turn OFF Recruiter Demo Mode' : 'Turn ON Recruiter Demo Mode', 
                    icon: Sparkles, 
                    badge: isRecruiterMode ? 'Active (Demo)' : 'Inactive',
                    action: () => toggleRecruiterMode() 
                },
                { 
                    id: 'arch-modal', 
                    label: 'Inspect System Architecture Diagram', 
                    icon: Network, 
                    badge: 'Interactive Flow',
                    action: () => setIsArchModalOpen(true) 
                },
                { 
                    id: 'terminal', 
                    label: 'Open Interactive Dev Terminal', 
                    icon: Terminal, 
                    badge: 'Shortcut: ~',
                    action: () => setIsTerminalOpen(true) 
                },
                { 
                    id: 'copy-link', 
                    label: copied ? 'Copied Showcase URL!' : 'Copy Public Portfolio URL', 
                    icon: copied ? Check : Copy, 
                    action: handleCopyLink 
                }
            ]
        }
    ];

    // Filter items by query
    const filteredCategories = commands.map(cat => ({
        category: cat.category,
        items: cat.items.filter(item => 
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            cat.category.toLowerCase().includes(query.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    const allFlatItems = filteredCategories.flatMap(cat => cat.items);

    const handleSelect = (item) => {
        item.action();
        setIsCommandPaletteOpen(false);
    };

    // Keyboard navigation within the list
    const handleListKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % (allFlatItems.length || 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + allFlatItems.length) % (allFlatItems.length || 1));
        } else if (e.key === 'Enter' && allFlatItems[selectedIndex]) {
            e.preventDefault();
            handleSelect(allFlatItems[selectedIndex]);
        }
    };

    if (!isCommandPaletteOpen) return null;

    let runningIndex = 0;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsCommandPaletteOpen(false)}
        >
            <div 
                className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col glow-purple"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Bar Header */}
                <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
                    <Search size={20} className="text-indigo-400 mr-3 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleListKeyDown}
                        placeholder="Type a command, page, or search tools (e.g. 'architecture', 'recruiter')..."
                        className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base outline-none font-medium"
                    />
                    <div className="flex items-center gap-1.5 ml-2">
                        <kbd className="px-2 py-0.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">ESC</kbd>
                    </div>
                </div>

                {/* Items List */}
                <div className="max-h-96 overflow-y-auto p-2 space-y-4">
                    {filteredCategories.length === 0 ? (
                        <div className="py-12 text-center text-slate-400">
                            <p className="text-sm">No commands found for "{query}"</p>
                            <p className="text-xs text-slate-500 mt-1">Try searching for 'dashboard', 'projects', or 'architecture'</p>
                        </div>
                    ) : (
                        filteredCategories.map((group) => (
                            <div key={group.category}>
                                <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {group.category}
                                </div>
                                <div className="space-y-1 mt-1">
                                    {group.items.map((item) => {
                                        const currentIndex = runningIndex++;
                                        const isSelected = currentIndex === selectedIndex;
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => handleSelect(item)}
                                                onMouseEnter={() => setSelectedIndex(currentIndex)}
                                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all ${
                                                    isSelected 
                                                        ? 'bg-indigo-600 text-white shadow-md' 
                                                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                        <Icon size={16} />
                                                    </div>
                                                    <span>{item.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item.badge && (
                                                        <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                                                            isSelected 
                                                                ? 'bg-white/20 text-white' 
                                                                : 'bg-indigo-950/80 text-indigo-400 border border-indigo-800/40'
                                                        }`}>
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                    {isSelected && <ArrowRight size={14} className="animate-pulse" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer hints */}
                <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">↑↓</kbd> Navigate
                        </span>
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">↵</kbd> Select
                        </span>
                    </div>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                        <Sparkles size={12} /> DevDash Command Hub
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
