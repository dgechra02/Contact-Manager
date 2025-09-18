const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const aysncHandler = require("express-async-handler");
// it will automatically handle all errors, no need to write try catch block

// @desc Register user
// @route GET /api/users/register
// @access public
const registerUser = aysncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // So saltOrRounds = 10 is saying: "bcrypt, generate a random salt for me and use 10 rounds of hashing to secure this password."
  console.log("Hashed password: ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    console.log("user created: ", user);
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login user
// @route GET /api/users/login
// @access public
const loginUser = aysncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("login controller ran");
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        // payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ accessToken });
    const userCookies = await cookieStore;
  } else {
    res.status(401); // 401 - invalid credentials
    throw new Error("Email or password is not valid");
  }
});

// @desc Current user
// @route GET /api/users/current-user
// @access private
const currentUser = aysncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
