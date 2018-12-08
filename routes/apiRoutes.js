var db = require("../models");

module.exports = function(app) {
  // Get all strains
  app.get("/api/strains", function(req, res) {
    db.Strains.findAll({}).then(function(dbStrains) {
      res.json(dbStrains);
    });
  });

  // Create a new favorite association
  app.post("/api/userFavorite", function(req, res) {
    Promise.all([
      User.create(req.body.user),
      Favorite.create(req.body.favorite)
    ])
      // eslint-disable-next-line no-unused-vars
      .spread(function(user, favorite) {
        return user.setFavorite(associatedUser); // here we are using the method setFavorite
      })
      .then(function(userWithAssociatedFavorite) {
        res.send(userWithAssociatedFavorite);
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
