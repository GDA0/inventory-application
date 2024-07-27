const queries = require('../database/queries')
const { body, validationResult } = require('express-validator')

async function createItemGet (req, res) {
  try {
    const { categoryId, genreId } = req.params
    res.render('./forms/create-item', {
      title: categoryId == 1 ? 'Create movie' : 'Create tv show',
      errors: [],
      categoryId,
      formData: {},
      genreId,
      verb: ''
    })
  } catch (err) {}
}

const createItemPost = [
  // Validation rules
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long')
    .escape(),
  body('description').optional().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Render the form again with validation errors
      const { categoryId, genreId } = req.params
      return res.render('./forms/create-item', {
        title: categoryId == 1 ? 'Create movie' : 'Create tv show',
        categoryId,
        genreId,
        errors: errors.array(),
        formData: req.body,
        verb: ''
      })
    }

    try {
      const { name, description } = req.body
      const { categoryId, genreId } = req.params
      // Add the item to the database if it doesn't exist
      const itemExists = await queries.itemExists(
        name.trim(),
        categoryId,
        genreId
      )
      if (!itemExists) {
        await queries.addItem(
          name.trim(),
          description.trim(),
          categoryId,
          genreId
        )
      }
      res.redirect(`/categories/${categoryId}/genres/${genreId}/items`)
    } catch (err) {}
  }
]

async function readItems (req, res) {
  try {
    const { categoryId, genreId } = req.params
    const items = await queries.getItems(categoryId, genreId)
    const categoryName = categoryId === '1' ? 'Movies' : 'TV Shows'
    const genreName = await queries.getGenreName(genreId, categoryId)
    const title = `${categoryName} | ${genreName}`
    res.render('items', { title, items, categoryId, genreId })
  } catch (err) {}
}

async function readItem (req, res) {
  try {
    const { categoryId, genreId, itemId } = req.params
    const item = await queries.getItem(itemId, categoryId, genreId)
    res.render('item', {
      title: categoryId === '1' ? 'Movie' : 'TV Show',
      item,
      categoryId,
      genreId,
      itemId,
      verb: ''
    })
  } catch (err) {}
}

async function updateItemGet (req, res) {
  try {
    const { categoryId, genreId, itemId } = req.params
    const item = await queries.getItem(itemId, categoryId, genreId)
    res.render('./forms/create-item', {
      title: categoryId == 1 ? 'Update movie' : 'Update tv show',
      errors: [],
      categoryId,
      formData: {
        name: item.name,
        description: item.description
      },
      genreId,
      itemId,
      verb: 'Update'
    })
  } catch (err) {}
}

const updateItemPost = [
  // Validation rules
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long')
    .escape(),
  body('description').optional().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Render the form again with validation errors
      const { categoryId, genreId, itemId } = req.params
      return res.render('./forms/create-item', {
        title: categoryId == 1 ? 'Update movie' : 'Update tv show',
        categoryId,
        genreId,
        errors: errors.array(),
        formData: req.body,
        itemId,
        verb: 'Update'
      })
    }

    try {
      const { name, description } = req.body
      const { categoryId, genreId, itemId } = req.params
      // Add the item to the database if it doesn't exist
      const itemExists = await queries.itemExists(
        name.trim(),
        categoryId,
        genreId
      )
      if (!itemExists) {
        await queries.updateItem(
          name.trim(),
          description.trim(),
          itemId,
          genreId,
          categoryId
        )
      }
      res.redirect(
        `/categories/${categoryId}/genres/${genreId}/items/${itemId}`
      )
    } catch (err) {}
  }
]

async function deleteItemGet (req, res) {
  try {
    const { categoryId, genreId, itemId } = req.params
    res.render('delete-item', {
      title: categoryId == 1 ? 'Delete movie' : 'Delete tv show',
      categoryId,
      genreId,
      itemId
    })
  } catch (err) {}
}

async function deleteItemPost (req, res) {
  try {
    const { categoryId, genreId, itemId } = req.params
    await queries.removeItem(itemId, genreId, categoryId)
    res.redirect(`/categories/${categoryId}/genres/${genreId}/items`)
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
  deleteItemPost
}
