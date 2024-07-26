const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories-controller");

// Read-only route for categories
router.get("/", categoriesController.readCategories);

module.exports = router;
