const userModel = require('../models/authModel');
const ERPAlumniData = require('../schema/ERPAlumniData')
const notificationModel = require('../models/notificationModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
async function registerUser(req, res) {

    try {
        const { firstName, lastName, email, password, cnic, batch, rollNo, degree, role = "alumni", active = 0, department } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await userModel.create({ ...req.body, password: hashedPassword });

        // create notification for coordinator and admin  for user approval
        await notificationModel.create({
            authorId: newUser._id,       // The user who just registered
            notificationAuthor: "alumni",
            notificationType: "alumniRegiter", // As per  schema
            sendTo: ["coordinator", "admin"],
            // For alumni registration approvals,
            authorRole: newUser.role,
            alumniId: newUser._id,
            notificationContent: `${newUser.firstName} ${newUser.lastName}  ${batch}/${degree}/${rollNo} has requested alumni registration approval.`,
        });


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("registerUser() error", error);
        res.status(500).json({ message: "Server error" });
    }
}




// Login User
async function loginUser(req, res) {
    try {

        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        // Create JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role, department: user.department, firstName: user.firstName, lastName: user.lastName },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                active: user.active,
                formsFilled: user.formsFilled,
                department: user.department,
                degree: user.degree,
                batch: user.batch,
                phoneNumber: user.phoneNumber,
                rollNo: user.rollNo,
                graduationYear: user.graduationYear,
                company: user.companyName,
                employmentStatus: user.employmentStatus
            }
        });

    } catch (error) {
        console.error("loginUser() error", error);
        res.status(500).json({ message: "Server error" });
    }
}

// get form data for autofill user info
async function getFormData(req, res) {
    try {
        const { rollNo, batch, degree } = req.params;

        console.log("alumni roll no recieved from front end is ", rollNo);

        const alumniData = await ERPAlumniData.find({ StdRollNo: `${batch}/${degree}/${rollNo}` })

        res.status(200).json({ alumniData })


    } catch (error) {
        res.status(400).json({
            message: "failed to get alumni"
        })
        console.log("error fetching alumni auto fill data ", error);

    }
}

module.exports = { registerUser, loginUser, getFormData };
