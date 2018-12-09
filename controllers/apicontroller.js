const db = require("../models");
const news = require("../config/newsapi");

module.exports = apiController = {
  // Get all strains
  getStrains: (req, res) => {
    db.Favorite.findAll({}).then(dbFavorites => {
      res.json(dbFavorites);
    });
  },

  // Get News
  getNews: (req, res) => {
    news.getNews().then(news => {
      res.json(news);
    });
  },

  // Create User/Favorite association
  createFavorite: (req, res) => {
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
  },

  // Get favorites and users.
  userFavorite: (req, res) => {
    db.User.findOne({
      where: { username: req.params.username },
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
