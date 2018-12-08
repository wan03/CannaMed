var db = require("../models");

module.exports = function(app) {
  // Get all strains
  app.get("/api/strains", function(req, res) {
    db.Favorite.findAll({}).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // TODO Create a new favorite/user association
  app.post("/api/userFavorite", function(req, res) {
    db.User.addFavorite({
      // TODO Figure out how to specify the strain
      where: {
        id: req.body.id
      }
    }).then(res.end());
  });

  // TODO Get favorites and users.
  app.get("/api/userFavorite/:id", function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Favorite
        }
      ]
    }).then(users => {
      res.json(users.dataValues);
  //     Object.keys(users.dataValues).map(user => {
  //       return Object.assign(
  //         {},
  //         {
  //           userId: user.id,
  //           userName: user.username,
  //           favorite: user.favorite.map(post => {
  //             return Object.assign(
  //               {},
  //               {
  //                 name: favorite.name,
  //                 image: favorite.image,
  //                 type: favorite.type,
  //                 location: favorite.location,
  //                 feelings: favorite.feelings,
  //                 ailment: favorite.ailment,
  //                 url: favorite.url,
  //                 flavor: favorite.flavor,
  //                 thc: favorite.thc,
  //                 cbd: favorite.cbd
  //               }
  //             );
  //           })
  //         }
  //       );
  //     });
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
