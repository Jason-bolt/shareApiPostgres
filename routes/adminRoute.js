const router = require("express").Router();
const adminController = require("../controllers/adminController");
const Middleware = require("../middlewares/Middleware");

// @desc    Create admin user
// @route   POST /admin/create
router.post("/create", [
  Middleware.userValidFields,
  Middleware.isUserUnique,
  adminController.createAdmin,
]);

// @desc    Approve testimony
// @route   POST /admin/approve/:testimonyID
router.post("/approve/:testimonyID", [
  Middleware.auth,
  Middleware.isAdmin,
  adminController.approveTestimony,
]);

module.exports = router;
