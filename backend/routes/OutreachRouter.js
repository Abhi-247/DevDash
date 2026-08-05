const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OutreachRecord, ResumeVault } = require('../models/OutreachRecord');
const User = require('../models/User');

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token && req.headers.token) {
        token = req.headers.token;
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing authentication token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

/**
 * Configure Nodemailer Transporter
 */
const getTransporter = () => {
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.replace(/\s+/g, '').trim();

    if (user && pass && user !== 'your_email@gmail.com') {
        const isGmail = (process.env.SMTP_HOST || '').includes('gmail') || user.endsWith('@gmail.com');
        if (isGmail) {
            return nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: user,
                    pass: pass
                }
            });
        }
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: { user, pass }
        });
    }
    return null;
};

// Send HR Email & Save Record
router.post('/send', verifyToken, async (req, res) => {
    try {
        const { hrEmail, companyName, position, subject, body, resumeId, resumeTitle, resumeData } = req.body;

        if (!hrEmail || !subject || !body) {
            return res.status(400).json({ message: "HR Email, Subject, and Description are required." });
        }

        const user = await User.findById(req.userId);
        const transporter = getTransporter();

        let deliveryStatus = 'sent';
        let emailError = null;

        if (transporter) {
            try {
                const cleanPass = process.env.SMTP_PASS?.replace(/\s+/g, '').trim();
                const senderEmail = process.env.SMTP_USER?.trim();

                const mailOptions = {
                    from: `"${user.fullName || user.username}" <${senderEmail}>`,
                    to: hrEmail,
                    subject: subject,
                    text: body,
                    html: `<div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b;">
                        ${body.replace(/\n/g, '<br/>')}
                    </div>`
                };

                if (resumeData) {
                    mailOptions.attachments = [
                        {
                            filename: resumeTitle || 'Resume.pdf',
                            path: resumeData
                        }
                    ];
                }

                console.log(`Sending email via Gmail SMTP to: ${hrEmail}...`);
                const info = await transporter.sendMail(mailOptions);
                console.log(`Email sent successfully! MessageID: ${info.messageId}`);
                deliveryStatus = 'delivered';
            } catch (mailErr) {
                console.error("Nodemailer Email Failed Error:", mailErr.message);
                emailError = mailErr.message;
                deliveryStatus = 'failed';
            }
        }

        // Save record into MongoDB database
        const record = new OutreachRecord({
            userId: req.userId,
            hrEmail,
            companyName: companyName || 'Target Company',
            position: position || 'Software Engineer',
            subject,
            body,
            attachedResumeName: resumeTitle || '',
            attachedResumeData: resumeData || '',
            status: deliveryStatus
        });

        await record.save();

        if (deliveryStatus === 'failed') {
            return res.status(500).json({ 
                message: `Gmail SMTP Error: ${emailError || 'Failed to authenticate with Gmail'}. Check your 16-character App Password.`,
                record 
            });
        }

        res.status(201).json({ message: "HR Email successfully delivered & saved to records!", record });
    } catch (error) {
        console.error("Error sending HR email:", error);
        res.status(500).json({ message: "Failed to send HR email" });
    }
});

// Fetch Outreach History Records
router.get('/history', verifyToken, async (req, res) => {
    try {
        const records = await OutreachRecord.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching outreach history" });
    }
});

// Update Outreach Record Status
router.put('/history/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const record = await OutreachRecord.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { status },
            { new: true }
        );
        if (!record) {
            return res.status(404).json({ message: "Outreach record not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: "Error updating record status" });
    }
});

// Delete Outreach Record
router.delete('/history/:id', verifyToken, async (req, res) => {
    try {
        await OutreachRecord.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: "Outreach record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting outreach record" });
    }
});

// Fetch Uploaded Resumes
router.get('/resumes', verifyToken, async (req, res) => {
    try {
        const resumes = await ResumeVault.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching uploaded resumes" });
    }
});

// Upload New Resume to Vault
router.post('/resumes', verifyToken, async (req, res) => {
    try {
        const { title, fileName, fileData, fileSize } = req.body;
        if (!title || !fileData) {
            return res.status(400).json({ message: "Resume title and file contents are required." });
        }

        const newResume = new ResumeVault({
            userId: req.userId,
            title,
            fileName: fileName || `${title.replace(/\s+/g, '_')}.pdf`,
            fileData,
            fileSize: fileSize || '200 KB'
        });

        await newResume.save();
        res.status(201).json({ message: "Resume uploaded successfully to Vault!", resume: newResume });
    } catch (error) {
        console.error("Error uploading resume:", error);
        res.status(500).json({ message: "Error uploading resume" });
    }
});

// Delete Resume from Vault
router.delete('/resumes/:id', verifyToken, async (req, res) => {
    try {
        await ResumeVault.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: "Resume deleted from Vault" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resume" });
    }
});

module.exports = router;
