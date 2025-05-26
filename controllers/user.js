const User = require("../models/User");

//Get a User By Id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found...",
      });
    }
    req.profile = user;
    next();
  });
};

//Get a users profile info
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

//Update a user's name or password
exports.update = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password Must be At Least 6 Characters",
        });
      } else {
        user.password = password;
      }
    }
    user.save((err, updatedUser) => {
      if (err) {
        console.log("Sorry, we couldn't update your profile", err);
        return res.status(400).json({
          error: "User Update Failed",
        });
      }
      res.json(updatedUser);
    });
  });
};

// Delete a user

exports.remove = (req, res) => {
  User.findOneAndDelete({ _id: req.profile._id }, (err) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong, could not delete this user",
      });
    }
    return res.json({
      message: "User Was Deleted Successfully",
    });
  });
};

// Checks is a user has already registered and returns false if not
exports.checkExisting = (req, res) => {
  User.findOne({ email: req.query.email }).then((user, err) => {
    if (!user || err) {
      return res.send(false);
    } else {
      user.hashed_password = undefined;
      return res.json({ user });
    }
  });
};
