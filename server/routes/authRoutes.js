const express = require('express');
const { loginUser, registerUser , getFormData } = require('../controllers/authController');

const router = express.Router();    

// router.post('/login', loginUser);

router.post('/register', registerUser);
router.get("/register/formdata/:batch/:degree/:rollNo",getFormData)
router.post('/login',loginUser);

module.exports = router;