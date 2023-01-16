const router = require("express").Router();
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");

// @desc    Create user
// @route   POST /user
router.post("/", [
  userMiddleware.userValidFields,
  userMiddleware.isUserUnique,
  userController.createUser,
]);

// @desc    Log user in
// @route   POST /login
router.post("/login", [
  userMiddleware.isPasswordAndUserMatch,
  userController.login,
]);

module.exports = router;
