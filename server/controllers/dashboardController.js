const userModel = require('../models/dashboardModel');
const notificationModel = require("../models/notificationModel")

// stats for admin dashboard  1 request all data

exports.getAdminDashboard = async (req, res) => {
    const dashboardData = {};
    try {
        dashboardData.totalAlumni = await userModel.countDocuments({ role: 'alumni', active: true });
        dashboardData.totalEmployedAlumni = await userModel.countDocuments({ role: 'alumni', "employmentStatus": "employed", active: true });
        dashboardData.totalUnemployedAlumni = await userModel.countDocuments({ role: 'alumni', "employmentStatus": "unemployed", active: true });

        // Undergraduate Stats
        dashboardData.totalUndergrad = await userModel.countDocuments({ role: 'undergraduate', active: true });
        dashboardData.totalEmployedUndergrad = await userModel.countDocuments({ role: 'undergraduate', "employmentStatus": "employed", active: true });
        dashboardData.totalUnemployedUndergrad = await userModel.countDocuments({ role: 'undergraduate', "employmentStatus": "unemployed", active: true });
        dashboardData.notifications = await notificationModel.aggregate([
            {
                $match: {
                    notificationType: {
                        $in: ["post", "alumniRegiter", "editAlumni", "deleteAlumni"]
                    },
                    sendTo: { $in: ["admin"] }   // Admin dashboard sees admin notifications
                }
            },

            // JOIN authorId -> users._id
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },

            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true
                }
            },

            // SORT NEWEST FIRST
            {
                $sort: { createdAt: -1 }
            },
            // SELECT ONLY USEFUL FIELDS
            {
                $project: {
                    _id: 1,
                    notificationId: 1,
                    notificationType: 1,
                    notificationContent: 1,
                    createdAt: 1,
                    sendTo: 1,
                    authorId: 1,
                    "author.name": 1,
                    "author.email": 1,
                    "author.department": 1
                }
            }
        ]);



        dashboardData.departmentWiseCount = await userModel.aggregate([
            { $match: { role: 'alumni', active: true } },
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $project: { department: "$_id", count: 1, _id: 0 } }
        ]);

        dashboardData.departmentWiseEmployed = await userModel.aggregate([
            { $match: { role: 'alumni', "employmentStatus": "employed", active: true } },
            { $group: { _id: "$department", employed: { $sum: 1 } } },
            { $project: { department: "$_id", employed: 1, _id: 0 } }
        ]);
        dashboardData.totalCoordinators = await userModel.countDocuments({ role: 'coordinator', active: true });
        res.status(200).json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


exports.getCoordinatorDashboard = async (req, res) => {
    const dashboardData = {};
    try {


        dashboardData.totalAlumni = await userModel.countDocuments({ role: 'alumni', department: req.user.department, active: 1 });
        dashboardData.totalEmployedAlumni = await userModel.countDocuments({ role: 'alumni', "employmentStatus": "employed", department: req.user.department, active: 1 });
        dashboardData.totalUnemployedAlumni = await userModel.countDocuments({ role: 'alumni', "employmentStatus": "unemployed", department: req.user.department, active: 1 });
        //  NOTIFICATIONS WITH USER JOIN 
        dashboardData.notifications = await notificationModel.aggregate([
            {
                $match: {
                    notificationType: {
                        $in: ["post", "alumniRegiter", "editAlumni", "deleteAlumni"]
                    },
                    sendTo: { $in: ["coordinator"] }

                }
            },

            // JOIN notification.authorId -> users._id
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },

            { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },

            // FILTER notifications by department of author
            {
                $match: {
                    "author.department": req.user.department
                }
            },

            // Sort by newest
            {
                $sort: { createdAt: -1 }
            },

            // Return the fields you actually want
            {
                $project: {
                    _id: 1,
                    notificationId: 1,
                    notificationType: 1,
                    notificationContent: 1,
                    createdAt: 1,
                    sendTo: 1,
                    authorId: 1,
                    "author.name": 1,
                    "author.email": 1,
                    "author.department": 1
                }
            }

        ])

        dashboardData.employeedBygraduationYear = await userModel.aggregate([
            { $match: { role: 'alumni', department: req.user.department, employmentStatus: "employed" } },
            { $group: { _id: "$graduationYear", count: { $sum: 1 } } },
            { $project: { graduationYear: "$_id", count: 1, _id: 0 } }
        ]).sort({ graduationYear: 1 });

        // dashboardData.departmentWiseEmployed = await userModel.aggregate([
        //     { $match: { role: 'alumni', "employmentStatus": "employed" } },
        //     { $group: { _id: "$department", count: { $sum: 1 } } },
        //     { $project: { department: "$_id", count: 1, _id: 0 } }
        // ]);
        res.status(200).json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
