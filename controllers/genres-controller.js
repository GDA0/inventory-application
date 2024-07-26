async function createGenre(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function readGenres(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function updateGenre(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function deleteGenre(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

module.exports = {
  createGenre,
  readGenres,
  updateGenre,
  deleteGenre,
};
