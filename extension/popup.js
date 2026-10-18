/**
 * DevDash Chrome Extension - Popup Logic
 * Coordinates auto-scraping, template personalization, Resume Vault selection, and 1-Click dispatch.
 */

let currentUserProfile = null;
let userResumes = [];
let currentJobData = {};

document.addEventListener('DOMContentLoaded', async () => {
    // Clear old cached scrape from previous sessions
    chrome.storage.local.remove(['lastScrapedJob']);
    initTheme();
    initEventListeners();
    await checkAuthAndLoad();
});

function initTheme() {
    chrome.storage.local.get(['theme'], (res) => {
        const savedTheme = res.theme || 'light';
        applyTheme(savedTheme);
    });
}

function applyTheme(theme) {
    document.body.className = theme;
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.innerText = theme === 'dark' ? '☀️' : '🌙';
    }
    chrome.storage.local.set({ theme });
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
}

function initEventListeners() {
    document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('btn-login')?.addEventListener('click', openLoginTab);
    document.getElementById('btn-save-token')?.addEventListener('click', saveManualToken);
    document.getElementById('btn-settings')?.addEventListener('click', openOptions);
    document.getElementById('btn-re-scrape')?.addEventListener('click', scanCurrentTab);
    document.getElementById('btn-send-email')?.addEventListener('click', handleSendOutreach);
    document.getElementById('btn-open-crm')?.addEventListener('click', openDashboardOutreach);

    // Auto-sync subject line if role changes and subject isn't customized
    document.getElementById('job-position')?.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        const subjectInput = document.getElementById('email-subject');
        if (subjectInput && (!subjectInput.value || subjectInput.value.startsWith('Application for'))) {
            subjectInput.value = val ? `Application for ${val}` : '';
        }
    });
}

// 1. Auth & Initial Data Loading
async function checkAuthAndLoad() {
    showView('loading');

    chrome.runtime.sendMessage({ type: 'GET_AUTH_STATUS' }, async (res) => {
        if (!res || !res.isAuthenticated) {
            showView('unauth');
            return;
        }

        // User is logged in -> Load Profile & Resumes
        showView('composer');
        loadUserProfile();
        loadUserResumes();
        scanCurrentTab();
    });
}

function showView(viewName) {
    document.getElementById('view-loading').classList.add('hidden');
    document.getElementById('view-unauth').classList.add('hidden');
    document.getElementById('view-composer').classList.add('hidden');

    if (viewName === 'loading') document.getElementById('view-loading').classList.remove('hidden');
    if (viewName === 'unauth') document.getElementById('view-unauth').classList.remove('hidden');
    if (viewName === 'composer') document.getElementById('view-composer').classList.remove('hidden');
}

function openLoginTab() {
    chrome.storage.local.get(['clientUrl'], (res) => {
        const url = res.clientUrl || 'http://localhost:5173';
        chrome.tabs.create({ url: `${url}/login` });
    });
}

function openDashboardOutreach() {
    chrome.storage.local.get(['clientUrl'], (res) => {
        const url = res.clientUrl || 'http://localhost:5173';
        chrome.tabs.create({ url: `${url}/hr-outreach` });
    });
}

function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

function saveManualToken() {
    const token = document.getElementById('input-token').value.trim();
    if (!token) return alert('Please enter a valid token');

    chrome.runtime.sendMessage({ type: 'SET_AUTH_TOKEN', token }, () => {
        checkAuthAndLoad();
    });
}

// 2. Fetch User Profile & Resumes
function loadUserProfile() {
    chrome.runtime.sendMessage({ type: 'FETCH_USER_PROFILE' }, (res) => {
        if (res && res.success && res.profile) {
            currentUserProfile = res.profile;

            // DevScore display (null-safe in case header was customized)
            const devscoreBadge = document.getElementById('devscore-badge');
            const devscoreVal = document.getElementById('devscore-val');
            if (res.profile.devScore) {
                if (devscoreVal) devscoreVal.innerText = res.profile.devScore;
                if (devscoreBadge) devscoreBadge.classList.remove('hidden');
            }
        }
    });
}

function loadUserResumes() {
    chrome.runtime.sendMessage({ type: 'FETCH_RESUMES' }, (res) => {
        const select = document.getElementById('select-resume');
        if (!select) return;
        select.innerHTML = '';

        if (res && res.success && res.resumes && res.resumes.length > 0) {
            userResumes = res.resumes;
            userResumes.forEach((r, idx) => {
                const opt = document.createElement('option');
                opt.value = r._id;
                opt.text = `📄 ${r.fileName || r.title} (${r.fileSize || 'PDF'}) [DevDash Vault]`;
                if (idx === 0) opt.selected = true;
                select.appendChild(opt);
            });
            // Automatically select latest resume uploaded to DevDash
            select.value = userResumes[0]._id;
        } else {
            const opt = document.createElement('option');
            opt.value = '';
            opt.text = 'No resumes in DevDash Vault (Upload in CRM)';
            select.appendChild(opt);
        }
    });
}

