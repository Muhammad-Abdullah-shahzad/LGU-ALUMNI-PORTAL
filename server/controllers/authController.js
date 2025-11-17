const userModel = require('../models/authModel');
async function registerUser(req, res) {
    try {
        const { firstName, lastName, email, password, cnic, batch, rollNo, degree, role = "alumni" } = req.body; // Access registration data
      
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password,
            cnic,
            batch,
            rollNo,
            degree,
            role
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.log("registerUser() error ", error);
    }
}

module.exports = { registerUser };