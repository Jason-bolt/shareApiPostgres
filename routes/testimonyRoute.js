const router = require("express").Router();
const testimonyController = require("../controllers/testimonyController");
const Middleware = require("../middlewares/Middleware");

// @desc    Create testimony
// @route   POST /testimony
router.post("/", [
  Middleware.auth,
  Middleware.validateTestimony,
  testimonyController.createTestimony,
]);

module.exports = router;
