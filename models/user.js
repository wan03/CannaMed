module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    username: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });
  Users.associate = (models) => {
    Users.belongsToMany(models.Favorite, {
      through: "UserFavorite",
      as: "favorite",
      foreignKey: "userId"
    });
  };

  return User;
};
