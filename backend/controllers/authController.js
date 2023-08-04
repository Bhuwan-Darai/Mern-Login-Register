const User = require("../models/users");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("Test is working");
};

//register end point
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Check if the name was entered or not
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    //Check if password is good or bad
    if (!password || password.length < 6) {
      return res.json({ error: "Enter a strong 6 characters long password" });
    }

    //Check if email exist or not
    const exists = await User.findOne({ email });

    if (exists) {
      return res.json({ error: "Email is already taken" });
    }

    const hashedPassword = await hashPassword(password);

    //create a user
    const user = await User.create({ name, email, password: hashedPassword });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//loign end point
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "no user found" });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          res.cookie("token", token).json(user);
        },
      );
    }

    if (!match) {
      return res.json({ error: "password donot match" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const logOutUser = (req, res) => {
  const { token } = req.cookies.token;
  if (token) {
    jwt.clearCookie("token", token);
  }
};

module.exports = { test, registerUser, loginUser, getProfile, logOutUser };
