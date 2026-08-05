const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { fetchLeetCodeStats, fetchCodeforcesStats, fetchGitHubStats, calculateDevScore } = require("../services/platformFetcher");

// Middleware to verify JWT token
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

// Get public profile by username (Unauthenticated)
router.get("/public/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User profile not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching public profile" });
    }
});

// Sync Live Platform Stats
router.post("/sync-stats", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const profiles = user.connectedProfiles || {};
        let updatedProfiles = { ...profiles.toObject() };

        // Fetch LeetCode if connected
        if (profiles.leetcode?.connected && profiles.leetcode?.username) {
            const lcData = await fetchLeetCodeStats(profiles.leetcode.username);
            if (lcData) {
                updatedProfiles.leetcode = { ...updatedProfiles.leetcode, ...lcData };
            }
        }

        // Fetch Codeforces if connected
        if (profiles.codeforces?.connected && profiles.codeforces?.username) {
            const cfData = await fetchCodeforcesStats(profiles.codeforces.username);
            if (cfData) {
                updatedProfiles.codeforces = { ...updatedProfiles.codeforces, ...cfData };
            }
        }

        // Fetch GitHub if connected
        if (profiles.github?.connected && profiles.github?.username) {
            const ghData = await fetchGitHubStats(profiles.github.username);
            if (ghData) {
                updatedProfiles.github = { ...updatedProfiles.github, ...ghData };
            }
        }

        // Compute new DevScore
        const devScore = calculateDevScore(updatedProfiles);

        user.connectedProfiles = updatedProfiles;
        user.devScore = devScore;
        await user.save();

        const updatedUser = user.toObject();
        delete updatedUser.password;
        res.json(updatedUser);
    } catch (error) {
        console.error("Error syncing platform stats:", error);
        res.status(500).json({ message: "Error syncing platform stats" });
    }
});

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
    try {
        const { fullName, bio, location, website, skills } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { fullName, bio, location, website, skills },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
});

// Connect coding profile
router.post("/connect-profile", verifyToken, async (req, res) => {
    try {
        const { platform, username, accessToken } = req.body;
        
        const updateData = {
            [`connectedProfiles.${platform}.username`]: username,
            [`connectedProfiles.${platform}.connected`]: true,
            [`connectedProfiles.${platform}.lastSynced`]: new Date()
        };

        if (accessToken) {
            updateData[`connectedProfiles.${platform}.accessToken`] = accessToken;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: updateData },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error connecting profile" });
    }
});

// Disconnect coding profile
router.post("/disconnect-profile", verifyToken, async (req, res) => {
    try {
        const { platform } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    [`connectedProfiles.${platform}.username`]: "",
                    [`connectedProfiles.${platform}.accessToken`]: "",
                    [`connectedProfiles.${platform}.connected`]: false
                }
            },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error disconnecting profile" });
    }
});



// Add project
router.post("/projects", verifyToken, async (req, res) => {
    try {
        const { title, description, technologies, githubUrl, liveUrl, imageUrl, featured } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $push: {
                    projects: { title, description, technologies, githubUrl, liveUrl, imageUrl, featured }
                }
            },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error adding project" });
    }
});

// Update project
router.put("/projects/:projectId", verifyToken, async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, technologies, githubUrl, liveUrl, imageUrl, featured } = req.body;
        
        const user = await User.findById(req.userId);
        const projectIndex = user.projects.findIndex(p => p._id.toString() === projectId);
        
        if (projectIndex === -1) {
            return res.status(404).json({ message: "Project not found" });
        }

        user.projects[projectIndex] = {
            ...user.projects[projectIndex],
            title, description, technologies, githubUrl, liveUrl, imageUrl, featured
        };

        await user.save();
        res.json(user.projects);
    } catch (error) {
        res.status(500).json({ message: "Error updating project" });
    }
});

// Delete project
router.delete("/projects/:projectId", verifyToken, async (req, res) => {
    try {
        const { projectId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: { projects: { _id: projectId } }
            },
            { new: true }
        ).select("-password");
        res.json(user.projects);
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});

// Add goal
router.post("/goals", verifyToken, async (req, res) => {
    try {
        const { title, description, targetDate, status, progress } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $push: {
                    goals: { title, description, targetDate, status, progress }
                }
            },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error adding goal" });
    }
});

// Update goal
router.put("/goals/:goalId", verifyToken, async (req, res) => {
    try {
        const { goalId } = req.params;
        const { title, description, targetDate, status, progress } = req.body;
        
        const user = await User.findById(req.userId);
        const goalIndex = user.goals.findIndex(g => g._id.toString() === goalId);
        
        if (goalIndex === -1) {
            return res.status(404).json({ message: "Goal not found" });
        }

        user.goals[goalIndex] = {
            ...user.goals[goalIndex],
            title, description, targetDate, status, progress
        };

        await user.save();
        res.json(user.goals);
    } catch (error) {
        res.status(500).json({ message: "Error updating goal" });
    }
});

// Delete goal
router.delete("/goals/:goalId", verifyToken, async (req, res) => {
    try {
        const { goalId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $pull: { goals: { _id: goalId } }
            },
            { new: true }
        ).select("-password");
        res.json(user.goals);
    } catch (error) {
        res.status(500).json({ message: "Error deleting goal" });
    }
});

// Get analytics
router.get("/analytics", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("analytics connectedProfiles");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics" });
    }
});

module.exports = router;
