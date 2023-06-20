const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the token
  let token = req.body.token || req.query.token || req.headers["authorization"];

  // If token not found
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Token not found",
    });
  }
  // Validate the token

  try {
    // Remove the Bearer
    token = token.replace(/^Bearer\s+/, "");
    //Validate
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //Return
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Invalid Token",
    });
  }
  next();
};

module.exports = verifyToken;
