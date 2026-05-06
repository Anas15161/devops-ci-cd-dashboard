const express = require('express');
const router = express.Router();
const devopsController = require('../controllers/devopsController');

router.get('/health', devopsController.getHealth);
router.get('/version', devopsController.getVersion);
router.get('/build-info', devopsController.getBuildInfo);
router.get('/metrics', devopsController.getMetrics);

module.exports = router;