// 3. Scan Current Tab for Job Details
function scanCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || tabs.length === 0) return;
        const activeTab = tabs[0];

        // Skip internal browser pages
        if (!activeTab.url || activeTab.url.startsWith('chrome://') || activeTab.url.startsWith('edge://') || activeTab.url.startsWith('about:')) {
            return;
        }

        // First attempt content script message
        chrome.tabs.sendMessage(activeTab.id, { type: 'EXTRACT_PAGE_DATA' }, (data) => {
            if (chrome.runtime.lastError || !data) {
                // Direct active tab script execution fallback
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: extractPageDataDirectly
                }, (results) => {
                    if (results && results[0] && results[0].result) {
                        populateJobFields(results[0].result);
                    }
                });
                return;
            }
            populateJobFields(data);
        });
    });
}

function extractPageDataDirectly() {
    const url = window.location.href;
    const bodyText = document.body ? document.body.innerText : '';
    let jobData = {
        companyName: '',
        position: '',
        hrEmail: '',
        subject: ''
    };

    // 1. Explicit Subject Line on page
    const subjectRegexes = [
        /(?:email\s*subject|subject\s*line|use\s*subject|subject)\s*[:\-]\s*([^\n\r]+)/i,
        /(?:mention|include)\s*["']([^"']+)["']\s*in\s*(?:the\s*)?subject/i
    ];
    for (const r of subjectRegexes) {
        const match = bodyText.match(r);
        if (match && match[1]) {
            const raw = match[1].trim().replace(/^["']|["']$/g, '');
            if (raw.length > 3 && raw.length < 120) {
                jobData.subject = raw;
                break;
            }
        }
    }

    // 2. Mailto links
    const mailtoLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]'));
    for (const link of mailtoLinks) {
        try {
            const rawHref = link.getAttribute('href') || '';
            const cleanedHref = rawHref.replace(/^mailto:/i, '');
            const parts = cleanedHref.split('?');
            const email = parts[0]?.trim();
            if (email && !jobData.hrEmail && email.includes('@')) {
                jobData.hrEmail = email;
            }
            if (parts[1] && !jobData.subject) {
                const searchParams = new URLSearchParams(parts[1]);
                const subj = searchParams.get('subject');
                if (subj) jobData.subject = decodeURIComponent(subj).trim();
            }
        } catch (e) {}
    }

    // 3. Email in body text
    if (!jobData.hrEmail) {
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
        const found = bodyText.match(emailRegex) || [];
        const validEmails = found.filter(e => {
            const lower = e.toLowerCase();
            return !lower.match(/\.(png|jpg|jpeg|gif|svg|webp|css|js)$/) &&
                   !lower.includes('sentry') &&
                   !lower.includes('w3.org') &&
                   !lower.includes('schema.org') &&
                   !lower.includes('example.com') &&
                   !lower.includes('cloudflare');
        });
        if (validEmails.length > 0) {
            const priorityEmail = validEmails.find(e =>
                /(hr|recruit|career|job|hiring|talent|apply|people|work|team|hello|contact)/i.test(e)
            );
            jobData.hrEmail = priorityEmail || validEmails[0];
        }
    }

    // 4. Role detection
    if (url.includes('linkedin.com')) {
        const titleEl = document.querySelector('.job-details-jobs-unified-top-card__job-title, .jobs-unified-top-card__job-title, h1.t-24, .jobs-details__main-content h1');
        const companyEl = document.querySelector('.job-details-jobs-unified-top-card__company-name, .jobs-unified-top-card__company-name, .job-details-jobs-unified-top-card__primary-description a');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    } else if (url.includes('indeed.com')) {
        const titleEl = document.querySelector('h1.jobsearch-JobInfoHeader-title, h2.jobTitle, [data-testid="jobsearch-JobInfoHeader-title"]');
        const companyEl = document.querySelector('[data-company-name="true"], .jobsearch-InlineCompanyRating-companyHeader a');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    } else if (url.includes('wellfound.com')) {
        const titleEl = document.querySelector('h1[class*="styles_title"], h1');
        const companyEl = document.querySelector('h2[class*="styles_startupName"], a[class*="styles_startupLink"]');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    } else if (url.includes('greenhouse.io') || url.includes('jobs.lever.co') || url.includes('ashbyhq.com')) {
        const titleEl = document.querySelector('.app-title, .posting-headline h2, h1');
        const companyEl = document.querySelector('.company-name, .main-header-logo img, header h2');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText || companyEl.alt || '';
    }

    // Generic Fallback
    if (!jobData.position) {
        const genericEl = document.querySelector(
            'h1[class*="title" i], h1[class*="job" i], h1[class*="role" i], ' +
            '[class*="job-title" i], [class*="jobTitle" i], [data-automation-id="jobPostingHeader"], main h1, article h1'
        );
        if (genericEl && genericEl.innerText.trim().length > 2 && genericEl.innerText.trim().length < 90) {
            jobData.position = genericEl.innerText.trim();
        }
    }

    if (!jobData.companyName) {
        const metaSiteName = document.querySelector('meta[property="og:site_name"]');
        if (metaSiteName && metaSiteName.content) {
            jobData.companyName = metaSiteName.content.trim();
        } else {
            try {
                const host = window.location.hostname.replace(/^www\./, '').split('.')[0];
                if (host && !['localhost', '127', 'linkedin', 'indeed', 'glassdoor'].includes(host.toLowerCase())) {
                    jobData.companyName = host.charAt(0).toUpperCase() + host.slice(1);
                }
            } catch (e) {}
        }
    }

    if (!jobData.position) {
        const docTitle = document.title || '';
        if (docTitle.includes(' at ')) {
            const parts = docTitle.split(' at ');
            jobData.position = parts[0].trim();
            if (!jobData.companyName) jobData.companyName = parts[1].split('|')[0].split('-')[0].trim();
        } else if (docTitle.includes(' - ')) {
            const parts = docTitle.split(' - ');
            jobData.position = parts[0].trim();
            if (!jobData.companyName) jobData.companyName = parts[1].split('|')[0].trim();
        }
    }

    if (jobData.position) {
        jobData.position = jobData.position.replace(/^(apply\s+(for\s+)?|job\s+opening\s*:?|role\s*:?|hiring\s*:?)\s*/i, '').trim();
    }

    return jobData;
}

function populateJobFields(data) {
    if (!data) return;
    currentJobData = data;
    if (data.companyName) document.getElementById('job-company').value = data.companyName;
    if (data.position) document.getElementById('job-position').value = data.position;
    if (data.hrEmail) document.getElementById('job-email').value = data.hrEmail;

    // Subject rule: If subject given on page take that, else write as Application for [Role]
    const subjectInput = document.getElementById('email-subject');
    if (subjectInput) {
        if (data.subject) {
            subjectInput.value = data.subject;
        } else if (data.position) {
            subjectInput.value = `Application for ${data.position}`;
        }
    }
}

// 5. Send Email via DevDash Gmail SMTP API
function handleSendOutreach() {
    const hrEmail = document.getElementById('job-email').value.trim();
    const companyName = document.getElementById('job-company').value.trim();
    const position = document.getElementById('job-position').value.trim();
    const subject = document.getElementById('email-subject').value.trim();
    const body = document.getElementById('email-body').value.trim();
    const selectedResumeId = document.getElementById('select-resume').value;

    if (!hrEmail) {
        showStatus('Please enter an HR / Recruiter email address.', 'error');
        document.getElementById('job-email').focus();
        return;
    }
    if (!companyName || !position) {
        showStatus('Company name and Position are required.', 'error');
        return;
    }
    if (!subject) {
        showStatus('Please enter a subject line.', 'error');
        document.getElementById('email-subject').focus();
        return;
    }
    if (!body) {
        showStatus('Please write your message body.', 'error');
        document.getElementById('email-body').focus();
        return;
    }

    // Find selected resume details from userResumes
    let resumeData = null;
    let resumeTitle = null;
    if (selectedResumeId && userResumes.length > 0) {
        const found = userResumes.find(r => r._id === selectedResumeId);
        if (found) {
            resumeData = found.fileData;
            resumeTitle = found.fileName || `${found.title}.pdf`;
        }
    }

    // Set Loading State
    const sendBtn = document.getElementById('btn-send-email');
    const spinner = document.getElementById('send-btn-spinner');
    const btnText = document.getElementById('send-btn-text');

    sendBtn.disabled = true;
    spinner.classList.remove('hidden');
    btnText.innerText = 'Sending...';
    hideStatus();

    const payload = {
        hrEmail,
        companyName,
        position,
        subject,
        body,
        resumeId: selectedResumeId || undefined,
        resumeTitle: resumeTitle || undefined,
        resumeData: resumeData || undefined
    };

    chrome.runtime.sendMessage({ type: 'SEND_OUTREACH', payload }, (res) => {
        sendBtn.disabled = false;
        spinner.classList.add('hidden');
        btnText.innerText = 'Send';

        if (res && res.success) {
            showStatus('🎉 Cold email successfully sent & logged to CRM!', 'success');
        } else {
            showStatus(res?.message || 'Failed to dispatch email. Check Gmail SMTP settings in DevDash.', 'error');
        }
    });
}

function showStatus(text, type) {
    const el = document.getElementById('status-message');
    el.innerText = text;
    el.className = `status-msg ${type}`;
    el.classList.remove('hidden');
}

function hideStatus() {
    const el = document.getElementById('status-message');
    el.classList.add('hidden');
}
