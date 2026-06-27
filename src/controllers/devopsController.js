const metricsService = require('../services/metricsService');

exports.getHealth = (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
};

exports.getVersion = (req, res) => {
    res.status(200).json({ version: metricsService.getBuildInfo().version });
};

exports.getBuildInfo = (req, res) => {
    res.status(200).json(metricsService.getBuildInfo());
};

exports.getMetrics = (req, res) => {
    res.status(200).json(metricsService.getMetrics());
};
