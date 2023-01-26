const router = require("express").Router();
const adminController = require("../controllers/adminController");
const Middleware = require("../middlewares/Middleware");

// @desc    Create admin user
// @route   /admin/create
router.post("/create", [
  Middleware.userValidFields,
  Middleware.isUserUnique,
  adminController.createAdmin,
]);

module.exports = router;
