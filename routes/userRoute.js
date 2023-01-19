const router = require("express").Router();
const userController = require("../controllers/userController");
const Middleware = require("../middlewares/Middleware");

// @desc    Create user
// @route   POST /user
router.post("/register", [
  Middleware.userValidFields,
  Middleware.isUserUnique,
  userController.createUser,
]);

// @desc    Log user in
// @route   POST /user/login
router.post("/login", [
  Middleware.isPasswordAndUserMatch,
  userController.login,
]);

// @desc  Refresh token
// @route Post /user/refreshToken
router.post("/refreshToken", [
  Middleware.isRefreshTokenValid,
  userController.refreshToken,
]);

// @desc  Log user out
// @route Post /user/logout
router.post("/logout", [Middleware.isRefreshTokenValid, userController.logout]);

// @desc  Delete user account
// @route Post /user/delete
router.post("/delete", [
  Middleware.isRefreshTokenValid,
  userController.deleteAccount,
]);

module.exports = router;
