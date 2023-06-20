const express = require("express");
const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const Joi = require("joi");
const verifyToken = require("../middleware/authMiddleware");
const validator = require("express-joi-validation").createValidator({});

const router = express.Router();

// Creating the validation Schema

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

// API Requests
router.post("/register", validator.body(registerSchema), registerController);
router.post("/login", validator.body(loginSchema), loginController);

// Test Routes
router.get("/test", verifyToken, (req, res) => {
  res.send("Request Passed");
});

// Exporting the module
module.exports = router;
