// Rich engineering dataset for Recruiter Demo Mode
// Ensures recruiters immediately see a top-tier, high-effort developer profile

export const MOCK_RECRUITER_DATA = {
    username: "abhishek_dev",
    fullName: "Abhishek Verma",
    role: "Full Stack & Distributed Systems Engineer",
    bio: "Passionate Software Engineer specializing in high-throughput web applications, event-driven architectures, and developer tooling. Solved 650+ DSA problems with a strong foundation in system design.",
    location: "Bangalore, India (Open to Remote / Relocation)",
    email: "abhishek.verma.dev@gmail.com",
    website: "https://devdash.live",
    githubUrl: "https://github.com/Abhi-247",
    linkedinUrl: "https://linkedin.com/in/abhishekverma-dev",
    devScore: 1740,
    percentile: "Top 3.2% Global",
    status: "Actively interviewing for Full Stack & Backend Roles",
    skills: [
        "React 19", "Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL",
        "Redis", "Docker", "System Design", "Distributed Systems", "Tailwind CSS",
        "REST APIs", "WebSockets", "Kafka", "AWS", "Git"
    ],
    skillCategories: {
        frontend: ["React 19", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "Recharts", "Vite"],
        backend: ["Node.js", "Express.js", "RESTful APIs", "WebSockets", "Microservices", "JWT Auth"],
        dataAndCloud: ["MongoDB", "PostgreSQL", "Redis Caching", "Docker", "AWS S3/EC2", "Kafka"],
        dsaAndCore: ["Data Structures & Algorithms", "System Design", "OOP", "OS & Networking", "Concurrency"]
    },
    radarMetrics: [
        { subject: "Algorithms (DSA)", A: 94, fullMark: 100 },
        { subject: "System Design", A: 88, fullMark: 100 },
        { subject: "Full Stack Dev", A: 96, fullMark: 100 },
        { subject: "Git Velocity", A: 92, fullMark: 100 },
        { subject: "Code Reliability", A: 90, fullMark: 100 },
        { subject: "DevOps & Cloud", A: 84, fullMark: 100 }
    ],
    connectedProfiles: {
        leetcode: {
            username: "abhi_code",
            connected: true,
            totalSolved: 648,
            easySolved: 240,
            mediumSolved: 328,
            hardSolved: 80,
            ranking: 18640,
            contestRating: 1845,
            badge: "Knight (Top 6%)",
            lastSynced: new Date().toISOString()
        },
        github: {
            username: "Abhi-247",
            connected: true,
            publicRepos: 38,
            followers: 142,
            totalCommits: 1420,
            totalPRs: 64,
            starsEarned: 230,
            streakDays: 48,
            lastSynced: new Date().toISOString()
        },
        codeforces: {
            username: "abhi_forces",
            connected: true,
            rating: 1542,
            maxRating: 1610,
            rank: "Specialist",
            maxRank: "Expert",
            lastSynced: new Date().toISOString()
        },
        gfg: {
            username: "abhishek_gfg",
            connected: true,
            codingScore: 820,
            totalSolved: 410,
            institutionRank: 4,
            lastSynced: new Date().toISOString()
        },
        hackerrank: {
            username: "abhishek_hr",
            connected: true,
            badges: 6,
            goldenBadges: ["Problem Solving (6-Star)", "Python (5-Star)", "SQL (5-Star)"],
            lastSynced: new Date().toISOString()
        }
    },
    projects: [
        {
            _id: "p1",
            title: "DevDash — Cloud-Native Developer Telemetry & Outreach CRM",
            description: "Production-grade developer command center with real-time coding telemetry sync across 5 platforms, background IMAP email workers for automated job outreach, and interactive ATS resume scoring.",
            technologies: ["React 19", "Node.js", "Express", "MongoDB", "IMAP Flow", "Tailwind CSS", "Recharts"],
            githubUrl: "https://github.com/Abhi-247/DevDash",
            liveUrl: "https://devdash.live",
            featured: true,
            metrics: "Processed 10k+ sync events with p99 response time < 45ms",
            architecture: "Client SPA -> Express API Gateway -> IMAP Email Sync Daemon -> MongoDB Atlas + Cache"
        },
        {
            _id: "p2",
            title: "Distributed Async Job Queue & Worker Daemon",
            description: "High-concurrency distributed message processing system engineered using Node.js, Redis pub/sub, and dead-letter queues with exponential backoff retry mechanics.",
            technologies: ["Node.js", "Redis", "TypeScript", "Docker", "REST API"],
            githubUrl: "https://github.com/Abhi-247/distributed-job-queue",
            liveUrl: "https://queue-benchmarks.demo.app",
            featured: true,
            metrics: "Sustained 4,200 req/sec with zero task drops under simulated stress tests",
            architecture: "Producer API -> Redis Task Ring -> Clustered Worker Nodes -> Telemetry Dashboard"
        },
        {
            _id: "p3",
            title: "Collaborative Real-time Canvas & Code Pad",
            description: "Low-latency browser-based collaborative ideation tool utilizing WebSockets and Conflict-free Replicated Data Types (CRDTs) to sync whiteboard strokes and code execution across 100+ concurrent users.",
            technologies: ["React", "WebSockets", "Canvas API", "Node.js", "CRDTs"],
            githubUrl: "https://github.com/Abhi-247/realtime-canvas",
            liveUrl: "https://canvas-collab.demo.app",
            featured: true,
            metrics: "Sub-15ms sync latency between distributed browser clients via binary protocol",
            architecture: "Browser WebSocket Client -> Socket Engine Cluster -> Room State Sync Memory Layer"
        },
        {
            _id: "p4",
            title: "Scalable Microservices E-Commerce Core",
            description: "Modular backend services covering User Auth (JWT), Product Catalog, Order Ingestion, and Payment processing with Stripe webhook verification and idempotency safeguards.",
            technologies: ["Express", "MongoDB", "Stripe API", "Docker", "JWT"],
            githubUrl: "https://github.com/Abhi-247/microservices-backend",
            liveUrl: "https://ecommerce-api.demo.app",
            featured: false,
            metrics: "Idempotent transaction layer preventing duplicate payments with 100% test coverage",
            architecture: "API Gateway -> Auth Service -> Inventory Service -> Stripe Webhook Listener"
        }
    ],
    goals: [
        {
            _id: "g1",
            title: "Master Distributed Systems Design & Microservices",
            description: "Deep dive into Raft consensus, Kafka stream processing, and CQRS patterns.",
            status: "in-progress",
            progress: 85,
            targetDate: "2026-10-15"
        },
        {
            _id: "g2",
            title: "Reach 700+ Problems on LeetCode & Maintain 1850+ Contest Rating",
            description: "Focus on Graph Algorithms, Trie, and Advanced Dynamic Programming.",
            status: "in-progress",
            progress: 92,
            targetDate: "2026-11-01"
        },
        {
            _id: "g3",
            title: "Deploy DevDash Production Release on Vercel & Render",
            description: "Configured full CI/CD pipeline, automated testing, and custom domain SSL.",
            status: "completed",
            progress: 100,
            targetDate: "2026-08-30"
        }
    ],
    outreachStats: {
        totalSent: 68,
        opened: 49,
        repliesReceived: 19,
        interviewsScheduled: 6,
        responseRate: "27.9%",
        avgResponseTime: "1.4 days"
    },
    sampleJobPresets: [
        {
            company: "Stripe",
            role: "Full Stack Engineer (Payments Infrastructure)",
            requirements: "Experience with React, Node.js, TypeScript, REST APIs, idempotency, distributed systems, SQL, high-reliability payment pipelines."
        },
        {
            company: "Vercel",
            role: "Frontend Systems Engineer",
            requirements: "Deep mastery of React 19, Vite, Next.js, web performance optimization, Tailwind CSS, component systems, server components, and developer tooling."
        },
        {
            company: "Google",
            role: "Software Engineer III (Core Cloud Platform)",
            requirements: "Strong algorithms and data structures background (LeetCode Hard/Medium), distributed caching, concurrent programming, Node/Go/Java, system design."
        }
    ]
};
