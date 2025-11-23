const express = require("express");
const Router = express.Router();
const { verifyToken } = require("../middleware/verifyJWT");
const { verifyRoles } = require("../middleware/verifyRole");


// defined path k enter honay pr kuch code run krna

const notificationController = require("../controllers/notificationController");
Router.get("/admin", notificationController.getAdminNotificationsController);
Router.get("/coordinator", notificationController.getCoordinatorNotificationsController);
Router.get("/president", notificationController.getPresidentNotificationsController);
Router.get("/alumni", notificationController.getAlumniNotificationsController);
Router.post("/create", verifyToken,verifyRoles("admin","coordinator","president","alumni"),notificationController.createNotificationController)
Router.delete("/del", notificationController.delNotification)
module.exports = Router;




