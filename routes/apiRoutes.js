const apiController = require("../controllers/apicontroller");

module.exports = app => {
  // Get all strains
  app.get("/api/strains", apiController.getStrains);

  // Get News
  app.get("/api/news", apiController.getNews)

  // Create User/Favorite association
  app.post("/api/userFavorite/create", apiController.createFavorite);

  // Get favorites and users.
  app.get("/api/userFavorite/:username", apiController.userFavorite);

  // Remove a favorite/user association
  app.post("/api/userFavorite/remove", apiController.removeFavorite);

  app.get('/api/user_data', apiController.getUser);
};
