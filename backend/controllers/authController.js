const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // ✅ FIX: prevent null/empty values
    if (!name || !email || !username || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      username, // ✅ FIX: now stored properly
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // ✅ FIX: allow login with email OR username
    const user = await User.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Username"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    res.json({
      message: "Login Successful",
      user
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};