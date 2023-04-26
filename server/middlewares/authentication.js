const Jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Kindly signin as a user",
      });
    }
    const token = authorization.slice(7, authorization.length);
    let verified = Jwt.verify(token, process.env.JWTPRIVATEKEY);
    if (!verified) {
      return res.status(401).json({
        message: "User not authorized",
      });
    }
    const { id } = verified;

    // Find the user by id
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        Error: "Invalid Credentials",
      });
    }
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({
      Error: "Unaothorized user",
    });
  }
};

module.exports = auth;
