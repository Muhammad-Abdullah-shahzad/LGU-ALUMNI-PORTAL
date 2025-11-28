const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyJWT");
// Route to create a user
router.post("/create", userController.createUser);

// route to get all users (optional, can be used for testing)
router.get("/:role",userController.getAllUsersByRole);

// route  to get user by id
router.get("/id/:id", userController.getUserById);
// update

router.put("/update",verifyToken,userController.updateUser)

// delete user

router.delete("/delete",userController.deleteUser)
module.exports = router