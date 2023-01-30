const router = require("express").Router();
const publicController = require("../controllers/publicController");

// @desc    Get all testimonies
// @route   GET /
router.get("/", publicController.getAllTestimonies);

// @desc    Get one testimony
// @route   GET /:id
router.get("/:id", publicController.getOneTestimony);

// @desc    Search testimonies by tags
// @route   POST /search/tag/:tag
router.get("/search/tag/:tag", publicController.search);

module.exports = router;
