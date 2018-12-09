const path = require("path");
module.exports = htmlController = {
  // Get all strains
  getStrains: (req, res) => {
    res.sendFile(path.join(__dirname + "/../public" + "/index.html"));
  },

  // Create User/Favorite association
  getRecipes: (req, res) => {
    res.sendFile(path.join(__dirname + "/../public" + "/recipes.html"));
  },

  // Get favorites and users.
  userFavorite: (req, res) => {
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
  },

  // Remove a favorite/user association
  removeFavorite: (req, res) => {
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
  }
};
