const express = require('express');
const router = express.Router();
const adminController = require('../controllers/dashboardController.js');

// Admin Dashboard Route
router.get('/admin', adminController.getAdminDashboard);
module.exports = router;