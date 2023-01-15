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

module.exports = router;
