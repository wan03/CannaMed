const htmlController = require("../controllers/htmlcontroller");
const path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", htmlController.getStrains);

  // Load example page and pass in an example by id
  app.get("/recipes", htmlController.getRecipes);

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public", "404.html"));
  });
};
