const { pool } = require("./client-and-pool");

async function getGenresByCategoryId(categoryId) {
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

module.exports = {
  getGenresByCategoryId,
};
