const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const {
  create,
  update,
  itemById,
  read,
  listItems,
  deleteItem,
} = require("../../controllers/item");
const { userById } = require("../../controllers/user");
const { bizById } = require("../../controllers/biz");

router.get("/item/:itemId", read);
router.get("/items/:bizId", listItems);
router.post("/item/create/:userId", requireSignIn, isAuth, create);
router.put("/item/update/:itemId/:userId", requireSignIn, isAuth, update);
router.delete(
  "/item/delete/:itemId/:userId",
  requireSignIn,
  isAuth,
  deleteItem
);

router.param("userId", userById);
router.param("itemId", itemById);
router.param("bizId", bizById);

module.exports = router;
