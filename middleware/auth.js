const jwt = require("jsonwebtoken");
const config = require("config");

exports.requireSignIn = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");
  //Check if no token
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  next();
};

// Example from B.T.
exports.isAuth = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.jwtSecret);
    if (decoded._id == req.profile._id) {
      return next();
    }
    return res.status(401).json({ error: "Token is not valid" });
  } catch (err) {
    res.status(401).json({ error: "Token Error" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
