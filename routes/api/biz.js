const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const {
  create,
  bizById,
  bizList,
  getHours,
  postHours,
  updateLocation,
  updateBiz,
  removeBiz,
  read,
} = require("../../controllers/biz");
const { userById } = require("../../controllers/user");

router.get("/biz/list", bizList);
router.get("/biz/:bizId", read);
router.post("/biz/create/:userId", requireSignIn, isAuth, create);
router.get("/biz/hours/:bizId", getHours);
router.put("/biz/hours/:bizId/:userId", requireSignIn, isAuth, postHours);
router.put(
  "/biz/location/:bizId/:userId",
  requireSignIn,
  isAuth,
  updateLocation
);
router.put("/biz/update/:bizId/:userId", requireSignIn, isAuth, updateBiz);
router.delete("/biz/:bizId/:userId", requireSignIn, isAuth, removeBiz);

router.param("userId", userById);
router.param("bizId", bizById);

module.exports = router;
