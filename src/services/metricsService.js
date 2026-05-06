let requestCount = 0;
const startTime = Date.now();

const metricsService = {
    incrementRequestCount: () => {
        requestCount++;
    },
    getMetrics: () => {
        return {
            uptime: Math.floor((Date.now() - startTime) / 1000),
            requests: requestCount,
            responseTime: Math.floor(Math.random() * 50) + 10 // Simulated ms
        };
    },
    getBuildInfo: () => {
        return {
            version: process.env.APP_VERSION || "1.0.0",
            commit: process.env.COMMIT_HASH || "development",
            buildDate: process.env.BUILD_DATE || new Date().toISOString(),
            pipelineStatus: process.env.PIPELINE_STATUS || "unknown"
        };
    }
};

module.exports = metricsService;
