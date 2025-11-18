const notificationModel = require('../models/notificationModel')
// create notification
exports.createNotificationController = async (req, res) => {
    try {
        const { notificationAuthor, notificationType, notificationContent } = req.body;
        await notificationModel.create({
            notificationAuthor,
            notificationType,
            notificationContent
        });
        res.status(201).json({ message: 'Notification created successfully' });

    }
    catch (error) {
        res.status(500).json({ message: 'failed to create notification', error });
    }
}
exports.getAdminNotificationsController = async (req, res) => {
    try {
        const notifications = await notificationModel.find({
            $or: [
                { notificationType: "editAlumni" },
                { notificationType: "post" },
                { notificationType: "deleteAlumni" },
            ]
        }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    }

    catch (error) {
        res.status(500).json({ message: 'failed to fetch notifications', error });
    }
}

exports.getCoordinatorNotificationsController = async (req, res) => {
    try {
        const notifications = await notificationModel.find({        
            $or: [
                { notificationType: "post" },
                { notificationType: "alumniRegiter" }
                ,
                { notificationType: "postApproval" },   
            ]   
        }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    }   
    catch (error) {

        res.status(500).json({ message: 'failed to fetch notifications', error });
    }
}
