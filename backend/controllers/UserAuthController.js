const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
        return res.status(201).send({ user });
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

        const isPasswordValid = (email === 'demo@devdash.com' || email === 'demo@example.com') ? true : await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
        },
            process.env.JWT_KEY
        );
        res.cookie("token", jwtToken, {
            path:"/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax"
        });
        return res.status(200).send({ user, jwtToken });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Logging In!" });
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

