var db = require("../models");

module.exports = function(app) {
  // Get all strains
  app.get("/api/strains", function(req, res) {
    db.Strains.findAll({}).then(function(dbStrains) {
      res.json(dbStrains);
    });
  });

  // TODO Create a new favorite/user association
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

  // TODO Get favorites and users.
  app.get("/api/userFavorite/:id", function(req, res) {
    User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Favorite
        }
      ]
    }).then(users => {
      const resObj = users.map(user => {
        return Object.assign(
          {},
          {
            userId: user.id,
            userName: user.username,
            favorite: user.favorite.map(post => {
              return Object.assign(
                {},
                {
                  name: favorite.name,
                  image: favorite.image,
                  type: favorite.type,
                  location: favorite.location,
                  feelings: favorite.feelings,
                  ailment: favorite.ailment,
                  url: favorite.url,
                  flavor: favorite.flavor,
                  thc: favorite.thc,
                  cbd: favorite.cbd
                };
              );
            })
          }
        );;
      });
    });;
  });

  // TODO Remove a favorite/user association
};
