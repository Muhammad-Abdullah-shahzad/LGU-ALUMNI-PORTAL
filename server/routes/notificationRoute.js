const express = require("express");
const Router = express.Router();

// defined path k enter honay pr kuch code run krna

const notificationController = require("../controllers/notificationController");

Router.get("/admin", notificationController.getAdminNotificationsController);
Router.get("/coordinator", notificationController.getCoordinatorNotificationsController);
Router.get("/president", notificationController.getPresidentNotificationsController);
Router.get("/alumni", notificationController.getAlumniNotificationsController);
Router.post("/create",notificationController.createNotificationController)

module.exports=Router;




