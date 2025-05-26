const express = require("express");
const router = express.Router();

//Checks that the request belongs to the currently logged in user
const { requireSignIn, isAuth } = require("../../middleware/auth");

const {
  checkExisting,
  userById,
  read,
  update,
  remove,
} = require("../../controllers/user");

// Get a registered user by their ID
router.get("/users/:userId", read);

//Update a User
router.put("/users/:userId", requireSignIn, isAuth, update);

//Delete a User
router.delete("/users/:userId", requireSignIn, isAuth, remove);

//Check User Status
router.get("/checkExisting", checkExisting);

//Test if logged in or not
router.get("/test", requireSignIn, (req, res) => {
  res.send("The test was successful");
});

router.param("userId", userById);

module.exports = router;
