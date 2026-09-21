import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Mail, 
    Send, 
    Upload, 
    FileText, 
    History, 
    CheckCircle2, 
    Clock, 
    Trash2, 
    Eye, 
    Sparkles, 
    Building2, 
    Briefcase, 
    Search,
    Paperclip,
    AlertCircle,
    X,
    FileCheck,
    Calendar,
    ChevronDown,
    RefreshCw,
    MessageSquare,
    AlertTriangle
} from 'lucide-react';
import { useRecruiter } from '../context/RecruiterContext';

const MOCK_OUTREACH_RECORDS = [
    {
        _id: 'rec-1',
        companyName: 'Stripe',
        hrEmail: 'engineering-recruiting@stripe.com',
        position: 'Full Stack Engineer (Payments Infrastructure)',
        subject: 'Application for Full Stack Engineer - Abhishek Verma',
        status: 'interviewing',
        source: 'app_email',
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Technical screen scheduled for Thursday.'
    },
    {
        _id: 'rec-2',
        companyName: 'Vercel',
        hrEmail: 'talent@vercel.com',
        position: 'Frontend Systems Engineer',
        subject: 'Application for Frontend Systems Role - Abhishek Verma',
        status: 'replied',
        source: 'gmail_sync',
        sentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Recruiter requested portfolio & GitHub link.'
    },
    {
        _id: 'rec-3',
        companyName: 'Datadog',
        hrEmail: 'careers@datadog.com',
        position: 'Software Engineer - Telemetry Core',
        subject: 'Telemetry Platform Engineer Application - Abhishek Verma',
        status: 'interviewing',
        source: 'app_email',
        sentAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Passed initial recruiter screening.'
    },
    {
        _id: 'rec-4',
        companyName: 'Uber',
        hrEmail: 'tech-hiring@uber.com',
        position: 'Distributed Systems Engineer',
        subject: 'Software Engineer Application - Abhishek Verma',
        status: 'sent',
        source: 'app_email',
        sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Application submitted with verified DevScore.'
    }
];

