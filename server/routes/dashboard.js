const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyJWT.js');
const { verifyRoles } = require('../middleware/verifyRole.js');

const dashboardController = require('../controllers/dashboardController.js');

// Admin Dashboard Route
router.get('/admin', verifyToken, verifyRoles("admin"), dashboardController.getAdminDashboard);
// coordinator dashboard
router.get("/coordinator",verifyToken, verifyRoles("admin","coordinator"),dashboardController.getCoordinatorDashboard)

module.exports = router;