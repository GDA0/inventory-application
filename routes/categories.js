const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories-controller");
const genresController = require("../controllers/genres-controller");
const itemsController = require("../controllers/items-controller");

// Read-only route for categories
router.get("/", categoriesController.readCategories);

// Create, read, update, and delete genres
router.get("/:categoryId/genres/create", genresController.createGenreGet);
router.post("/:categoryId/genres/create", genresController.createGenrePost);

router.get("/:categoryId/genres", genresController.readGenres);

router.get(
  "/:categoryId/genres/:genreId/update",
  genresController.updateGenreGet
);
router.post(
  "/:categoryId/genres/:genreId/update",
  genresController.updateGenrePost
);

router.get(
  "/:categoryId/genres/:genreId/delete",
  genresController.deleteGenreGet
);
router.post(
  "/:categoryId/genres/:genreId/delete",
  genresController.deleteGenrePost
);

// Create, read, update, and delete items
router.get(
  "/:categoryId/genres/:genreId/items/create",
  itemsController.createItemGet
);
router.post(
  "/:categoryId/genres/:genreId/items/create",
  itemsController.createItemPost
);

router.get("/:categoryId/genres/:genreId/items", itemsController.readItems);
router.get(
  "/:categoryId/genres/:genreId/items/:itemId",
  itemsController.readItem
);

router.get(
  "/:categoryId/genres/:genreId/items/:itemId/update",
  itemsController.updateItemGet
);
router.post(
  "/:categoryId/genres/:genreId/items/:itemId/update",
  itemsController.updateItemPost
);

router.get(
  "/:categoryId/genres/:genreId/items/:itemId/delete",
  itemsController.deleteItemGet
);
router.post(
  "/:categoryId/genres/:genreId/items/:itemId/delete",
  itemsController.deleteItemPost
);

module.exports = router;
