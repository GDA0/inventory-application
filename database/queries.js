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

async function getItem(categoryId, genreId, itemId) {
  try {
    const query = `
      SELECT i.id, i.name, i.description, i.likes, array_agg(DISTINCT g.name) AS genres
      FROM items i
      JOIN item_genre ig ON i.id = ig.item_id
      JOIN genres g ON ig.genre_id = g.id
      WHERE i.category_id = $1
        AND g.id = $2
        AND i.id = $3
      GROUP BY i.id;
    `;

    const values = [categoryId, genreId, itemId];

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

async function getGenreName(categoryId, genreId) {
  try {
    const { rows } = await pool.query(
      `SELECT name
       FROM genres
       WHERE category_id = $1 AND id = $2`,
      [categoryId, genreId]
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

module.exports = {
  getGenres,
  getItems,
  getItem,
  getGenreName,
};
