const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://HARSHIT:hhh123ppp@cluster0.lpc5n.mongodb.net/Login_Page?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("CONNECTION SUCCESSFUL");
  })
  .catch((err) => {
    console.log(err);
  });
