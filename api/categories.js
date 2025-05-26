const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const { userById } = require("../../controllers/user");

const {
  read,
  create,
  remove,
  categoryById,
  update,
  list,
} = require("../../controllers/category");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.put(
  "/category/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);
router.get("/categories/list", list);

router.param("categoryId", categoryById);
router.param("userId", userById);
module.exports = router;
