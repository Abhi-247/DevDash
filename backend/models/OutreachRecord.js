const mongoose = require('mongoose');

const outreachRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hrEmail: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        default: 'Target Company',
        trim: true
    },
    position: {
        type: String,
        default: 'Software Engineer',
        trim: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    attachedResumeName: {
        type: String,
        default: ''
    },
    attachedResumeData: {
        type: String, // Base64 or URL
        default: ''
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'replied', 'interviewing', 'offered', 'rejected', 'failed'],
        default: 'sent'
    },
    followUpDate: {
        type: Date
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const resumeVaultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileData: {
        type: String, // Base64 or Data URI
        required: true
    },
    fileSize: {
        type: String,
        default: '150 KB'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const OutreachRecord = mongoose.model('OutreachRecord', outreachRecordSchema);
const ResumeVault = mongoose.model('ResumeVault', resumeVaultSchema);

module.exports = { OutreachRecord, ResumeVault };
