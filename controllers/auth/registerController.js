const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, password, mail } = req.body;
    const existingUser = await User.exists({ mail });
    // Checking the existing user
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
        existingUser,
      });
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Creating the token
    const token = JWT.sign(
      {
        username,
        mail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    const newUser = await User.create({
      username,
      password: encryptedPassword,
      mail,
    });
    return res.status(201).send({
      success: true,
      message: "User created Successfully",
      newUser,
      token: token,
    });
  } catch (error) {
    console.log(`error`);
    return res.status(500).send({
      success: false,
      message: "Error in Register server controller",
      error,
    });
  }
};

module.exports = registerController;
