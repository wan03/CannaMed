var db = require("../models");

module.exports = app => {
  // Get all strains
  app.get("/api/strains", function(req, res) {
    db.Favorite.findAll({}).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // Create User/Favorite association
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

  // Get favorites and users.
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

  // Remove a favorite/user association
  app.post("/api/userFavorite/remove", (req, res) => {
    var faveId = req.body.favid;
    var user = req.body.username;
    return db.User.findOne({ where: { username: user } }).then(foundUser => {
      var userToAdd = foundUser;
      return db.Favorite.findOne({ where: { favoriteid: faveId } }).then(
        favorite => {
          return favorite.removeUser(userToAdd).then(res.end());
        }
      );
    });
  });
};
