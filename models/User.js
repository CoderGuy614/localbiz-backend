const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  fbSignup: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return hash;
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainText) {
    console.log(plainText, this.hashed_password);
    return bcrypt.compareSync(plainText, this.hashed_password);
  },
};

module.exports = mongoose.model("user", userSchema);
