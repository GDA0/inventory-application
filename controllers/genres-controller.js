const queries = require("../database/queries");
const { body, validationResult } = require("express-validator");

async function createGenreGet(req, res) {
  try {
    const { categoryId } = req.params;
    res.render("./forms/add-genre", {
      title: "Create genre",
      categoryId,
      errors: [],
      formData: {},
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
  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isInt()
    .withMessage("Category must be a valid number"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Render the form again with validation errors
      const { categoryId } = req.params;
      return res.status(400).render("./forms/add-genre", {
        title: "Create genre",
        categoryId,
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      const { name, category_id } = req.body;
      // Add the genre to the database if it doesn't exist
      const genreExists = await queries.genreExists(name.trim(), category_id);
      if (!genreExists) {
        await queries.addGenre(name, category_id);
      }
      res.redirect(`/categories/${category_id}/genres`);
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
    res.send(req.params);
  } catch (err) {}
}

async function updateGenrePost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function deleteGenreGet(req, res) {
  try {
    res.send(req.params);
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
