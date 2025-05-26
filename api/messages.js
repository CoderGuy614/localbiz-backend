const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const { itemById } = require("../../controllers/item");
const { userById } = require("../../controllers/user");
const { bizById } = require("../../controllers/biz");
const { create, readByUser } = require("../../controllers/message");

router.get("/messages/:userId", readByUser);
router.post("/messages/create/:itemId/:fromUserId/:toUserId", create);

router.param("userId", userById);
router.param("itemId", itemById);
router.param("bizId", bizById);

module.exports = router;
