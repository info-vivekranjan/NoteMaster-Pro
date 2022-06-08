const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "Auth token is required for authentication" });
  }
  try {
    const { user_id, exp } = await jwt.verify(token, "TodoToken123");

    // For one private user
    req.user = await User.findById(user_id);

    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
