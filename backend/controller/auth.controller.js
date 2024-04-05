const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// sign up api
exports.signUp = async (req, resp) => {
  try {
    // chech if the email exists or not
    const user = await User.findOne({ email: req.body.email });

    if (user) return resp.status(400).json("User already exists");

    // encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // copy encrypt password to password
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // create token for user
    const token = jwt.sign({ id: newUser._id }, "mykey", { expiresIn: "7d" });

    resp.status(201).json({
      message: "user registered successfully with token " + token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {}
};

// login api
exports.login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return resp.status(404).json({ message: "User not found" });

    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!passwordValidation)
      return resp.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "mykey", { expiresIn: "7d" });

    resp.status(200).json({
      message: "user is authenticated " + token,
      user: { _id: user._id, name: user.name, email: email },
    });
  } catch (error) {
    resp.status(400).json({ message: "error authenticating user" });
  }
};
