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
