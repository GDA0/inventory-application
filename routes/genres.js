const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genres-controller");

// Create, read, update, and delete genres
router.post("/", genresController.createGenre);
router.get("/", genresController.readGenres);
router.put("/:genreId", genresController.updateGenre);
router.delete("/:genreId", genresController.deleteGenre);

module.exports = router;
