const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LoginSchema = new mongoose.Schema({
  Name: {
    type: String,
    // required: true,
    // min: 3,
  },
  Email: {
    type: String,
    // required: true,
    // unique: true,
  },
  Password: {
    type: String,
    // required: true,
    // minlength: 6,
  },
  // Address: {
  //   // type: String,
  //   // required: true,
  // },
  tokens: [
    {
      token: {
        type: String,
        // required: true,
      },
    },
  ],
});
LoginSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      "this_is_a_full_authentication_page"
      // process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    // res.send("E R R O R");
    console.log(error);
  }
};
LoginSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 4);
    // we can set 4 into greater value like 10 12 etc
  }

  next();
});
const logInModel = new mongoose.model("logindata", LoginSchema);
module.exports = logInModel;
