const htmlController = require("../controllers/htmlcontroller");
const path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", htmlController.getStrains);

  // Load recipes
  app.get("/recipes", htmlController.getRecipes);

  // Load all strains
  app.get("/strains", htmlController.getAllStrains);

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public", "error.html"));
  });
};
