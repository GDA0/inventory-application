async function readCategories(req, res) {
  try {
    res.render("categories", { title: "Categories" });
  } catch (err) {}
}

module.exports = {
  readCategories,
};
