const notificationModel = require('../models/notificationModel')
// create notification

exports.createNotificationController = async (req, res) => {
    try {
        console.log("req.user=", req.user);

        await notificationModel.create({ ...req.body, authorId: req.user.id });
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
                { notificationType: "alumniRegiter" },
                { notificationType: "postApproval" },
                { notificationType: "editAlumniStatus" },
                { notificationType: "deleteAlumniStatus" },
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    }

    catch (error) {

        res.status(500).json({ message: 'failed to fetch notifications', error });
    }
}

exports.getPresidentNotificationsController = async (req, res) => {
    try {
        const notifications = await notificationModel.find({
            $or: [
                { notificationType: "post" },
                { notificationType: "postApprovalStatus" },
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    }
    catch (error) {

        res.status(500).json({ message: 'failed to fetch notifications', error });
    }
}

exports.getAlumniNotificationsController = async (req, res) => {
    try {
        const notifications = await notificationModel.find({
            $or: [
                { notificationType: "post" },
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    }
    catch (error) {

        res.status(500).json({ message: 'failed to fetch notifications', error });
    }
}

exports.delNotification = async (req, res) => {
    try {

        const { _id } = req.body
        const deleted = await notificationModel.findByIdAndDelete(_id);
        res.status(200).json({ message: "deleted" })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}