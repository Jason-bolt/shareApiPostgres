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

// @desc    Update testimony
// @route   PUT /testimony/update
router.put("/update", [
  Middleware.auth,
  Middleware.validateTestimony,
  testimonyController.updateTestimony,
]);

// @desc    Delete testimony
// @route   DELETE /testimony/delete
router.delete("/delete", [
  Middleware.auth,
  testimonyController.deleteTestimony,
]);

module.exports = router;
