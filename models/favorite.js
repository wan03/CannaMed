module.exports = function(sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    favoriteId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    feelings: DataTypes.STRING,
    ailment: DataTypes.STRING,
    url: DataTypes.STRING,
    flavor: DataTypes.STRING,
    thc: DataTypes.INTEGER,
    cbd: DataTypes.INTEGER
  });
  Favorite.associate = models => {
    Favorite.belongsToMany(models.User, {
      through: "UserFavorite"
    });
  };
  return Favorite;
};
