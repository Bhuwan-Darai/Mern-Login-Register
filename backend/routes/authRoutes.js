const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logOutUser,
} = require("../controllers/authController");

//Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

//get route with test function object
router.get("/", test);

//post route to register the user
router.post("/register", registerUser);

//login route to register the user
router.post("/login", loginUser);

//
router.get("/profile", getProfile);

//logout route
router.post("/logout", logOutUser);

module.exports = router;
