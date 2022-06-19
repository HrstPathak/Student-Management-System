const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const StudentSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  DOB: {
    type: String,
    // required: true,
    // unique: true,
  },
  Address: {
    type: String,
    // required: true,
    // minlength: 6,
  },
  Course: {
    type: String,
    // required: true,
  },
  Sem: {
    type: String,
    // required: true,
  },
  Urn: {
    type: String,
    // required: true,
  },
  Attendance: {
    type: String,
    // required: true,
  },
  Cgpa: {
    type: String,
    // required: true,
  },
  //   tokens: [
  //     {
  //       token: {
  //         type: String,
  //         // required: true,
  //       },
  //     },
  //   ],
});
const StudentModel = new mongoose.model("Studentdata", StudentSchema);
module.exports = StudentModel;
