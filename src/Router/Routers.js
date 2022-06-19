const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const logInModel = require("../models/Model");
const StudentModel = require("../models/Model2");
const router = new express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const cookie_parser = require("cookie-parser");
const static_path = path.join(__dirname, "../");
const static_path_2 = path.join(__dirname, "../../views/");
const Auth = require("../middleware/Auth.js");

router.use(express.urlencoded({ extended: false }));
router.use(cookie_parser());

// router.get("/signin", (req, res) => {
//   res.sendFile(static_path + "SignInForm.html");
// });
router.get("/login", (req, res) => {
  res.sendFile(static_path + "LogInPage.html");
});
router.get("/secretPage", Auth, (req, res) => {
  res.render(static_path + "secretPage.html");
});
router.get("/logout", Auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token != req.token;
    });
    // logout from all devices
    // req.user.tokens=[]

    res.clearCookie("JWT");
    await req.user.save();
    res.sendFile(static_path + "LogInPage.html");
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/register2", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    const currentUser = await logInModel.findOne({ Email: email });
    if (currentUser != null) {
      const PasswordResult = await bcrypt.compare(
        password,
        currentUser.Password
      );
      if (PasswordResult) {
        const token = await currentUser.generateAuthToken();
        res.cookie("jwt", token, {
          expire: new Date(Date.now() + 9000000),
          httpOnly: true,
          secure: true,
        });

        // req.flash("message", await currentUser.NAME);

        res.sendFile(static_path + "secretPage.html");
      }
    } else {
      res.send(" < < < W R O N G - P A S S W O R D > > > ");
    }
  } catch (err) {
    res.send(" < < < I N V A L I D - L O G I N > > > ");
  }
});

router.post("/register", async (req, res) => {
  try {
    const Register = new logInModel({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: req.body.Password,
      // Address: req.body.Address,
    });
    const token = await Register.generateAuthToken();
    res.cookie("JWT", token, {
      httpOnly: true,
    });
    const createUser = await Register.save();
    res.sendFile(static_path + "LogInPage.html");
    // res.send("harry");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.get("/Studentdetail", (req, res) => {
  StudentModel.find({}, function (err, StuData) {
    res.render(static_path_2 + "StudentDetail.ejs", {
      StudentList: StuData,
    });
  });
});

router.post("/StudentEnterDetail", async (req, res) => {
  try {
    const RegisterUser = new StudentModel({
      Name: req.body.Name,
      DOB: req.body.Dob,
      Address: req.body.Address,
      Course: req.body.Course,
      Sem: req.body.Sem,
      Urn: req.body.Urn,
      Attendance: req.body.Attend,
      Cgpa: req.body.Cgpa,
    });
    const currentStu = await StudentModel.findOne({ Urn: req.body.Urn });
    console.log("WORKING 1");
    if (currentStu == null) {
      const createStu = await RegisterUser.save();
      console.log("Working 2");
      // req.flash("message", await currentUser.NAME);
      res.redirect("/Studentdetail");
    } else {
      res.send(" < < < This Roll number user already exist .... > > > ");
    }
  } catch (err) {
    console.log(err);
    res.send(" < < < I N V A L I D - R E G I S T E R > > > ");
  }
});

module.exports = router;
