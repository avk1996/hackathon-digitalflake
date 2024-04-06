const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_KEY = "mykey";

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
    const token = jwt.sign({ id: newUser._id }, JWT_KEY, { expiresIn: "7d" });

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

    const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "7d" });

    resp.status(200).json({
      message: "user is authenticated " + token,
      user: { _id: user._id, name: user.name, email: email },
    });
  } catch (error) {
    resp.status(400).json({ message: "error authenticating user" });
  }
};

exports.forgetPassword = async (req, resp) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    console.log(existingEmail);
    if (!existingEmail) return resp.status(404).json("Email Not Found");
    const key = JWT_KEY + existingEmail.password;
    const token = jwt.sign(
      { email: existingEmail.email, id: existingEmail._id },
      key,
      { expiresIn: "5m" },
      (err, token) => {
        if (err) {
          console.error("Error generating token: ", err);
          // Handle the error
        } else {
          // Token generated successfully
          console.log("Token generated: ", token);
          // Proceed with sending the token...
          const link = `http://localhost:8080/digital-flake/auth/resetpassword/${existingEmail._id}/${token}`;
          console.log(link);
        }
      }
    );
  } catch (error) {
    console.log("Error got: " + error);
  }
};

exports.resetPassword = async (req, resp) => {
  try {
    const { id, token } = req.params;
    console.log(req.params);
    const isUser = await User.findOne({ _id: id });
    if (!isUser)
      return resp.status(404).json({ message: "User does not exist" });
    const key = JWT_KEY + isUser.password;
    const verify = jwt.verify(token, key);
    resp.render("index", { email: verify.email });
  } catch (error) {
    console.log("Error in get " + error);
    resp.send("Not verified");
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_KEY + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    console.log(verify);
    const encryptedPassword = bcrypt.hash(password, 12);
    console.log(encryptedPassword);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
};
