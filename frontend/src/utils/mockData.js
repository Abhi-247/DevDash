export const mockUser = {
    id: "u-123456",
    email: "demo@dev.com",
    password: "password", // In a real app, never store passwords like this
    name: "Alex Developer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    role: "Frontend Engineer",
    bio: "Passionate React enthusiast building accessible web apps.",
    location: "San Francisco, CA",
    joinedMonth: "Jan 2024",
    devScore: 780,
    skills: ["React", "JavaScript", "Tailwind CSS", "Node.js", "GraphQL"],
    profileCompletion: 85,
};

export const codingData = {
    leetcode: {
        connected: true,
        username: "alex_dev",
        totalSolved: 450,
        ranking: 12500,
        streak: 15,
        breakdown: {
            easy: 150,
            medium: 250,
            hard: 50,
        }
    },
    codechef: {
        connected: false, // For testing "connect" state
        username: null,
        rating: 0,
        stars: 0,
    }
};

export const githubData = {
    connected: true,
    username: "alex-codes",
    repos: 42,
    commitsLast30Days: 156,
    stars: 340,
    forks: 85,
    topLanguages: [
        { name: "JavaScript", color: "#f1e05a" },
        { name: "TypeScript", color: "#2b7489" },
        { name: "HTML", color: "#e34c26" }
    ],
    activity: [
        { day: "Mon", commits: 5 },
        { day: "Tue", commits: 12 },
        { day: "Wed", commits: 8 },
        { day: "Thu", commits: 20 },
        { day: "Fri", commits: 15 },
        { day: "Sat", commits: 2 },
        { day: "Sun", commits: 0 },
    ]
};

export const vercelData = {
    connected: true,
    username: "alex-vercel",
    totalProjects: 12,
    liveDeployments: 8,
    lastDeployment: "2 hours ago",
    deployments: [
        { id: 1, name: "portfolio-v2", status: "success", url: "https://alex.dev" },
        { id: 2, name: "dev-dashboard", status: "building", url: null },
        { id: 3, name: "ecommerce-mock", status: "failed", url: null },
    ]
};

export const chartData = {
    weeklyActivity: [
        { name: 'Mon', value: 40 },
        { name: 'Tue', value: 30 },
        { name: 'Wed', value: 60 },
        { name: 'Thu', value: 45 },
        { name: 'Fri', value: 80 },
        { name: 'Sat', value: 20 },
        { name: 'Sun', value: 10 },
    ],
    languageUsage: [
        { name: 'JavaScript', value: 60, fill: '#f1e05a' },
        { name: 'CSS', value: 20, fill: '#563d7c' },
        { name: 'HTML', value: 10, fill: '#e34c26' },
        { name: 'Other', value: 10, fill: '#ccc' },
    ],
    codingProgress: [
        { name: 'Easy', value: 150, fill: '#00b8a3' },
        { name: 'Med', value: 250, fill: '#ffc01e' },
        { name: 'Hard', value: 50, fill: '#ff375f' },
    ]
};
