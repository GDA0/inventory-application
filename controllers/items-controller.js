async function createItem(req, res) {
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

async function updateItem(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

async function deleteItem(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

module.exports = {
  createItem,
  readItems,
  readItem,
  updateItem,
  deleteItem,
};
