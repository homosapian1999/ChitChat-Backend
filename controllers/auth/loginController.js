const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail });

    if (!user || (await bcrypt.compare(password, user.password)) === false) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // Generate the JWT Token
    const token = JWT.sign(
      {
        userID: user._id,
        mail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.log(`error`);
    return res.status(500).send({
      success: false,
      message: "Error in Login server controller",
      error,
    });
  }
};

module.exports = loginController;
