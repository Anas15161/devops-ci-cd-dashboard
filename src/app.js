const express = require('express');
const path = require('path');
const metricsService = require('./services/metricsService');
const devopsRoutes = require('./routes/devopsRoutes');

const app = express();

// Middleware to track requests
app.use((req, res, next) => {
    metricsService.incrementRequestCount();
    next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', devopsRoutes);

// SPA fallback (Fixed for Express 5 / path-to-regexp v8)
app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
