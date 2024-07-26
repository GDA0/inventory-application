async function readCategories(req, res) {
  try {
    res.send(req.params);
  } catch (err) {}
}

module.exports = {
  readCategories,
};
