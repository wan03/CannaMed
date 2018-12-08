module.exports = function(sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    id: {
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
  return Favorite;
};
