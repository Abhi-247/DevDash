/**
 * DevDash Chrome Extension - Content Script
 * Scrapes job details & recruiter info from LinkedIn, Wellfound, Indeed, Greenhouse, Lever, etc.
 */

function extractJobDetails() {
    const url = window.location.href;
    const bodyText = document.body ? document.body.innerText : '';
    let jobData = {
        companyName: '',
        position: '',
        recruiterName: '',
        hrEmail: '',
        subject: '',
        sourceUrl: url,
        location: ''
    };

    // 1. Detect Explicit Subject Line on the page (e.g. "Subject: Application for ...", "Subject Line: ...")
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

    // 2. Scan mailto links (often carries both HR email and explicit ?subject=)
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
                if (subj) {
                    jobData.subject = decodeURIComponent(subj).trim();
                }
            }
        } catch (e) {
            console.debug("mailto parse error:", e);
        }
    }

    // 3. Scan DOM Text for Emails (Prioritize hiring / hr / careers emails)
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
                   !lower.includes('cloudflare') &&
                   !lower.includes('webpack') &&
                   !lower.includes('react');
        });

        if (validEmails.length > 0) {
            // Priority 1: explicitly recruiter/careers/hr/hiring/jobs
            const priorityEmail = validEmails.find(e =>
                /(hr|recruit|career|job|hiring|talent|apply|people|work|team|hello|contact)/i.test(e)
            );
            jobData.hrEmail = priorityEmail || validEmails[0];
        }
    }

    // 4. Role / Position Detection across standard job platforms & generic pages
    if (url.includes('linkedin.com')) {
        const titleEl = document.querySelector('.job-details-jobs-unified-top-card__job-title, .jobs-unified-top-card__job-title, h1.t-24, .jobs-details__main-content h1');
        const companyEl = document.querySelector('.job-details-jobs-unified-top-card__company-name, .jobs-unified-top-card__company-name, .job-details-jobs-unified-top-card__primary-description a');
        const recruiterEl = document.querySelector('.hirer-card__hirer-information .jobs-poster__name, .message-the-recruiter-card__header h3');

        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
        if (recruiterEl) jobData.recruiterName = recruiterEl.innerText.trim();
    } else if (url.includes('wellfound.com')) {
        const titleEl = document.querySelector('h1[class*="styles_title"], h1');
        const companyEl = document.querySelector('h2[class*="styles_startupName"], a[class*="styles_startupLink"]');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    } else if (url.includes('indeed.com')) {
        const titleEl = document.querySelector('h1.jobsearch-JobInfoHeader-title, h2.jobTitle, [data-testid="jobsearch-JobInfoHeader-title"]');
        const companyEl = document.querySelector('[data-company-name="true"], .jobsearch-InlineCompanyRating-companyHeader a, [data-testid="inlineHeader-companyName"]');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    } else if (url.includes('greenhouse.io')) {
        const titleEl = document.querySelector('.app-title, h1');
        const companyEl = document.querySelector('.company-name');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    } else if (url.includes('jobs.lever.co')) {
        const titleEl = document.querySelector('.posting-headline h2, h2');
        const companyEl = document.querySelector('.main-header-logo img');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.alt || window.location.pathname.split('/')[1];
    } else if (url.includes('ashbyhq.com')) {
        const titleEl = document.querySelector('h1');
        const companyEl = document.querySelector('header h2, meta[property="og:site_name"]');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText || companyEl.content;
    } else if (url.includes('workatastartup.com')) {
        const titleEl = document.querySelector('.job-name, h1');
        const companyEl = document.querySelector('.company-name, h2');
        if (titleEl) jobData.position = titleEl.innerText.trim();
        if (companyEl) jobData.companyName = companyEl.innerText.trim();
    }

    // Generic Career / ATS Fallback (h1, classes, data-attributes)
    if (!jobData.position) {
        const genericEl = document.querySelector(
            'h1[class*="title" i], h1[class*="job" i], h1[class*="role" i], ' +
            '[class*="job-title" i], [class*="jobTitle" i], [class*="position-title" i], ' +
            '[data-automation-id="jobPostingHeader"], main h1, article h1'
        );
        if (genericEl && genericEl.innerText.trim().length > 2 && genericEl.innerText.trim().length < 90) {
            jobData.position = genericEl.innerText.trim();
        }
    }

    // Detect Company from site name or hostname
    if (!jobData.companyName) {
        const metaSiteName = document.querySelector('meta[property="og:site_name"]');
        if (metaSiteName && metaSiteName.content) {
            jobData.companyName = metaSiteName.content.trim();
        } else {
            try {
                const host = window.location.hostname.replace(/^www\./, '').split('.')[0];
                if (host && !['localhost', '127', 'linkedin', 'indeed', 'glassdoor', 'google'].includes(host.toLowerCase())) {
                    jobData.companyName = host.charAt(0).toUpperCase() + host.slice(1);
                }
            } catch (e) {}
        }
    }

    // Fallback: Parse position and company from Document Title
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
        } else if (docTitle.includes(' | ')) {
            const parts = docTitle.split(' | ');
            jobData.position = parts[0].trim();
        }
    }

    // Clean position string (strip out prefixes like "Apply for: ")
    if (jobData.position) {
        jobData.position = jobData.position.replace(/^(apply\s+(for\s+)?|job\s+opening\s*:?|role\s*:?|hiring\s*:?)\s*/i, '').trim();
    }

    return jobData;
}

// Inject floating DevDash Fast Apply badge
function injectDevDashButton() {
    if (document.getElementById('devdash-floating-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'devdash-floating-btn';
    btn.innerHTML = `
        <div class="devdash-btn-inner">
            <span class="devdash-btn-icon">⚡</span>
            <span class="devdash-btn-text">Fast Apply with DevDash</span>
        </div>
    `;

    btn.addEventListener('click', () => {
        const details = extractJobDetails();
        chrome.runtime.sendMessage({ type: 'STORE_SCRAPED_JOB', jobData: details }, () => {
            showToast(`Captured: ${details.position || 'Role'} at ${details.companyName || 'Company'}! Open DevDash extension to dispatch.`);
        });
    });

    document.body.appendChild(btn);
}

function showToast(message) {
    let toast = document.getElementById('devdash-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'devdash-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.className = 'devdash-toast-visible';
    setTimeout(() => {
        toast.className = '';
    }, 4500);
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectDevDashButton();
    });
} else {
    injectDevDashButton();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'EXTRACT_PAGE_DATA') {
        const data = extractJobDetails();
        sendResponse(data);
    }
});
