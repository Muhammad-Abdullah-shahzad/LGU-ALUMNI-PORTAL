const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyJWT");
const {verifyRoles} = require("../middleware/verifyRole")
// Route to create a user

router.post("/create",userController.createUser);

// route to get all users (optional, can be used for testing)

router.get("/:role",verifyToken,verifyRoles('coordinator',"admin"),userController.getAllUsersByRole);

// route  to get user by id

router.get("/id/:id",verifyToken,userController.getUserById);

// update

router.put("/update",verifyToken,userController.updateUser)

// delete user

router.delete("/delete",verifyToken,userController.deleteUser)

module.exports = router