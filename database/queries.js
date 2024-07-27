const { pool } = require("./client-and-pool");

async function getGenres(categoryId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM genres WHERE category_id = $1",
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
      SELECT i.id, i.name, i.description, i.likes
      FROM items i
      WHERE i.category_id = $1
        AND i.genre_id = $2
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
      SELECT i.id, i.name, i.description, i.likes
      FROM items i
      WHERE i.id = $1
        AND i.category_id = $2
        AND i.genre_id = $3
    `;
    const values = [itemId, categoryId, genreId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    console.error(
      `Error fetching item for item ID ${itemId}, category ID ${categoryId}, and genre ID ${genreId}:`,
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
    return rows[0]?.name;
  } catch (err) {
    console.error(
      `Error fetching genre name for genre ID ${genreId} and category ID ${categoryId}:`,
      err
    );
    throw err;
  }
}

async function addGenre(name, categoryId) {
  try {
    await pool.query(`INSERT INTO genres (name, category_id) VALUES ($1, $2)`, [
      name,
      categoryId,
    ]);
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
  } catch (err) {
    console.error("Error checking genre existence:", err);
    throw err;
  }
}

async function itemExists(name, categoryId, genreId) {
  try {
    const query = `
      SELECT 1 FROM items
      WHERE name ILIKE $1
        AND category_id = $2
        AND genre_id = $3
      LIMIT 1
    `;
    const values = [name, categoryId, genreId];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
  } catch (err) {
    console.error("Error checking item existence:", err);
    throw err;
  }
}

async function addItem(name, description, categoryId, genreId) {
  try {
    await pool.query(
      `INSERT INTO items (name, description, category_id, genre_id) VALUES ($1, $2, $3, $4)`,
      [name, description, categoryId, genreId]
    );
  } catch (err) {
    console.error(
      `Error creating item with name "${name}", description "${description}", category ID ${categoryId}, and genre ID ${genreId}:`,
      err
    );
    throw err;
  }
}

async function updateGenre(name, id, categoryId) {
  try {
    const query = `
      UPDATE genres
      SET name = $1
      WHERE id = $2 AND category_id = $3
    `;
    const values = [name, id, categoryId];
    await pool.query(query, values);
  } catch (err) {
    console.error(
      `Error updating genre ID ${id} in category ID ${categoryId} with new name "${name}":`,
      err
    );
    throw err;
  }
}

module.exports = {
  getGenres,
  getItems,
  getItem,
  getGenreName,
  addGenre,
  genreExists,
  itemExists,
  addItem,
  updateGenre,
};
