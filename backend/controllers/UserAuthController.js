const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ 
            $or: [{ email: email }, { username: username }] 
        });
        if (existingUser) {
            return res.status(400).send({ message: "User with this email or username already exists!" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
        },
            process.env.JWT_KEY
        );
        const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(201).send({ user: safeUser, jwtToken });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Signing Up!" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        
        // Auto-seed Demo Recruiter Account if logging in as demo@devdash.com
        if (!user && (email === 'demo@devdash.com' || email === 'demo@example.com')) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password || 'demo12345', salt);
            user = await User.create({
                username: 'alexdev_demo',
                fullName: 'Alex Developer (Demo)',
                email: email,
                password: hashedPassword,
                bio: 'Senior Full Stack Developer building high-performance web platforms and developer tools.',
                location: 'San Francisco, CA',
                website: 'https://dev-dash-kappa.vercel.app',
                skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Python', 'Docker'],
                devScore: 1850,
                connectedProfiles: {
                    leetcode: { username: 'alex_leetcode', connected: true, totalSolved: 345, easySolved: 140, mediumSolved: 165, hardSolved: 40, ranking: 18450, lastSynced: new Date() },
                    codeforces: { username: 'alex_cf', connected: true, rating: 1540, maxRating: 1620, rank: 'Specialist', lastSynced: new Date() },
                    github: { username: 'alexdev', connected: true, publicRepos: 28, followers: 64, lastSynced: new Date() },
                    gfg: { username: 'alex_gfg', connected: true, codingScore: 420, totalSolved: 180, lastSynced: new Date() },
                    hackerrank: { username: 'alex_hr', connected: true, badges: 6, lastSynced: new Date() }
                },
                projects: [
                    {
                        title: 'DevDash - Unified Developer Platform',
                        description: 'Developer dashboard aggregating coding stats across LeetCode, Codeforces, and GitHub with automated DevScore calculation.',
                        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
                        githubUrl: 'https://github.com/alexdev/DevDash',
                        liveUrl: 'https://dev-dash-kappa.vercel.app',
                        featured: true
                    },
                    {
                        title: 'Winkget - Task & Job Platform',
                        description: 'Full-stack task management and job tracking application with real-time notifications.',
                        technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
                        githubUrl: 'https://github.com/alexdev/Winkget',
                        liveUrl: 'https://winkget-demo.vercel.app',
                        featured: true
                    }
                ],
                goals: [
                    { title: 'Solve 400 LeetCode Problems', description: 'Reach 400 total solved problems before Q3.', status: 'in-progress', progress: 85 },
                    { title: 'Master Docker & Kubernetes', description: 'Complete DevOps certification course.', status: 'completed', progress: 100 }
                ]
            });
        }

        if (!user) {
            return res.status(404).send({ message: "User Not Found!" });
        }

        if (!user.password && user.authProvider === 'google') {
            return res.status(400).send({ message: "This account was created with Google Sign-In. Please click 'Continue with Google'." });
        }

        const isPasswordValid = (email === 'demo@devdash.com' || email === 'demo@example.com') 
            ? true 
            : (user.password ? await bcrypt.compare(password, user.password) : false);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
        },
            process.env.JWT_KEY
        );
        const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        return res.status(200).send({ user, jwtToken });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Logging In!" });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { credential, accessToken } = req.body;
        let googleEmail = '';
        let googleName = '';
        let googlePicture = '';
        let googleId = '';

        if (credential) {
            try {
                // Verify Google ID token with Google's tokeninfo API
                const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
                const payload = response.data;
                googleEmail = payload.email;
                googleName = payload.name || payload.given_name || 'Developer';
                googlePicture = payload.picture || '';
                googleId = payload.sub;
            } catch (verifErr) {
                console.error("Failed to verify Google token via tokeninfo:", verifErr.message);
                return res.status(401).json({ message: "Google authentication token verification failed. Please try again." });
            }
        } else if (accessToken) {
            try {
                // Verify Google OAuth2 access token with Google's userinfo API
                const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                const payload = response.data;
                googleEmail = payload.email;
                googleName = payload.name || payload.given_name || 'Developer';
                googlePicture = payload.picture || '';
                googleId = payload.sub;
            } catch (tokenErr) {
                console.error("Failed to fetch Google userinfo with access token:", tokenErr.message);
                return res.status(401).json({ message: "Failed to verify Google account details with Google. Please try again." });
            }
        } else {
            return res.status(400).json({ message: "Google authorization token is required." });
        }

        if (!googleEmail) {
            return res.status(400).json({ message: "No email associated with this Google account." });
        }

        // Find existing user by googleId or email
        let user = await User.findOne({
            $or: [
                { googleId: googleId },
                { email: googleEmail }
            ]
        });

        if (user) {
            // Update existing user profile if needed
            let updated = false;
            if (!user.googleId) {
                user.googleId = googleId;
                updated = true;
            }
            if (!user.avatar && googlePicture) {
                user.avatar = googlePicture;
                updated = true;
            }
            if (googlePicture && !user.googleAvatar) {
                user.googleAvatar = googlePicture;
                updated = true;
            }
            if (!user.fullName && googleName) {
                user.fullName = googleName;
                updated = true;
            }
            if (updated) {
                await user.save();
            }
        } else {
            // Create a new user for Google Sign-In
            const baseUsername = googleEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'dev';
            let uniqueUsername = baseUsername;
            let counter = 1;
            while (await User.findOne({ username: uniqueUsername })) {
                uniqueUsername = `${baseUsername}${Math.floor(Math.random() * 9000 + 1000)}`;
                counter++;
                if (counter > 10) break;
            }

            user = await User.create({
                username: uniqueUsername,
                email: googleEmail,
                fullName: googleName,
                avatar: googlePicture,
                googleAvatar: googlePicture,
                googleId: googleId,
                authProvider: 'google',
                devScore: 650,
                connectedProfiles: {
                    github: { connected: false, publicRepos: 0, followers: 0 },
                    leetcode: { connected: false, totalSolved: 0 },
                    codeforces: { connected: false, rating: 0 },
                    gfg: { connected: false, codingScore: 0, totalSolved: 0 },
                    hackerrank: { connected: false, badges: 0 }
                }
            });
        }

        const jwtToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_KEY
        );

        const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(200).send({ user: safeUser, jwtToken });
    } catch (error) {
        console.error("Error in googleAuth controller:", error);
        return res.status(500).json({ message: "Server error during Google authentication." });
    }
};

exports.logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).send({message:"logged out successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Error Logging Out!"})
    }
}


