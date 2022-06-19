const jwt = require("jsonwebtoken");
const logInModel = require("../models/Model");

const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await logInModel.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
module.exports = Auth;
