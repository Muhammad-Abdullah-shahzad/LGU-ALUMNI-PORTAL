const userModel = require("../models/userModel")

const bcrypt = require('bcryptjs');
// Controller to create a user

exports.createUser = async (req, res) => {
    try {
        //  console.log("data coming from front end " , req.body);

        const findUser = await userModel.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await userModel.create({ ...req.body, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    }


    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get user by id
exports.getUserById = async (req, res) => {
    try {
        console.log("id recieved ", req.params.id);

        const userId = req.params.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all users (for testing purposes)

exports.getAllUsersByRole = async (req, res) => {
    try {
        const role = req.params.role;
        let query = { active: 1 };

        if (role === 'alumni') {
            query.role = { $in: ['alumni', 'undergraduate'] };
        } else {
            query.role = role || "alumni";
        }

        const users = await userModel.find(query);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const delId = req.body.id;

        await userModel.deleteOne({
            _id: delId
        });
        res.status(200).json({ message: "successfully deleted" })
    } catch (error) {
        res.status(400).json({ message: "failed to deleted" })
        console.log("deletion error");
    }
}

exports.updateUser = async function (req, res) {
    try {

        await userModel.findOneAndUpdate(
            { _id: req.body.id || req.user.id },
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ message: "user updated successfully" })

    } catch (error) {
        res.status(500).json({ message: "server error" })

    }

}