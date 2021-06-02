const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup controller
const signup = async (req, res) => {
  try {
    const { email, username, password, verifyPassword } = req.body;
    if (!email || !username || !password || !verifyPassword) {
      return res.status(400).json({ errorMessage: "please enter all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: "password should be at least 6 characters" });
    }

    if (password !== verifyPassword) {
      return res.status(400).json({ errorMessage: "passwords don't match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ errorMessage: "user already exists with this email" });
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // save new user to db
    const newUser = new User({
      email,
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    // sign the token
    const token = jwt.sign(
      {
        user_id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in http-only cookie
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res
      .json({ user_id: savedUser._id, user_name: savedUser.username })
      .send();
  } catch (error) {
    console.log(error);
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email => " + email);
    console.log("password => " + password);
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "please enter all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "wrong email or password" });
    }

    const passwordCorrect = bcrypt.compare(password, existingUser.password);

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "wrong email or password" });
    }

    console.log("password match");

    // sign the token
    const token = jwt.sign(
      {
        user_id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res
      .json({ user_id: existingUser._id, user_name: existingUser.username })
      .send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