const HROutreach = () => {
    const { isRecruiterMode } = useRecruiter();
    const [activeTab, setActiveTab] = useState('compose'); // 'compose' | 'history' | 'vault'
    const [records, setRecords] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all'); // 'all' | 'app_email' | 'gmail_sync'
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Gmail integration state
    const [gmailStatus, setGmailStatus] = useState({ connected: false, email: '', lastSynced: null });
    const [syncingGmail, setSyncingGmail] = useState(false);
    const [connectingGmail, setConnectingGmail] = useState(false);
    const [emailConnectModal, setEmailConnectModal] = useState(false);
    const [manualGmailEmail, setManualGmailEmail] = useState('');
    const [manualAppPassword, setManualAppPassword] = useState('');

    const currentUser = (() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    })();

    // Toast Notification state
    const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

    // Delete Confirmation Modal state
    const [deleteModal, setDeleteModal] = useState(null); // { type: 'record' | 'resume', id, title }

    // Form state
    const [formData, setFormData] = useState({
        hrEmail: '',
        companyName: '',
        position: 'Software Engineer',
        subject: '',
        body: '',
        selectedResumeId: ''
    });

    // Vault Upload Form State
    const [uploadTitle, setUploadTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    // Templates preset
    const templates = [
        {
            title: 'Cold Outreach Pitch',
            subject: 'Application for Software Engineer Role - [Your Name]',
            body: `Hi [HR Name/Hiring Team],

I came across [Company Name] and was immensely impressed by your recent engineering work. As a Full Stack Developer specializing in React, Node.js, and modern web architectures, I would love to contribute to your team.

Attached is my resume for your review. Looking forward to discussing how I can add value to your engineering team.

Best regards,`
        },
        {
            title: 'Application Follow-up',
            subject: 'Following up on Software Engineer application - [Your Name]',
            body: `Hi Hiring Manager,

I hope you're doing well.

I wanted to follow up on my application for the Software Engineer position submitted on [Date]. I remain very interested in the opportunity to join [Company Name] and would appreciate any updates regarding the status of my application or the next steps in the hiring process.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,`
        }
    ];

    useEffect(() => {
        fetchInitialData();

        // Real-time auto-sync interval: automatically checks for new Gmail applications every 45s
        const autoSyncInterval = setInterval(() => {
            if (gmailStatus.connected && !syncingGmail) {
                handleSilentSync();
            }
        }, 45000);

        return () => clearInterval(autoSyncInterval);
    }, [gmailStatus.connected]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const getAuthConfig = () => {
        const token = localStorage.getItem('token');
        return {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        };
    };

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const config = getAuthConfig();
            const [historyRes, vaultRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/history`, config),
                axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/resumes`, config)
            ]);
            const liveRecords = historyRes.data || [];
            if (isRecruiterMode) {
                setRecords(MOCK_OUTREACH_RECORDS);
            } else {
                setRecords(liveRecords);
            }
            setResumes(vaultRes.data || []);
            if (vaultRes.data?.length > 0 && !formData.selectedResumeId) {
                setFormData(prev => ({ ...prev, selectedResumeId: vaultRes.data[0]._id }));
            }
            fetchGmailStatus();
        } catch (error) {
            console.warn('Error fetching outreach data:', error);
            if (isRecruiterMode) {
                setRecords(MOCK_OUTREACH_RECORDS);
            } else {
                setRecords([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchGmailStatus = async () => {
        try {
            const config = getAuthConfig();
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/gmail/status`, config);
            setGmailStatus(res.data || { connected: false, email: '', lastSynced: null });
        } catch (err) {
            console.error('Error fetching Gmail status:', err);
        }
    };

    const handleGoogleOAuthConnect = () => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
            showToast('Google Client ID not configured', 'error');
            return;
        }

        if (window.google?.accounts?.oauth2) {
            setConnectingGmail(true);
            try {
                const client = window.google.accounts.oauth2.initTokenClient({
                    client_id: clientId,
                    scope: 'email profile openid',
                    callback: async (tokenResponse) => {
                        if (tokenResponse?.access_token) {
                            try {
                                const config = getAuthConfig();
                                const res = await axios.post(
                                    `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/gmail/connect-google`,
                                    { accessToken: tokenResponse.access_token },
                                    config
                                );
                                setGmailStatus({
                                    connected: true,
                                    email: res.data.email,
                                    lastSynced: res.data.lastSynced
                                });
                                showToast(`Gmail connected: ${res.data.email}`, 'success');
                                setEmailConnectModal(false);
                                handleSyncGmail();
                            } catch (err) {
                                console.error('Error connecting Google account:', err);
                                showToast('Failed to complete Google authorization.', 'error');
                            } finally {
                                setConnectingGmail(false);
                            }
                        } else {
                            setConnectingGmail(false);
                        }
                    },
                    error_callback: (err) => {
                        console.warn('Google OAuth error:', err);
                        setConnectingGmail(false);
                        if (err?.type === 'access_denied') {
                            showToast('Access blocked by Google. Add your email to Test Users in Google Console, or use Direct Connect below.', 'error');
                        } else {
                            showToast('Google authorization cancelled or closed.', 'info');
                        }
                    }
                });
                client.requestAccessToken({ prompt: 'consent' });
            } catch (err) {
                console.error('Failed to init token client:', err);
                setConnectingGmail(false);
                showToast('Failed to open Google authorization.', 'error');
            }
        } else {
            showToast('Google services loading. Please try again in a moment.', 'info');
        }
    };

    const handleConnectGmail = async (targetEmailInput, targetPassInput) => {
        setConnectingGmail(true);
        try {
            const config = getAuthConfig();
            const targetEmail = targetEmailInput || manualGmailEmail || currentUser?.email;
            const targetPass = targetPassInput || manualAppPassword;

            if (!targetEmail) {
                showToast('Please enter a valid Gmail address.', 'error');
                setConnectingGmail(false);
                return;
            }

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/gmail/connect`,
                { email: targetEmail, appPassword: targetPass },
                config
            );

            setGmailStatus({
                connected: true,
                email: res.data.email,
                lastSynced: res.data.lastSynced
            });
            showToast(`Gmail connected: ${res.data.email}`, 'success');
            setEmailConnectModal(false);
            setManualGmailEmail('');
            setManualAppPassword('');

            handleSyncGmail();
        } catch (error) {
            console.error('Error connecting Gmail:', error);
            showToast(error.response?.data?.message || 'Failed to connect Gmail account.', 'error');
        } finally {
            setConnectingGmail(false);
        }
    };

    const handleDisconnectGmail = async () => {
        try {
            const config = getAuthConfig();
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/gmail/disconnect`, {}, config);
            setGmailStatus({ connected: false, email: '', lastSynced: null });
            showToast('Gmail account disconnected.', 'info');
        } catch (error) {
            console.error('Error disconnecting Gmail:', error);
            showToast('Failed to disconnect Gmail.', 'error');
        }
    };

    const handleSyncGmail = async () => {
        setSyncingGmail(true);
        try {
            const config = getAuthConfig();
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/gmail/sync`, {}, config);
            
            if (res.data.records) {
                setRecords(res.data.records);
            } else {
                fetchInitialData();
            }
            if (res.data.lastSynced) {
                setGmailStatus(prev => ({ ...prev, lastSynced: res.data.lastSynced }));
            }
            showToast(res.data.message || 'Gmail sync completed!', 'success');
        } catch (error) {
            console.error('Error syncing Gmail:', error);
            showToast(error.response?.data?.message || 'Failed to sync Gmail applications.', 'error');
        } finally {
            setSyncingGmail(false);
        }
    };

    const handleSilentSync = async () => {
        try {
            const config = getAuthConfig();
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/gmail/sync`, {}, config);
            if (res.data.records) {
                setRecords(res.data.records);
            }
            if (res.data.lastSynced) {
                setGmailStatus(prev => ({ ...prev, lastSynced: res.data.lastSynced }));
            }
        } catch (error) {
            // silent catch for background auto-sync
        }
    };

    const applyTemplate = (template) => {
        setFormData(prev => ({
            ...prev,
            subject: template.subject.replace('[Company Name]', prev.companyName || '[Company Name]'),
            body: template.body.replace(/\[Company Name\]/g, prev.companyName || '[Company Name]')
        }));
        showToast(`Applied ${template.title} template`, 'info');
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!formData.hrEmail || !formData.subject || !formData.body) {
            showToast('Please fill in HR Email, Subject, and Email Body.', 'error');
            return;
        }

        setSending(true);
        try {
            const selectedResume = resumes.find(r => r._id === formData.selectedResumeId);
            
            const payload = {
                hrEmail: formData.hrEmail,
                companyName: formData.companyName || 'Target Company',
                position: formData.position || 'Software Engineer',
                subject: formData.subject,
                body: formData.body,
                resumeId: selectedResume?._id || '',
                resumeTitle: selectedResume?.fileName || selectedResume?.title || '',
                resumeData: selectedResume?.fileData || ''
            };

            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/send`, payload, getAuthConfig());

            showToast(res.data?.message || 'HR Email sent & saved to Application Records!', 'success');
            if (res.data?.record) {
                setRecords(prev => [res.data.record, ...prev.filter(r => r._id !== res.data.record._id)]);
            }
            setFormData({
                hrEmail: '',
                companyName: '',
                position: 'Software Engineer',
                subject: '',
                body: '',
                selectedResumeId: resumes[0]?._id || ''
            });
            setActiveTab('history');
            fetchInitialData();
        } catch (error) {
            console.error('Error sending HR email:', error);
            showToast(error.response?.data?.message || 'Failed to send HR email.', 'error');
        } finally {
            setSending(false);
        }
    };

    const handleUpdateStatus = async (recordId, newStatus) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/history/${recordId}/status`,
                { status: newStatus },
                getAuthConfig()
            );
            setRecords(records.map(r => r._id === recordId ? response.data : r));
            showToast(`Status updated to ${newStatus.toUpperCase()}`, 'success');
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('Failed to update status.', 'error');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('File size exceeds 5MB limit.', 'error');
                return;
            }
            setSelectedFile(file);
            if (!uploadTitle) {
                setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
            }
        }
    };

    const handleUploadResume = async (e) => {
        e.preventDefault();
        if (!selectedFile || !uploadTitle) {
            showToast('Please select a file and enter a title.', 'error');
            return;
        }

        setUploading(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = async () => {
                const base64Data = reader.result;
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/resumes`, {
                    title: uploadTitle,
                    fileName: selectedFile.name,
                    fileData: base64Data,
                    fileSize: `${(selectedFile.size / 1024).toFixed(0)} KB`
                }, getAuthConfig());

                showToast('Resume saved successfully to Vault!', 'success');
                setUploadTitle('');
                setSelectedFile(null);
                fetchInitialData();
            };
        } catch (error) {
            console.error('Error uploading resume:', error);
            showToast('Failed to upload resume.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const confirmDeleteRecord = async () => {
        if (!deleteModal) return;
        try {
            if (deleteModal.type === 'record') {
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/history/${deleteModal.id}`, getAuthConfig());
                setRecords(records.filter(r => r._id !== deleteModal.id));
                if (selectedRecord?._id === deleteModal.id) setSelectedRecord(null);
                showToast('Outreach record deleted successfully.', 'info');
            } else if (deleteModal.type === 'resume') {
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/outreach/resumes/${deleteModal.id}`, getAuthConfig());
                setResumes(resumes.filter(r => r._id !== deleteModal.id));
                showToast('Resume deleted from Vault.', 'info');
            }
        } catch (error) {
            console.error('Error executing delete:', error);
            showToast('Error executing delete.', 'error');
        } finally {
            setDeleteModal(null);
        }
    };

    const handlePrepareFollowUp = (record) => {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userName = user?.fullName || user?.name || user?.username || 'Abhishek Verma';
        const formattedDate = new Date(record.sentAt || record.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        setFormData({
            hrEmail: record.hrEmail,
            companyName: record.companyName,
            position: record.position || 'Software Engineer',
            subject: `Following up on ${record.position || 'Software Engineer'} application - ${userName}`,
            body: `Hi Hiring Manager,\n\nI hope you're doing well.\n\nI wanted to follow up on my application for the ${record.position || 'Software Engineer'} position submitted on ${formattedDate}. I remain very interested in the opportunity to join ${record.companyName} and would appreciate any updates regarding the status of my application or the next steps in the hiring process.\n\nThank you for your time and consideration. I look forward to hearing from you.\n\nBest regards,\n\n${userName}`,
            selectedResumeId: resumes[0]?._id || ''
        });
        setActiveTab('compose');
        showToast(`Follow-up email pre-filled for ${record.companyName}!`, 'info');
    };

    // Calculate follow-up due date (Application Date + 3 days)
    const getFollowUpStatus = (sentAtDate) => {
        const date = new Date(sentAtDate);
        const followUpDate = new Date(date);
        followUpDate.setDate(date.getDate() + 3);

        const now = new Date();
        const diffTime = followUpDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
            return { label: 'Follow-up Due', color: 'text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20', dateStr: followUpDate.toLocaleDateString() };
        }
        return { label: `In ${diffDays} days`, color: 'text-slate-500 font-medium', dateStr: followUpDate.toLocaleDateString() };
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'delivered':
            case 'sent':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'replied':
                return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
            case 'interviewing':
                return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
            case 'offered':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-bold';
            case 'rejected':
                return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
            case 'failed':
                return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
            default:
                return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
        }
    };

    const filteredRecords = records.filter(r => {
        const matchesSearch = 
            r.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.hrEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.subject?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        const matchesSource = sourceFilter === 'all' || (sourceFilter === 'gmail_sync' ? r.source === 'gmail_sync' : r.source !== 'gmail_sync');
        return matchesSearch && matchesStatus && matchesSource;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-900 dark:text-slate-100 relative">
            {/* Custom Toast Notification */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 transition-all animate-bounce ${
                    toast.type === 'error'
                        ? 'bg-red-950 border-red-800 text-red-200'
                        : toast.type === 'info'
                        ? 'bg-indigo-950 border-indigo-800 text-indigo-200'
                        : 'bg-emerald-950 border-emerald-800 text-emerald-200'
                }`}>
                    {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    <span className="text-sm font-medium">{toast.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">HR Outreach & Job Application Tracker</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Track job applications, manage application status, set follow-up reminders, and auto-sync entries from Gmail.
                    </p>
                </div>
            </div>

            {/* Gmail Integration Status Card */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                        <Mail className="text-indigo-400" size={24} />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-base text-white">Gmail Application Auto-Sync</h3>
                            {gmailStatus.connected ? (
                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Connected: {gmailStatus.email}
                                </span>
                            ) : (
                                <span className="bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    Not Connected
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                            {gmailStatus.connected 
                                ? `Job applications sent or received via Gmail are automatically synced into your tracker.` 
                                : `Connect your Gmail account to automatically capture applications submitted via email.`}
                            {gmailStatus.lastSynced && (
                                <span className="ml-2 text-indigo-300 font-medium">
                                    • Last synced: {new Date(gmailStatus.lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
                    {gmailStatus.connected ? (
                        <>
                            <button
                                onClick={handleSyncGmail}
                                disabled={syncingGmail}
                                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <RefreshCw size={14} className={syncingGmail ? 'animate-spin' : ''} />
                                <span>{syncingGmail ? 'Syncing Inbox...' : 'Sync Gmail Applications'}</span>
                            </button>
                            <button
                                onClick={handleDisconnectGmail}
                                className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-all cursor-pointer border border-slate-700"
                            >
                                Disconnect
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEmailConnectModal(true)}
                            disabled={connectingGmail}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                        >
                            <Mail size={16} />
                            <span>Connect Gmail Account</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
                <button
                    onClick={() => setActiveTab('compose')}
                    className={`pb-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'compose'
                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                >
                    <Send size={18} />
                    <span>Compose HR Email</span>
                </button>

                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'history'
                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                >
                    <History size={18} />
                    <span>Application Records ({records.length})</span>
                </button>

                <button
                    onClick={() => setActiveTab('vault')}
                    className={`pb-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'vault'
                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                >
                    <Paperclip size={18} />
                    <span>Resume Vault ({resumes.length})</span>
                </button>
            </div>

            {/* TAB 1: COMPOSE EMAIL */}
            {activeTab === 'compose' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Form (2 cols) */}
                    <form onSubmit={handleSendEmail} className="lg:col-span-2 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm">
                        {/* Connected Sender Status Chip */}
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                            <div className="flex items-center gap-2">
                                <Mail size={15} className={gmailStatus.connected ? "text-emerald-500" : "text-indigo-500"} />
                                <span className="text-slate-500 dark:text-slate-400">Sending as:</span>
                                <strong className="text-slate-900 dark:text-white font-mono">
                                    {gmailStatus.connected ? gmailStatus.email : (currentUser?.email || 'DevDash Mail Engine')}
                                </strong>
                                {gmailStatus.connected ? (
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                                        Gmail Verified
                                    </span>
                                ) : (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px]">
                                        Default SMTP
                                    </span>
                                )}
                            </div>
                            {!gmailStatus.connected && (
                                <button
                                    type="button"
                                    onClick={() => setEmailConnectModal(true)}
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
                                >
                                    Connect your Gmail &rarr;
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    HR Email Address *
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                                    <input
                                        type="email"
                                        required
                                        value={formData.hrEmail}
                                        onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                                        placeholder="hr@company.com"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        placeholder="Google, Stripe, Microsoft..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    Role / Position Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    placeholder="Full Stack Engineer / Frontend Lead"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    Attach Stored Resume
                                </label>
                                <select
                                    value={formData.selectedResumeId}
                                    onChange={(e) => setFormData({ ...formData, selectedResumeId: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="">No attachment</option>
                                    {resumes.map(r => (
                                        <option key={r._id} value={r._id}>{r.title} ({r.fileName})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Email Subject Line *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Application for Software Engineer Role"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Email Body / Pitch Description *
                            </label>
                            <textarea
                                required
                                rows={8}
                                value={formData.body}
                                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                placeholder="Dear Hiring Manager..."
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm leading-relaxed focus:outline-none focus:border-indigo-500 font-mono"
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={sending}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                            >
                                <Send size={18} className={sending ? 'animate-bounce' : ''} />
                                <span>{sending ? 'Sending & Saving...' : 'Send Email & Save Record'}</span>
                            </button>
                        </div>
                    </form>

                    {/* Right Templates Column (1 col) */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                            <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <Sparkles size={18} />
                                <span>Quick Email Templates</span>
                            </h3>
                            <div className="space-y-3">
                                {templates.map((tpl, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => applyTemplate(tpl)}
                                        className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 rounded-xl cursor-pointer transition-all group"
                                    >
                                        <div className="font-semibold text-sm group-hover:text-indigo-500 transition-colors">
                                            {tpl.title}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                            {tpl.subject}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resume Status Card */}
                        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/20 p-6 rounded-2xl">
                            <h4 className="font-bold text-sm text-indigo-400 mb-2 flex items-center gap-2">
                                <FileCheck size={16} />
                                <span>Resume Vault Attached</span>
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                Currently {resumes.length} resume templates uploaded in Vault. Upload multiple versions to attach per application.
                            </p>
                            <button
                                onClick={() => setActiveTab('vault')}
                                className="text-xs font-semibold text-indigo-400 hover:underline"
                            >
                                Manage Resume Vault &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: OUTREACH HISTORY RECORDS */}
            {activeTab === 'history' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                    {/* Search & Filter Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-72">
                                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search company, role, HR..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="delivered">Delivered / Sent</option>
                                <option value="replied">Replied</option>
                                <option value="interviewing">Interviewing</option>
                                <option value="offered">Offered</option>
                                <option value="rejected">Rejected</option>
                                <option value="failed">Failed</option>
                            </select>

                            <select
                                value={sourceFilter}
                                onChange={(e) => setSourceFilter(e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                            >
                                <option value="all">All Sources</option>
                                <option value="gmail_sync">Synced from Gmail</option>
                                <option value="app_email">Sent via DevDash</option>
                            </select>
                        </div>

                        <span className="text-xs text-slate-500">Showing {filteredRecords.length} records</span>
                    </div>

                    {/* Applications Table */}
                    {filteredRecords.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <th className="py-3 px-4">Applied Date</th>
                                        <th className="py-3 px-4">Company & Role</th>
                                        <th className="py-3 px-4">HR Recipient</th>
                                        <th className="py-3 px-4">Follow-up Due</th>
                                        <th className="py-3 px-4">Resume Attached</th>
                                        <th className="py-3 px-4">Status (Click to Change)</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {filteredRecords.map((rec) => {
                                        const followUpInfo = getFollowUpStatus(rec.sentAt || rec.createdAt);

                                        return (
                                            <tr key={rec._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                                {/* Applied Date */}
                                                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                                                    {new Date(rec.sentAt || rec.createdAt).toLocaleDateString()}
                                                </td>

                                                {/* Company & Role */}
                                                <td className="py-3.5 px-4">
                                                    <div className="font-bold text-slate-900 dark:text-slate-100">
                                                        {rec.companyName}
                                                    </div>
                                                    <div className="text-xs text-indigo-500 font-medium">
                                                        {rec.position || 'Software Engineer'}
                                                    </div>
                                                    {rec.source === 'gmail_sync' ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 mt-1">
                                                            <Mail size={10} /> Synced from Gmail
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mt-1">
                                                            <Send size={10} /> DevDash Sent
                                                        </span>
                                                    )}
                                                </td>

                                                {/* HR Recipient */}
                                                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                                                    {rec.hrEmail}
                                                </td>

                                                {/* Follow Up Date & Action */}
                                                <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className={followUpInfo.color}>
                                                            {followUpInfo.label}
                                                        </span>
                                                        <button
                                                            onClick={() => handlePrepareFollowUp(rec)}
                                                            className="p-1 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded transition-colors"
                                                            title="Pre-fill Follow-up Email"
                                                        >
                                                            <MessageSquare size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 mt-0.5">Target: {followUpInfo.dateStr}</div>
                                                </td>

                                                {/* Resume */}
                                                <td className="py-3.5 px-4 text-xs text-slate-500 font-medium max-w-[150px] truncate">
                                                    {rec.attachedResumeName || 'None'}
                                                </td>

                                                {/* Manual Status Dropdown */}
                                                <td className="py-3.5 px-4">
                                                    <select
                                                        value={rec.status || 'delivered'}
                                                        onChange={(e) => handleUpdateStatus(rec._id, e.target.value)}
                                                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none transition-colors capitalize ${getStatusStyle(rec.status || 'delivered')}`}
                                                    >
                                                        <option value="delivered" className="bg-slate-900 text-emerald-400">Delivered / Sent</option>
                                                        <option value="replied" className="bg-slate-900 text-indigo-400">Replied</option>
                                                        <option value="interviewing" className="bg-slate-900 text-purple-400">Interviewing</option>
                                                        <option value="offered" className="bg-slate-900 text-amber-400">Offered Job</option>
                                                        <option value="rejected" className="bg-slate-900 text-rose-400">Rejected</option>
                                                        <option value="failed" className="bg-slate-900 text-red-400">Failed</option>
                                                    </select>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => setSelectedRecord(rec)}
                                                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
                                                        title="View Email Message"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteModal({ type: 'record', id: rec._id, title: `${rec.companyName} (${rec.position})` })}
                                                        className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                                                        title="Delete Record"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-16 text-center space-y-4">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                <History size={24} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">No application records found</h4>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                    Send your first HR email from the Compose tab or sync from Gmail to see and manage your application history here.
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveTab('compose')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                            >
                                <Send size={14} />
                                <span>Compose HR Email</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 3: RESUME VAULT */}
            {activeTab === 'vault' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Form */}
                    <form onSubmit={handleUploadResume} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Upload className="text-indigo-600 dark:text-indigo-400" size={20} />
                            <span>Upload Resume to Vault</span>
                        </h3>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Resume Title / Label *
                            </label>
                            <input
                                type="text"
                                required
                                value={uploadTitle}
                                onChange={(e) => setUploadTitle(e.target.value)}
                                placeholder="e.g. Frontend Engineer 2026 Resume"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                Choose PDF / Document File *
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                required
                                onChange={handleFileChange}
                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-950 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 cursor-pointer"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={uploading || !selectedFile}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md transition-all cursor-pointer"
                        >
                            {uploading ? 'Uploading...' : 'Save to Resume Vault'}
                        </button>
                    </form>

                    {/* Resumes List (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-bold">Stored Resumes ({resumes.length})</h3>
                        {resumes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {resumes.map(res => (
                                    <div key={res._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-sm">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100">{res.title}</h4>
                                                <span className="text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                                    {res.fileSize || '200 KB'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-mono mb-4">{res.fileName}</p>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                                            <a
                                                href={res.fileData}
                                                download={res.fileName}
                                                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                                            >
                                                <FileText size={14} />
                                                <span>Download File</span>
                                            </a>
                                            <button
                                                onClick={() => setDeleteModal({ type: 'resume', id: res._id, title: res.title })}
                                                className="text-red-500 hover:text-red-600 p-1 transition-colors"
                                                title="Delete Resume"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
                                No resumes uploaded yet. Upload a resume file to attach it to HR emails.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* View Email Record Modal */}
            {selectedRecord && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl text-slate-100 space-y-6">
                        {/* Modal Header */}
                        <div className="flex justify-between items-start border-b border-slate-800/80 pb-5">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-white tracking-tight">{selectedRecord.subject}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${getStatusStyle(selectedRecord.status || 'delivered')}`}>
                                        {selectedRecord.status || 'delivered'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                                    <div>
                                        To: <span className="text-indigo-400 font-mono font-medium">{selectedRecord.hrEmail}</span>
                                    </div>
                                    <div>
                                        Company: <span className="text-slate-200 font-semibold">{selectedRecord.companyName}</span>
                                    </div>
                                    <div>
                                        Applied: <span className="text-slate-300">{new Date(selectedRecord.sentAt || selectedRecord.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedRecord(null)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Email Body Message Container */}
                        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800/80 max-h-96 overflow-y-auto text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap break-words">
                            {selectedRecord.body}
                        </div>

                        {/* Attachment & Action Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
                            <div>
                                {selectedRecord.attachedResumeName ? (
                                    <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 px-3 py-1.5 rounded-xl">
                                        <Paperclip size={14} className="text-indigo-400" />
                                        <span className="text-slate-200 font-medium">{selectedRecord.attachedResumeName}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-500 italic">No resume attached</span>
                                )}
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                <button
                                    onClick={() => {
                                        const rec = selectedRecord;
                                        setSelectedRecord(null);
                                        handlePrepareFollowUp(rec);
                                    }}
                                    className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
                                >
                                    <MessageSquare size={14} />
                                    <span>Follow-up Email</span>
                                </button>
                                <button
                                    onClick={() => setSelectedRecord(null)}
                                    className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Connect Gmail Account Modal */}
            {emailConnectModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl text-slate-100 space-y-5">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Connect Gmail Account</h3>
                                    <p className="text-xs text-slate-400">Send HR outreach & auto-track applications</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEmailConnectModal(false)}
                                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Option 1: Official Google One-Click OAuth */}
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={handleGoogleOAuthConnect}
                                disabled={connectingGmail}
                                className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-3 shadow-md transition-all cursor-pointer disabled:opacity-50"
                            >
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                <span>{connectingGmail ? 'Authorizing Google...' : 'Sign in & Connect with Google'}</span>
                            </button>
                        </div>

                        {/* Option 2: Quick Connect with Logged-in User (if user has email) */}
                        {currentUser?.email && (
                            <button
                                type="button"
                                onClick={() => handleConnectGmail(currentUser.email)}
                                disabled={connectingGmail}
                                className="w-full py-2.5 px-3.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer"
                            >
                                <span className="flex items-center gap-2 truncate">
                                    <Mail size={14} className="text-indigo-400 shrink-0" />
                                    <span className="truncate">Quick connect as <strong className="text-white">{currentUser.email}</strong></span>
                                </span>
                                <span className="text-indigo-400 shrink-0">&rarr;</span>
                            </button>
                        )}

                        {/* Divider */}
                        <div className="relative flex items-center justify-center">
                            <div className="border-t border-slate-800 w-full"></div>
                            <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold shrink-0">
                                or connect any gmail address
                            </span>
                        </div>

                        {/* Option 3: Manual Gmail + optional App Password */}
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Gmail Address
                                </label>
                                <input
                                    type="email"
                                    value={manualGmailEmail}
                                    onChange={(e) => setManualGmailEmail(e.target.value)}
                                    placeholder="your_email@gmail.com"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-white"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-xs font-semibold text-slate-300">
                                        Google App Password <span className="text-slate-500 font-normal">(Optional)</span>
                                    </label>
                                    <a
                                        href="https://myaccount.google.com/apppasswords"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[10px] text-indigo-400 hover:underline"
                                    >
                                        Get App Password &rarr;
                                    </a>
                                </div>
                                <input
                                    type="password"
                                    value={manualAppPassword}
                                    onChange={(e) => setManualAppPassword(e.target.value)}
                                    placeholder="16-character app password"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-white font-mono"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">
                                    Optional: Enables direct personal sending from your own Gmail account.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setEmailConnectModal(false)}
                                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleConnectGmail(manualGmailEmail, manualAppPassword)}
                                disabled={connectingGmail || !manualGmailEmail}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
                            >
                                <Mail size={15} />
                                <span>{connectingGmail ? 'Connecting...' : 'Connect Gmail'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 space-y-4">
                        <div className="flex items-center gap-3 text-rose-500">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                <AlertTriangle size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
                        </div>

                        <p className="text-sm text-slate-400">
                            Are you sure you want to delete <strong className="text-slate-200">{deleteModal.title}</strong>? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteRecord}
                                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all"
                            >
                                Delete Permanently
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HROutreach;
