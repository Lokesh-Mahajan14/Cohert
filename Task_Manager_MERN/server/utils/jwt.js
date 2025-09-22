const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "DEFAULT_SECRET_KEY", {
    expiresIn: 3 * 24 * 60 * 60, // 3 days
  });
};

module.exports = { generateToken };
