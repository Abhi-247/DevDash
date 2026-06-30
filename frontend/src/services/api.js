import axios from 'axios';

// Mocked API service to run without a real backend

const defaultUser = {
    id: "uuid-1",
    name: "John Developer",
    email: "test@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Developer&background=6366f1&color=fff",
    bio: "Full-stack craftsman building things for the web.",
    role: "Developer",
    skills: ["React", "Node", "TypeScript", "Python", "Tailwind"],
    devScore: 1850,
    profileCompletion: 80
};

const defaultStats = {
    coding: {
        leetcode: { totalSolved: 345, streak: 12 }
    },
    github: {
        repos: 42
    },
    vercel: {
        liveDeployments: 14
    },
    charts: {
        weeklyActivity: [
            { name: "Mon", value: 4 },
            { name: "Tue", value: 3 },
            { name: "Wed", value: 8 },
            { name: "Thu", value: 5 },
            { name: "Fri", value: 6 },
            { name: "Sat", value: 2 },
            { name: "Sun", value: 5 },
        ],
        languageUsage: [
            { name: "JavaScript", value: 50, fill: "#f7df1e" },
            { name: "TypeScript", value: 30, fill: "#3178c6" },
            { name: "Python", value: 20, fill: "#3776ab" },
        ],
        codingProgress: [
            { name: "Week 1", value: 10, fill: "#818cf8" },
            { name: "Week 2", value: 20, fill: "#818cf8" },
            { name: "Week 3", value: 25, fill: "#818cf8" },
            { name: "Week 4", value: 35, fill: "#818cf8" },
        ]
    }
};

export const api = {
    login: async (email, password) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/login`, { 
            email, 
            password 
        }, { 
            withCredentials: true 
        });
        return { token: response.data.jwtToken, user: response.data.user };
    },

    register: async (name, email, password) => {
        // We pass 'name' as 'username' since that's what your backend expects
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/signup`, { 
            username: name, 
            email, 
            password 
        });
        return { user: response.data.user };
    },

    logout: async () => {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/user/logout`, {}, { 
            withCredentials: true 
        });
    },

    getDashboardStats: async () => {
        return new Promise(resolve => setTimeout(() => resolve(defaultStats), 800));
    },

    connectPlatform: async (platform, username) => {
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 800));
    },

    getUserProfile: async (username) => {
        return new Promise(resolve => setTimeout(() => resolve(defaultUser), 500));
    }
};
