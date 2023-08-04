const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`MonogDB connected Succesfully`);
  })
  .catch((err) => {
    console.log("Error while connecting database", err);
  });

//middleware to parse the data
app.use(express.json());

//parse cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
