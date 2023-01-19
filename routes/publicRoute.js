const router = require("express").Router();
const publicController = require("../controllers/publicController");

// @desc    Get all testimonies
// @route   GET /
router.get("/", publicController.getAllTestimonies);

// @desc    Search testimonies by tags
// @route   POST /search
router.get("/search", publicController.search);

module.exports = router;
