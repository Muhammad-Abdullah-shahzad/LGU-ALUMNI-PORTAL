const userModel = require("../models/userModel")

// Controller to create a user

exports.createUser = async (req, res) => {
    try {

        const newUser = new userModel(req.body);

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
        const users = await userModel.find(
            {
                role:role || "alumni"
            }
        );
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
    