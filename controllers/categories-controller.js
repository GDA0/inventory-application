async function readCategories(req, res) {
  try {
    res.render("categories", { title: "Categories" });
  } catch (err) {
    res.render("error");
  }
}

module.exports = {
  readCategories,
};
