const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
// Define the User schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: "admin",
    trim: true
  }
});



schema.pre("save", async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, Number(process.env.BCRYPT_HASH));
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});



// Create the User model based on the schema
const Admin = mongoose.model('admin', schema);
module.exports = Admin;
