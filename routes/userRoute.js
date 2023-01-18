const router = require("express").Router();
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");

// @desc    Create user
// @route   POST /user
router.post("/register", [
  userMiddleware.userValidFields,
  userMiddleware.isUserUnique,
  userController.createUser,
]);

// @desc    Log user in
// @route   POST /user/login
router.post("/login", [
  userMiddleware.isPasswordAndUserMatch,
  userController.login,
]);

// @desc  Refresh token
// @route Post /user/refreshToken
router.post("/refreshToken", [
  userMiddleware.isRefreshTokenValid,
  userController.refreshToken,
]);

module.exports = router;
