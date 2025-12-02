const express = require("express");
const Router = express.Router();
const { verifyToken } = require("../middleware/verifyJWT");
const { verifyRoles } = require("../middleware/verifyRole");


// defined path k enter honay pr kuch code run krna

const notificationController = require("../controllers/notificationController");
Router.get("/admin", verifyToken, verifyRoles('admin'), notificationController.getAdminNotificationsController);
Router.get("/coordinator", verifyToken, verifyRoles('coordinator'), notificationController.getCoordinatorNotificationsController);
Router.get("/president", verifyToken, verifyRoles('president'), notificationController.getPresidentNotificationsController);
Router.get("/alumni", verifyToken, notificationController.getAlumniNotificationsController);
Router.post("/create", verifyToken, verifyRoles("admin", "coordinator", "president", "alumni"), notificationController.createNotificationController)
Router.delete("/del", verifyToken, verifyRoles("admin", "coordinator"),notificationController.delNotification)
module.exports = Router;




