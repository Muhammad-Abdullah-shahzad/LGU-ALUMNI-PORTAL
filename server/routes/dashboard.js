const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyJWT.js');
const { verifyRoles } = require('../middleware/verifyRole.js');

const adminController = require('../controllers/dashboardController.js');

// Admin Dashboard Route
router.get('/admin', verifyToken, verifyRoles("admin"), adminController.getAdminDashboard);
// coordinator dashboard
router.get("/coordinator/:coordinatorId",)

module.exports = router;