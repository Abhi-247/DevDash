# DevDash Chrome Extension — 1-Click Cold Email HR CRM

A developer-first Chrome Extension that scrapes job details from LinkedIn, Wellfound, Indeed, and company career pages, auto-generates high-converting cold email pitches with your verified DevScore™ and public link, attaches your ATS resume from DevDash Vault, and dispatches directly through your personal Gmail SMTP in 1 click.

---

## 🚀 How to Install in Chrome, Brave, or Edge

1. Open your browser and navigate to:
   ```text
   chrome://extensions
   ```
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click the **"Load unpacked"** button.
4. Select the directory:
   ```text
   d:\Projects\DevDash\extension
   ```
5. The **DevDash** extension icon will now appear in your browser toolbar! Pin it for quick access.

---

## ⚡ How to Use

1. **Log in to DevDash**:
   - Open your DevDash web app (`http://localhost:5173` or production) and log in.
   - The extension automatically detects your session cookie!
   - Alternatively, click the extension icon and paste your token in the login box.
2. **Browse any Job Post**:
   - Visit any job posting on **LinkedIn**, **Wellfound**, **Indeed**, **Greenhouse**, or **Lever**.
   - Notice the floating **"⚡ Fast Apply with DevDash"** badge in the bottom-right corner!
3. **1-Click Dispatch**:
   - Click the floating badge or the DevDash toolbar icon.
   - Company, Position, and Recruiter Email are auto-detected.
   - Select your pitch template (*3-Sentence Hook*, *Technical Deep Dive*, or *Intern Pitch*).
   - Select an ATS resume from your **Resume Vault**.
   - Click **"🚀 Send via Gmail SMTP & Log to CRM"**.
4. **CRM Sync**:
   - The email is sent through your personal connected Gmail SMTP.
   - The application is instantly recorded in your DevDash web dashboard at `/hr-outreach`!
