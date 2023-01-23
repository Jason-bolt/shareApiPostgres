const router = require("express").Router();
const testimonyController = require("../controllers/testimonyController");
const Middleware = require("../middlewares/Middleware");

// @desc    Create testimony
// @route   POST /testimonies
router.post("/", [
  Middleware.auth,
  Middleware.validateTestimony,
  testimonyController.createTestimony,
]);

// @desc   Get user testimonies
// @route   POST /testimonies/peruser
router.get("/peruser", [
  Middleware.auth,
  testimonyController.getUserTestimonies,
]);

// @desc    Update testimony
// @route   PUT /testimonies/update
router.put("/update", [
  Middleware.auth,
  Middleware.validateTestimony,
  testimonyController.updateTestimony,
]);

// @desc    Delete testimony
// @route   DELETE /testimonies/delete
router.delete("/delete", [
  Middleware.auth,
  testimonyController.deleteTestimony,
]);

module.exports = router;
