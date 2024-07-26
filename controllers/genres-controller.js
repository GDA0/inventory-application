async function createGenreGet(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function createGenrePost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function readGenres(req, res) {
  try {
    res.send(req.params);
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
