/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken");
//const env = require('../configs');

exports.createToken = (user) =>
  jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);
exports.decodeToken = (token) => jwt.decode(token);
