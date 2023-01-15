const router = require("express").Router();
const publicController = require("../controllers/publicController");

// @desc    Get all testimonies
// @route   GET /testimonies
router.get("/", publicController.getAllTestimonies);

module.exports = router;
