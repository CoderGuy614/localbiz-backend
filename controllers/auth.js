const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
// const auth = require("../middleware/auth");
const gravatar = require("gravatar");

//Signup A New User
exports.signup = async (req, res) => {
  let { name, email, password, fbSignup, avatar } = req.body;
  try {
    let user = await User.findOne({ email });

    // See if the user exists already
    if (user && user.fbSignup === true) {
      return res.status(400).json({
        error:
          "You previously signed up with Facebook. Please Continue with Facebook.",
      });
    }

    // See if the user exists already
    if (user) {
      return res
        .status(400)
        .json({ error: "This Email is Already Registered, Please Sign In" });
    }

    if (!avatar) {
      avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
    }
    user = new User({
      name,
      email,
      avatar,
      fbSignup,
      password,
    });
    const newUser = await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    // jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
    //   if (err) throw err;
    //   res.json({ token, user: newUser });
    // });
    const token = jwt.sign({ _id: newUser._id }, process.env.jwtSecret);
    // const { _id, name, email, role } = newUser;
    return res.json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//SignIn a current User
exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    if (!user.authenticate(password) && user.fbSignup === true) {
      return res.status(401).json({
        error:
          "This email address is connected to a FB account.  Please continue with Facebook.",
      });
    }

    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }
    // generate a signed token with user id and secret
    let token = jwt.sign({ _id: user._id }, process.env.jwtSecret)
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 99999999 });
    // return response with user and token to frontend client
    const { _id, name, email, role, avatar } = user;
    return res.json({ token, user: { _id, email, name, role, avatar } });
  });
};

//Sign out a user
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Succes" });
};
