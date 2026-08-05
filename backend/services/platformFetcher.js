const axios = require('axios');

/**
 * Fetch LeetCode statistics via public GraphQL endpoint
 */
async function fetchLeetCodeStats(username) {
    if (!username) return null;
    try {
        const query = `
            query userProblemsSolved($username: String!) {
                matchedUser(username: $username) {
                    username
                    submitStats: submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                    profile {
                        ranking
                        reputation
                    }
                }
            }
        `;
        const response = await axios.post(
            'https://leetcode.com/graphql',
            { query, variables: { username } },
            { headers: { 'Content-Type': 'application/json' }, timeout: 8000 }
        );

        const data = response.data?.data?.matchedUser;
        if (!data) {
            return { connected: false, error: 'User not found on LeetCode' };
        }

        const submissionStats = data.submitStats?.acSubmissionNum || [];
        const totalSolvedObj = submissionStats.find(s => s.difficulty === 'All');
        const easyObj = submissionStats.find(s => s.difficulty === 'Easy');
        const mediumObj = submissionStats.find(s => s.difficulty === 'Medium');
        const hardObj = submissionStats.find(s => s.difficulty === 'Hard');

        return {
            username: data.username,
            connected: true,
            totalSolved: totalSolvedObj ? totalSolvedObj.count : 0,
            easySolved: easyObj ? easyObj.count : 0,
            mediumSolved: mediumObj ? mediumObj.count : 0,
            hardSolved: hardObj ? hardObj.count : 0,
            ranking: data.profile?.ranking || 0,
            lastSynced: new Date()
        };
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error.message);
        return { connected: true, username, totalSolved: 0, ranking: 0, lastSynced: new Date() };
    }
}

/**
 * Fetch Codeforces user info via public REST API
 */
async function fetchCodeforcesStats(username) {
    if (!username) return null;
    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`, { timeout: 8000 });
        if (response.data.status === 'OK' && response.data.result.length > 0) {
            const user = response.data.result[0];
            return {
                username: user.handle,
                connected: true,
                rating: user.rating || 0,
                maxRating: user.maxRating || 0,
                rank: user.rank || 'Unrated',
                maxRank: user.maxRank || 'Unrated',
                avatar: user.titlePhoto || '',
                lastSynced: new Date()
            };
        }
        return { connected: false, error: 'User not found on Codeforces' };
    } catch (error) {
        console.error('Error fetching Codeforces stats:', error.message);
        return { connected: true, username, rating: 0, rank: 'Unrated', lastSynced: new Date() };
    }
}

/**
 * Fetch GitHub user public stats
 */
async function fetchGitHubStats(username) {
    if (!username) return null;
    try {
        const userRes = await axios.get(`https://api.github.com/users/${username}`, { timeout: 8000 });
        const user = userRes.data;

        return {
            username: user.login,
            connected: true,
            publicRepos: user.public_repos || 0,
            followers: user.followers || 0,
            following: user.following || 0,
            avatar: user.avatar_url || '',
            bio: user.bio || '',
            lastSynced: new Date()
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error.message);
        return { connected: true, username, publicRepos: 0, followers: 0, lastSynced: new Date() };
    }
}

/**
 * Calculate dynamic DevScore (Range: 0 - 2500)
 */
function calculateDevScore(stats = {}) {
    let score = 500; // Base score

    // LeetCode contribution
    if (stats.leetcode?.connected && stats.leetcode?.totalSolved) {
        score += Math.min(600, stats.leetcode.totalSolved * 2);
    }

    // Codeforces contribution
    if (stats.codeforces?.connected && stats.codeforces?.rating) {
        score += Math.min(700, Math.floor(stats.codeforces.rating * 0.4));
    }

    // GitHub contribution
    if (stats.github?.connected) {
        score += Math.min(400, (stats.github.publicRepos || 0) * 10 + (stats.github.followers || 0) * 15);
    }

    // GFG contribution
    if (stats.gfg?.connected && stats.gfg?.codingScore) {
        score += Math.min(300, stats.gfg.codingScore);
    }

    return Math.min(2500, Math.round(score));
}

module.exports = {
    fetchLeetCodeStats,
    fetchCodeforcesStats,
    fetchGitHubStats,
    calculateDevScore
};
