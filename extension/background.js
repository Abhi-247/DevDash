/**
 * DevDash Chrome Extension - Background Service Worker
 * Handles token sync, API communication, and messaging between popup & content scripts.
 */

const DEFAULT_API_URL = "http://localhost:4000";
const DEFAULT_CLIENT_URL = "http://localhost:5173";

// On installation, set default settings
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['apiUrl', 'clientUrl'], (res) => {
        if (!res.apiUrl) chrome.storage.local.set({ apiUrl: DEFAULT_API_URL });
        if (!res.clientUrl) chrome.storage.local.set({ clientUrl: DEFAULT_CLIENT_URL });
    });
    console.log("DevDash Chrome Extension Installed successfully!");
});

// Helper: Get stored auth token or sync directly with open DevDash web tab
async function getAuthToken() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['devdash_token', 'apiUrl', 'clientUrl'], async (data) => {
            if (data.devdash_token) {
                return resolve(data.devdash_token);
            }

            const clientUrl = data.clientUrl || DEFAULT_CLIENT_URL;

            // 1. Inspect any open DevDash tabs to automatically read localStorage 'token'
            try {
                const tabs = await chrome.tabs.query({});
                const devdashTab = tabs.find(t => t.url && (t.url.includes('localhost:5173') || t.url.includes('devdash')));
                if (devdashTab && devdashTab.id) {
                    const results = await chrome.scripting.executeScript({
                        target: { tabId: devdashTab.id },
                        func: () => localStorage.getItem('token')
                    });
                    if (results && results[0] && results[0].result) {
                        const token = results[0].result;
                        chrome.storage.local.set({ devdash_token: token });
                        return resolve(token);
                    }
                }
            } catch (tabErr) {
                console.warn("Could not inspect DevDash tab for token:", tabErr);
            }

            // 2. Attempt to read session cookie from client domain
            try {
                const cookie = await chrome.cookies.get({ url: clientUrl, name: 'token' });
                if (cookie && cookie.value) {
                    chrome.storage.local.set({ devdash_token: cookie.value });
                    return resolve(cookie.value);
                }
            } catch (err) {
                console.warn("Could not read cookie from client domain:", err);
            }

            resolve(null);
        });
    });
}

// Helper: Get API URL
async function getApiUrl() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['apiUrl'], (data) => {
            resolve(data.apiUrl || DEFAULT_API_URL);
        });
    });
}

// Handle runtime messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_AUTH_STATUS') {
        getAuthToken().then((token) => {
            sendResponse({ isAuthenticated: !!token, token });
        });
        return true; // Keep message channel open for async response
    }

    if (request.type === 'SET_AUTH_TOKEN') {
        chrome.storage.local.set({ devdash_token: request.token }, () => {
            sendResponse({ success: true });
        });
        return true;
    }

    if (request.type === 'LOGOUT') {
        chrome.storage.local.remove(['devdash_token', 'user_profile'], () => {
            sendResponse({ success: true });
        });
        return true;
    }

    if (request.type === 'FETCH_USER_PROFILE') {
        (async () => {
            try {
                const token = await getAuthToken();
                const apiUrl = await getApiUrl();
                if (!token) return sendResponse({ success: false, message: "Not logged in" });

                const res = await fetch(`${apiUrl}/api/profile/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    chrome.storage.local.set({ user_profile: data });
                    sendResponse({ success: true, profile: data });
                } else {
                    sendResponse({ success: false, message: data.message || "Failed to fetch profile" });
                }
            } catch (err) {
                sendResponse({ success: false, message: err.message });
            }
        })();
        return true;
    }

    if (request.type === 'FETCH_RESUMES') {
        (async () => {
            try {
                const token = await getAuthToken();
                const apiUrl = await getApiUrl();
                if (!token) return sendResponse({ success: false, message: "Not logged in" });

                const res = await fetch(`${apiUrl}/api/outreach/resumes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    sendResponse({ success: true, resumes: data });
                } else {
                    sendResponse({ success: false, message: data.message || "Failed to fetch resumes" });
                }
            } catch (err) {
                sendResponse({ success: false, message: err.message });
            }
        })();
        return true;
    }

    if (request.type === 'SEND_OUTREACH') {
        (async () => {
            try {
                const token = await getAuthToken();
                const apiUrl = await getApiUrl();
                if (!token) return sendResponse({ success: false, message: "Please log in to DevDash to send cold emails." });

                const res = await fetch(`${apiUrl}/api/outreach/send`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request.payload)
                });
                const data = await res.json();
                if (res.ok) {
                    sendResponse({ success: true, data });
                } else {
                    sendResponse({ success: false, message: data.message || "Failed to send email" });
                }
            } catch (err) {
                sendResponse({ success: false, message: err.message });
            }
        })();
        return true;
    }

    if (request.type === 'STORE_SCRAPED_JOB') {
        chrome.storage.local.set({ lastScrapedJob: request.jobData }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});
