document.addEventListener('DOMContentLoaded', () => {
    const apiUrlInput = document.getElementById('opt-api-url');
    const clientUrlInput = document.getElementById('opt-client-url');
    const tokenInput = document.getElementById('opt-token');
    const saveBtn = document.getElementById('btn-save');
    const testBtn = document.getElementById('btn-test');
    const statusDiv = document.getElementById('opt-status');

    // Load saved settings
    chrome.storage.local.get(['apiUrl', 'clientUrl', 'devdash_token'], (data) => {
        if (data.apiUrl) apiUrlInput.value = data.apiUrl;
        else apiUrlInput.value = 'http://localhost:4000';

        if (data.clientUrl) clientUrlInput.value = data.clientUrl;
        else clientUrlInput.value = 'http://localhost:5173';

        if (data.devdash_token) tokenInput.value = data.devdash_token;
    });

    // Save
    saveBtn.addEventListener('click', () => {
        const apiUrl = apiUrlInput.value.trim() || 'http://localhost:4000';
        const clientUrl = clientUrlInput.value.trim() || 'http://localhost:5173';
        const token = tokenInput.value.trim();

        chrome.storage.local.set({ apiUrl, clientUrl, devdash_token: token }, () => {
            statusDiv.className = 'status success';
            statusDiv.innerText = '✓ Settings successfully saved!';
            setTimeout(() => { statusDiv.innerText = ''; }, 3000);
        });
    });

    // Test Connection
    testBtn.addEventListener('click', async () => {
        const apiUrl = apiUrlInput.value.trim() || 'http://localhost:4000';
        const token = tokenInput.value.trim();
        statusDiv.className = 'status';
        statusDiv.innerText = 'Testing connection to DevDash API...';

        try {
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${apiUrl}/api/profile/profile`, { headers });
            if (res.ok) {
                const data = await res.json();
                statusDiv.className = 'status success';
                statusDiv.innerText = `✓ Connected! Logged in as ${data.fullName || data.username || 'User'}`;
            } else if (res.status === 401) {
                statusDiv.className = 'status error';
                statusDiv.innerText = 'Connected to server, but token is invalid or missing. Please log in.';
            } else {
                statusDiv.className = 'status success';
                statusDiv.innerText = `✓ Server responded with status ${res.status}`;
            }
        } catch (err) {
            statusDiv.className = 'status error';
            statusDiv.innerText = `✗ Connection failed: ${err.message}`;
        }
    });
});
