const queries = require("../database/queries");
const { body, validationResult } = require("express-validator");

async function createGenreGet(req, res) {
  try {
    const { categoryId } = req.params;
    res.render("./forms/create-genre", {
      title: "Create genre",
      categoryId,
      errors: [],
      formData: {},
      verb: "",
    });
  } catch (err) {}
}

const createGenrePost = [
  // Validation rules
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Genre name is required")
    .isLength({ min: 3 })
    .withMessage("Genre name must be at least 3 characters long")
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Render the form again with validation errors
      const { categoryId } = req.params;
      return res.render("./forms/create-genre", {
        title: "Create genre",
        categoryId,
        errors: errors.array(),
        formData: req.body,
        verb: "",
      });
    }

    try {
      const { name } = req.body;
      const { categoryId } = req.params;
      // Add the genre to the database if it doesn't exist
      const genreExists = await queries.genreExists(name.trim(), categoryId);
      if (!genreExists) {
        await queries.addGenre(name, categoryId);
      }
      res.redirect(`/categories/${categoryId}/genres`);
    } catch (err) {}
  },
];

async function readGenres(req, res) {
  try {
    const { categoryId } = req.params;
    const genres = await queries.getGenres(categoryId);
    res.render("genres", {
      title: categoryId === "1" ? "Movies" : "TV Shows",
      categoryId,
      genres,
    });
  } catch (err) {}
}

async function updateGenreGet(req, res) {
  try {
    const { categoryId, genreId } = req.params;
    const genreName = await queries.getGenreName(genreId, categoryId);
    res.render("./forms/create-genre", {
      title: "Update genre",
      categoryId,
      genreId,
      errors: [],
      formData: { name: genreName },
      verb: "Update",
    });
  } catch (err) {}
}

const updateGenrePost = [
  // Validation rules
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Genre name is required")
    .isLength({ min: 3 })
    .withMessage("Genre name must be at least 3 characters long")
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Render the form again with validation errors
      const { categoryId } = req.params;
      return res.render("./forms/create-genre", {
        title: "Create genre",
        categoryId,
        errors: errors.array(),
        formData: req.body,
        verb: "",
      });
    }

    try {
      const { name } = req.body;
      const { categoryId, genreId } = req.params;
      // Update the genre if it doesn't exist with the same name in the category
      const genreExists = await queries.genreExists(name.trim(), categoryId);
      if (!genreExists) {
        await queries.updateGenre(name, genreId, categoryId);
      }
      res.redirect(`/categories/${categoryId}/genres/${genreId}/items`);
    } catch (err) {}
  },
];

async function deleteGenreGet(req, res) {
  try {
    const { categoryId, genreId } = req.params;
    const items = await queries.getItems(categoryId, genreId);
    res.render("delete-genre", {
      title: "Delete genre",
      items,
      categoryId,
      genreId,
    });
  } catch (err) {}
}

async function deleteGenrePost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

module.exports = {
  createGenreGet,
  createGenrePost,
  readGenres,
  updateGenreGet,
  updateGenrePost,
  deleteGenreGet,
  deleteGenrePost,
};
