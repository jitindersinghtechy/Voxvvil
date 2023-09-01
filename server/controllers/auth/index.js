const User = require("../../database/models/auth/user")
const Token = require("../../helper/token");
const bcrypt = require("bcrypt");
const sendMail = require("../../helper/sendmail");
exports.signup = async (req, res) => {
  let { name = false, email = false, password = false } = req.body;
  // Check All Field is filled or not
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All field is required" });
  }
  // Check User is already Exist or not
  let checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({ success: false, message: "User already Exist" });
  }
  try {
    let newUser = await User.create({ name, email, password });
    const token = Token.create({ id: newUser.id, role: newUser.role, name: newUser.name });
    sendMail.sendLoginEmail(email);
    return res.status(201).json({ success: true, message: `Welcome ${newUser.name}`, token });
  } catch (err) {
    console.log(err)
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "All Feild is required", error: err.message });
    }
    return res.status(400).json({ success: false, message: "There is some error please try again later" });
  }
};

exports.login = (req, res) => {
  const { email = false, password = false } = req.body;
  // Check All Field is filled or not
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All input is required" });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ success: false, message: "User not Found" });
      }
      // Check password is same or not
      bcrypt.compare(password, user.password,
        function (err, bcryptRes) {
          if (bcryptRes) {
            const token = Token.create({ id: user.id, role: user.role, name: user.name });
            sendMail.sendLoginEmail(user.email);
            return res.status(200).json({ success: true, message: `Welcome ${user.name}`, token });
          }
          return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }
      );
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ success: false, message: "There is some error please try again later" });
    });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email = false, } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "All input is required" });
    }
    let checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ success: false, message: "User not Exist" });
    }
    
    const token = Token.create({ id: newUser.id, role: newUser.role});
    return res.status(201).json({ success: true, message: `Welcome ${newUser.name}`, token });
  } catch (err) {
    console.log(err)
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "All Feild is required", error: err.message });
    }
    return res.status(400).json({ success: false, message: "There is some error please try again later" });
  }

};
