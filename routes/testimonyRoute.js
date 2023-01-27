const router = require("express").Router();
const testimonyController = require("../controllers/testimonyController");
const Middleware = require("../middlewares/Middleware");

// @desc    Create testimony
// @route   POST /testimonies/create
router.post("/create", [
  Middleware.auth,
  Middleware.validateTestimony,
  testimonyController.createTestimony,
]);

// @desc   Get user testimonies
// @route   POST /testimonies/user/:id
router.get("/user/:user_id", [testimonyController.getUserTestimonies]);

// @desc    Update testimony
// @route   PUT /testimonies/update/:id
router.put("/update", [
  Middleware.auth,
  Middleware.validateTestimony,
  Middleware.userCanUpdateTestimony,
  testimonyController.updateTestimony,
]);

// @desc    Delete testimony
// @route   DELETE /testimonies/delete
router.delete("/delete", [
  Middleware.auth,
  Middleware.userCanDeleteTestimony,
  testimonyController.deleteTestimony,
]);

module.exports = router;
