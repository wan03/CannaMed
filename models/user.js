module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });
  // eslint-disable-next-line prettier/prettier
  User.associate = (models) => {
    User.belongsToMany(models.Favorite, {
      through: "UserFavorite"
    });
  };
  return User;
};
