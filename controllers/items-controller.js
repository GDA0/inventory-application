async function createItemGet(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function createItemPost(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function readItems(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function readItem(req, res) {
  try {
    res.send(req.params);
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
