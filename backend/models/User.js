const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    // Profile information
    fullName: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    skills: [{
        type: String
    }],
    devScore: {
        type: Number,
        default: 500
    },
    // Connected coding profiles
    connectedProfiles: {
        gfg: {
            username: String,
            connected: { type: Boolean, default: false },
            codingScore: { type: Number, default: 0 },
            totalSolved: { type: Number, default: 0 },
            lastSynced: Date
        },
        leetcode: {
            username: String,
            connected: { type: Boolean, default: false },
            totalSolved: { type: Number, default: 0 },
            easySolved: { type: Number, default: 0 },
            mediumSolved: { type: Number, default: 0 },
            hardSolved: { type: Number, default: 0 },
            ranking: { type: Number, default: 0 },
            lastSynced: Date
        },
        codeforces: {
            username: String,
            connected: { type: Boolean, default: false },
            rating: { type: Number, default: 0 },
            maxRating: { type: Number, default: 0 },
            rank: { type: String, default: 'Unrated' },
            maxRank: { type: String, default: 'Unrated' },
            lastSynced: Date
        },
        hackerrank: {
            username: String,
            connected: { type: Boolean, default: false },
            badges: { type: Number, default: 0 },
            lastSynced: Date
        },
        github: {
            username: String,
            connected: { type: Boolean, default: false },
            publicRepos: { type: Number, default: 0 },
            followers: { type: Number, default: 0 },
            lastSynced: Date
        }
    },
    // Projects
    projects: [{
        title: String,
        description: String,
        technologies: [String],
        githubUrl: String,
        liveUrl: String,
        imageUrl: String,
        featured: { type: Boolean, default: false }
    }],
    // Goals
    goals: [{
        title: String,
        description: String,
        targetDate: Date,
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
        progress: { type: Number, default: 0 }
    }],
    // Analytics data (cached)
    analytics: {
        totalCommits: { type: Number, default: 0 },
        totalPRs: { type: Number, default: 0 },
        totalIssues: { type: Number, default: 0 },
        languagesUsed: [{ language: String, count: Number }],
        codingActivity: [{
            date: Date,
            commits: Number,
            contributions: Number
        }]
    }
},
{timestamps:true}

)

const User=mongoose.model("User",userSchema);
module.exports=User;