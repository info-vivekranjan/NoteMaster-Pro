const express = require("express");
const router = express.Router();
const multer = require('multer');
const userController = require("../controllers/UserController");
const upload = multer({ dest: 'uploads/profile/' })

router.post("/register", upload.single('file'), userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
