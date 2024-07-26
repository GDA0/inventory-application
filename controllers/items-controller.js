const queries = require("../database/queries");

async function createItemGet(req, res) {
  try {
    const { categoryId, genreId } = req.params;
    res.render("./forms/create-item", {
      title: categoryId == 1 ? "Create movie" : "Create tv show",
      errors: [],
      categoryId,
      formData: {},
      genreId,
    });
  } catch (err) {}
}

async function createItemPost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function readItems(req, res) {
  try {
    const { categoryId, genreId } = req.params;
    const items = await queries.getItems(categoryId, genreId);
    const categoryName = categoryId === "1" ? "Movies" : "TV Shows";
    const genreName = await queries.getGenreName(genreId, categoryId);
    const title = `${categoryName} | ${genreName}`;
    res.render("items", { title, items, categoryId, genreId });
  } catch (err) {}
}

async function readItem(req, res) {
  try {
    const { categoryId, genreId, itemId } = req.params;
    const item = await queries.getItem(itemId, categoryId, genreId);
    res.render("item", {
      title: categoryId === "1" ? "Movie" : "TV Show",
      item,
      categoryId,
      genreId,
    });
  } catch (err) {}
}

async function updateItemGet(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function updateItemPost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function deleteItemGet(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function deleteItemPost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

module.exports = {
  createItemGet,
  createItemPost,
  readItems,
  readItem,
  updateItemGet,
  updateItemPost,
  deleteItemGet,
  deleteItemPost,
};
