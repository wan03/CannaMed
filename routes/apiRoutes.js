var db = require("../models");

module.exports = app => {
  // Get all strains
  app.get("/api/strains", function(req, res) {
    db.Favorite.findAll({}).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // TODO Create a new favorite/user association
  app.post("/api/userFavorite/create", (req, res) => {
    var faveId = req.body.favid;
    var user = req.body.username;
    return db.User.findOne({ where: { username: user } }).then(foundUser => {
      var userToAdd = foundUser;
      return db.Favorite.findOne({ where: { favoriteid: faveId } }).then(
        favorite => {
          return favorite.addUser(userToAdd).then(res.end());
        }
      );
    });
  });

  // TODO Get favorites and users.
  app.get("/api/userFavorite/:id", (req, res) => {
    db.User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      },
      include: [
        {
          model: db.Favorite
        }
      ]
    }).then(users => {
      res.json(users.dataValues);
    });
  });

  // TODO Remove a favorite/user association
  app.post("/api/userFavorite", function(req, res) {
    db.User.removeFavorite({
      // TODO here too
      where: {
        id: req.body.id
      }
    }).then(res.end());
  });
};
