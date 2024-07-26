const { pool } = require("./client-and-pool");

async function getGenres(categoryId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM genres WHERE category_id=$1",
      [categoryId]
    );
    return rows;
  } catch (err) {
    console.error(`Error fetching genres for category ID ${categoryId}:`, err);
    throw err;
  }
}

async function getItems(categoryId, genreId) {
  try {
    const query = `
      SELECT i.id, i.name, i.description, i.likes, array_agg(DISTINCT g.name) AS genres
      FROM items i
      JOIN item_genre ig ON i.id = ig.item_id
      JOIN genres g ON ig.genre_id = g.id
      WHERE i.category_id = $1
        AND g.id = $2
      GROUP BY i.id;
    `;

    const values = [categoryId, genreId];

    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error(
      `Error fetching items for category ID ${categoryId} and genre ID ${genreId}:`,
      err
    );
    throw err;
  }
}

async function getItem(itemId, categoryId, genreId) {
  try {
    const query = `
      SELECT i.id, i.name, i.description, i.likes, array_agg(DISTINCT g.name) AS genres
      FROM items i
      JOIN item_genre ig ON i.id = ig.item_id
      JOIN genres g ON ig.genre_id = g.id
      WHERE i.id = $1
        AND i.category_id = $2
        AND g.id = $3
      GROUP BY i.id;
    `;

    const values = [itemId, categoryId, genreId];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    console.error(
      `Error fetching item for category ID ${categoryId}, genre ID ${genreId}, and item ID ${itemId}:`,
      err
    );
    throw err;
  }
}

async function getGenreName(genreId, categoryId) {
  try {
    const { rows } = await pool.query(
      `SELECT name
       FROM genres
       WHERE id = $1 AND category_id = $2`,
      [genreId, categoryId]
    );

    return rows[0].name;
  } catch (error) {
    console.error(
      `Error fetching genre name for genre ID ${genreId} and category ID ${categoryId}:`,
      error
    );
    throw error;
  }
}

async function addGenre(name, categoryId) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO genres (name, category_id) VALUES ($1, $2)`,
      [name, categoryId]
    );
    return rows[0]; // return the newly created genre
  } catch (err) {
    console.error(`Error creating genre for category ID ${categoryId}:`, err);
    throw err;
  }
}

async function genreExists(name, categoryId) {
  try {
    const query = `
        SELECT 1 FROM genres
        WHERE name ILIKE $1
        AND category_id = $2
        LIMIT 1
    `;
    const values = [name, categoryId];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error checking genre existence:", error);
    throw error;
  }
}

module.exports = {
  getGenres,
  getItems,
  getItem,
  getGenreName,
  addGenre,
  genreExists,
};
