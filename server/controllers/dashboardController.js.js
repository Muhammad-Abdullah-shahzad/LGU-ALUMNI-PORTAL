const userModel = require('../models/dashboardModel');
const notificationModel = require("../models/notificationModel")
// stats for admin dashboard  1 request all data
exports.getAdminDashboard = async (req, res) => {
    const dashboardData = {};
    try {
        dashboardData.totalAlumni = await userModel.countDocuments({ role: 'alumni' });
        dashboardData.totalEmployedAlumni = await userModel.countDocuments({ role: 'alumni', "details.employmentStatus": "employed" });
        dashboardData.totalUnemployedAlumni = await userModel.countDocuments({ role: 'alumni', "details.employmentStatus": "unemployed" });
        dashboardData.notifications = await notificationModel.find({
            $or: [
                { notificationType: "editAlumni" },
                { notificationType: "post" },
                { notificationType: "deleteAlumni" },
            ]
        }).sort({ createdAt: -1 })

        dashboardData.departmentWiseCount = await userModel.aggregate([
            { $match: { role: 'alumni' } },
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $project: { department: "$_id", count: 1, _id: 0 } }
        ]);

        dashboardData.departmentWiseEmployed = await userModel.aggregate([
            { $match: { role: 'alumni', "details.employmentStatus": "employed" } },
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $project: { department: "$_id", count: 1, _id: 0 } }
        ]);
        res.status(200).json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error:error.message});
    }
};
